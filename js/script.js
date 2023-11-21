let notas = []

let nombre = document.getElementById('nombreNota')
let descripcion = document.getElementById('descripcionNota')
let crear = document.getElementById('crear')
let inputData =  document.getElementById("modificar")


verLibros.addEventListener('click', function () {
    let librosLS = JSON.parse(localStorage.getItem('notas'))
    CrearHTML(librosLS)
})

function CrearHTML(array) {
    let notasHTML = ''
    array.forEach(nota => {

        notasHTML +=`
        <div class="item post-it">
            <h1>
                ${nota.nombre}
            </h1>
            <p class="descripcion">
                ${nota.descripcion}
            </p>
            <div class="botones row">    
                <a class="col-sm" onclick="Eliminar('${nota.nombre}')">
                    <img src="images/trash-solid.svg">
                </a>
                <a class="col-sm" onclick="Modificar('${nota.nombre}', '${nota.descripcion}')">
                    <img src="images/pen-to-square-solid.svg">
                </a>
            </div>
        </div>`
    });
    container.innerHTML = notasHTML
}

function Modificar(nombreNota, descripcionNota) {
    let notasNS = JSON.parse(localStorage.getItem('notas')) || [];
  let nuevoNombre = prompt('Editar nombre:', nombreNota);
  let nuevaDescripcion = prompt('Editar descripcion:', descripcionNota);

  if (nuevoNombre !== null || nuevaDescripcion !== null) {
    let notaIndex = notasNS.findIndex(nota => nota.nombre === nombreNota && nota.descripcion === descripcionNota);

    if (notaIndex !== -1) {
      // Modificar solo si se encontró la nota
      notasNS[notaIndex].nombre = nuevoNombre;
      notasNS[notaIndex].descripcion = nuevaDescripcion;

      localStorage.setItem('notas', JSON.stringify(notasNS));
      CrearHTML(notasNS);
    } else {
      alert('La nota no se encontró');
    }
  }
}
    
crear.addEventListener('click', function () {
    let nota = {
        nombre: nombre.value,
        descripcion: descripcion.value
    }

    notas.push(nota)

    localStorage.setItem('notas', JSON.stringify(notas))
})

function Eliminar(nombreAEliminar) {
    let notas = JSON.parse(localStorage.getItem('notas'))
    for(let i=0; i<notas.length; i++) {
        if(notas[i].nombre == nombreAEliminar){
            notas.splice(i, 1);
        }
    }
    localStorage.setItem('notas', JSON.stringify(notas));

    return CrearHTML(notas)
}