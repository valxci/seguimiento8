// Seleccionar elementos del DOM
const tarea = document.getElementById('ingresar-tarea');
const botonC = document.getElementById('boton-agregar');
const contenedorTareas = document.getElementById('lista-tareas');

// Obtener tareas del localStorage
function obtenerTareasLocalStorage() {
  const tareasGuardadas = localStorage.getItem('tareas');
  return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
}

// Guardar tareas en localStorage
function guardarTareasLocalStorage(tareasGuardadas) {
  localStorage.setItem('tareas', JSON.stringify(tareasGuardadas));
}

// Renderizar la lista de tareas en el DOM
function mostrarTareas() {
  const tareasGuardadas = obtenerTareasLocalStorage();
  contenedorTareas.innerHTML = ''; // Limpiar lista
  tareasGuardadas.forEach((itemTarea, indice) => {
    const tarjetaTarea = document.createElement('div');
    tarjetaTarea.classList.add('tarea');

    const parrafoTarea = document.createElement('p');
    parrafoTarea.classList.add('texto-tarea');
    parrafoTarea.textContent = itemTarea.texto;
    if (itemTarea.completada) {
      parrafoTarea.style.textDecoration = 'line-through';
    }

    const seccionBotones = document.createElement('div');
    seccionBotones.classList.add('botones-tarea');

    const botonCompletar = document.createElement('button');
    botonCompletar.classList.add('btn_ok');
    botonCompletar.textContent = '✔️';
    botonCompletar.onclick = () => completarTarea(indice);

    const botonBorrar = document.createElement('button');
    botonBorrar.classList.add('btn_eliminar');
    botonBorrar.textContent = '❌';
    botonBorrar.onclick = () => eliminarTarea(indice);

    seccionBotones.appendChild(botonCompletar);
    seccionBotones.appendChild(botonBorrar);

    tarjetaTarea.appendChild(parrafoTarea);
    tarjetaTarea.appendChild(seccionBotones);
    contenedorTareas.appendChild(tarjetaTarea);
  });
}

// Marcar la Tarea como completada
function completarTarea(indice) {
  const tareasGuardadas = obtenerTareasLocalStorage();
  tareasGuardadas[indice].completada = !tareasGuardadas[indice].completada;
  guardarTareasLocalStorage(tareasGuardadas);
  mostrarTareas();
}

// Eliminar la Tarea correspondiente
function eliminarTarea(indice) {
  const tareasGuardadas = obtenerTareasLocalStorage();
  tareasGuardadas.splice(indice, 1);
  guardarTareasLocalStorage(tareasGuardadas);
  mostrarTareas();
}

// Crear una nueva Tarea
function nuevaTarea() {
  const textoIngresado = tarea.value.trim();
  if (textoIngresado === '') return alert('Por favor, escribe una tarea.');

  const tareasGuardadas = obtenerTareasLocalStorage();
  tareasGuardadas.push({ texto: textoIngresado, completada: false });
  guardarTareasLocalStorage(tareasGuardadas);
  tarea.value = '';
  mostrarTareas();
}

// Escuchar eventos
botonC.addEventListener('click', nuevaTarea);
tarea.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    nuevaTarea();
  }
});

// Mostrar tareas al iniciar
mostrarTareas();
