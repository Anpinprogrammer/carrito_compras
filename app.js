// Variables 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
        sincronizarStorage();
    });

    //localStorage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    });
}

function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
        
    }
}


//Eliminar un curso
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        console.log(cursoId);
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId )//Filtramos con !== para que traiga todos los elementos que no sean el relacionado a la variable cursoId

        carritoHTML();
    }

}

function leerDatosCurso(curso) {

    // Crear un objeto con el conetenido del curso actual
    let j = 1;
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: j
    }

    //Revisa si un elemento ya existe en el carrito 
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe){
         //Actualizamos la cantidad
         const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id ){
                curso.cantidad++;
                return curso;

            } else {
                return curso;
            }
         })
         //console.log(curso);
         articulosCarrito = [...cursos];
        
    } else {
        //Agrega elementos al arreglo de carrito
        //Se usa spread operator
      articulosCarrito = [...articulosCarrito, infoCurso];
    }
    
    console.log(articulosCarrito);

    carritoHTML();
    
}

function carritoHTML() {

    //Limpiar el HTML
    limpiarHTML();

    //Recorre el carrito y general el HTML
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
            <img src="${imagen}" width="100">
            </td>  
            <td>
            ${titulo}
            </td>  
            <td>
            ${precio}
            </td>  
            <td>
            ${cantidad}
            </td>  
            <td>
              <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>  

             
        `;
        
        //console.log(row);
        //Agrega el articulo al carrito
        contenedorCarrito.appendChild(row);
    });
    
    //Agrega el carrito de compras al localStorage
    sincronizarStorage();
    
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
    
}

function limpiarHTML() {
    //Forma lenta
    //contenedorCarrito.innerHTML = '';

    //Forma optima
    while(contenedorCarrito.firstChild) {
           contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}