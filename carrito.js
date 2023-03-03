const carrito = document.getElementById("carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.getElementById("vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");

let articulosCarrito = [];

cargarEventos();

function cargarEventos() {
  listaCursos.addEventListener("click", agregarCurso);
  // carrito.addEventListener("click", eliminarCurso);

  vaciarCarrito.addEventListener("click", () => {
    articulosCarrito = [];
    // removerHTML();
    carritoHTML();
  });
}

function agregarCurso(e) {
  e.preventDefault(); //para cancelar la referencia predeterminada

  if (e.target.classList.contains("agregar-carrito")) {
    //Accede al elemento que contienen la clase mencionada
    const cursoSeleccionado = e.target.parentElement.parentElement; //guardas todas las propiedades de los elementos
    leerDatosCurso(cursoSeleccionado);
  }
}

function leerDatosCurso(curso) {
  //Se lee los datos recibiendo los parametros de todas sus propiedades del elemento selecionado
  console.log(curso);
  //Se guarda en un objeto con tipo de elemento
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h5").textContent,
    precio: curso.querySelector(".precio").textContent,
    id: curso.querySelector("a").getAttribute("data-id"), //accede al atributo que con tiene el ID
    cantidad: 1,
  };

  let found = false;
  for (let i = 0; i < articulosCarrito.length; i++) {
    if (articulosCarrito[i].id === infoCurso.id) {
      borrar.replace(articulosCarrito[i], infoCurso);
      // Si ya está en el carrito, aumentar la cantidad
      articulosCarrito[i].cantidad += infoCurso.cantidad;

      found = true;
      break;
    }
  }

  if (!found) {
    // Si no está en el carrito, agregarlo como un nuevo artículo
    articulosCarrito.push(infoCurso);
  }

  /* let existingArticle = articulosCarrito.find(
    (curso) => curso.id === infoCurso.id
  );

  if (existingArticle) {
    existingArticle.cantidad++;
  } else {
    articulosCarrito.push(infoCurso);
  }*/
  // let encontrado = false;
  // for (const curso of articulosCarrito) {
  //   if (curso.id === infoCurso.id) {
  //     curso.cantidad++;
  //     encontrado = true;
  //     break;
  //   }
  // }
  // if (!encontrado) {
  //   const nuevoArticulo = infoCurso;
  //   articulosCarrito.push(nuevoArticulo);
  // }
  carritoHTML();
}

function carritoHTML() {
  //llamamos la funcion removerHTML() para evitar que se duplique el primer curso que se selecciona
  // removerHTML();

  //iteramos el arreglo de articulosCarrito para mostrar todos los cursos que hay en el arreglo en una tabla
  // articulosCarrito.forEach((curso) => {
  //   const { imagen, titulo, precio, id, cantidad } = curso;

  articulosCarrito.forEach((c) => {
    // Creamos una fila para la tabla
    let row = contenedorCarrito.insertRow();

    let cellImagen = row.insertCell();
    let cellTitulo = row.insertCell();
    let cellPrecio = row.insertCell();
    let cellCantidad = row.insertCell();
    let cellEliminar = row.insertCell();

    cellImagen.innerHTML = `<img src="${c.imagen}" width="100">`;
    cellTitulo.innerHTML = c.titulo;
    cellPrecio.innerHTML = c.precio;
    cellCantidad.innerHTML = c.cantidad;
    cellEliminar.innerHTML = `<a href="#" class="borrar-curso" data-id="${c.id}">X</a>`;
    //agregamos los cursos al apartado del tbody
    // contenedorCarrito.appendChild(fila);
  });
}

//removiendo al primer hijo que se repite en la tabla de los cursos
function removerHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

// /** metodo para eliminar un curso en base a su ID */
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    // let index = articulosCarrito.findIndex((curso) => curso.id === cursoId.id);
    // if (index !== -1) {
    //   articulosCarrito.splice(index, 1);
    // }
    //     //filtramos un nuevo array con todos los cursos que sean diferentes al cursoId
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

    //     //una vez teniendo el nuevo arreglo, llamamos al metodo carritoHTML() para que forme la tabla, con el nuevo arreglo
    carritoHTML();
  }
}
