// ===== Configuración =====
dayjs.locale("es");

const API_BASE = "https://science.nasa.gov/wp-json/wp/v2/apod-basic";
const PRIMERA_APOD = "1995-06-16";

// ===== Elementos del DOM =====
const inputFecha = document.getElementById("fecha-input");
const botonBuscar = document.getElementById("buscar-btn");
const mensaje = document.getElementById("mensaje");
const estado = document.getElementById("estado");
const contenido = document.getElementById("contenido");
const titulo = document.getElementById("titulo");
const fechaTexto = document.getElementById("fecha");
const imagen = document.getElementById("imagen");
const enlaceVideo = document.getElementById("enlace-video");
const explicacion = document.getElementById("explicacion");

// Aquí se guarda la APOD que se está viendo (la usa la funcionalidad de favoritos)
let apodActual = null;

// ===== FUNCIONALIDAD 1: mostrar APOD  =====
function mostrarEstado(texto, esError = false) {
  estado.textContent = texto;
  estado.classList.toggle("error", esError);
  estado.hidden = texto === "";
}

function mostrarAPOD(apod) {
  titulo.textContent = apod.title;
  fechaTexto.textContent = dayjs(apod.date).format("D [de] MMMM [de] YYYY");

  // IMPORTANTE: la imagen está en hdurl (url es la página del artículo)
  imagen.src = apod.hdurl;
  imagen.alt = apod.title;

  // La explicación trae HTML, por eso innerHTML
  explicacion.innerHTML = apod.explanation;

  // Si es video, se muestra el enlace al sitio de la NASA
  if (apod.media_type === "video") {
    enlaceVideo.href = apod.permalink;
    enlaceVideo.hidden = false;
  } else {
    enlaceVideo.hidden = true;
  }

  contenido.hidden = false;
  apodActual = apod;
}

async function cargarAPOD(url, esLista = false) {
  mostrarEstado("Cargando…");
  contenido.hidden = true;
  botonBuscar.disabled = true;

  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      throw new Error("No hay APOD para esa fecha");
    }
    const datos = await respuesta.json();
    const apod = esLista ? datos[0] : datos;

    mostrarAPOD(apod);
    mostrarEstado("");
  } catch (error) {
    mostrarEstado(error.message, true);
  } finally {
    botonBuscar.disabled = false;
  }
}

function cargarAPODDeHoy() {
  cargarAPOD(`${API_BASE}?per_page=1`, true);
}

// ===== FUNCIONALIDAD 2 (ROL 3): buscar por fecha y validaciones =====
function mostrarMensaje(texto, esError = true) {
  mensaje.textContent = texto;
  mensaje.classList.toggle("error", esError);
}

// Devuelve el texto del error, o "" si la fecha es válida
function validarFecha(fecha) {
  if (!fecha) {
    return "Por favor elige una fecha.";
  }
  if (dayjs(fecha).isAfter(dayjs(), "day")) {
    return "Esa fecha es futura: la NASA aún no tiene esa APOD.";
  }
  if (dayjs(fecha).isBefore(dayjs(PRIMERA_APOD), "day")) {
    return "La fecha es anterior al 16 de junio de 1995, la primera APOD.";
  }
  return "";
}

// "2024-03-15" -> "240315"
function formatearParaAPI(fecha) {
  return dayjs(fecha).format("YYMMDD");
}

function buscarPorFecha() {
  const fecha = inputFecha.value;
  const error = validarFecha(fecha);

  if (error) {
    mostrarMensaje(error);
    return; // no se llama a la API
  }

  mostrarMensaje("");
  cargarAPOD(`${API_BASE}/${formatearParaAPI(fecha)}`);
}

function configurarInputFecha() {
  inputFecha.min = PRIMERA_APOD;
  inputFecha.max = dayjs().format("YYYY-MM-DD");
}

// ===== Inicio =====
configurarInputFecha();
botonBuscar.addEventListener("click", buscarPorFecha);
cargarAPODDeHoy();