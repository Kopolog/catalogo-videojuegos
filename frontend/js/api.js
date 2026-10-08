// api.js — funciones compartidas para hablar con el backend Spring Boot

const ES_LOCAL = ['localhost', '127.0.0.1'].includes(window.location.hostname);
const API_BASE = ES_LOCAL
    ? 'http://localhost:8080/api/videojuegos'
    : 'https://catalogo-videojuegos-fh8x.onrender.com/api/videojuegos';

async function manejarRespuesta(response) {
  if (response.status === 204) return null;

  let data = null;
  try {
    data = await response.json();
  } catch (_) {
    // respuesta sin cuerpo JSON, no pasa nada
  }

  if (!response.ok) {
    const error = new Error(`Error ${response.status} al llamar a la API`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

const VideojuegosAPI = {
  listar(filtros = {}) {
    const params = new URLSearchParams();
    Object.entries(filtros).forEach(([clave, valor]) => {
      if (valor) params.append(clave, valor);
    });
    const query = params.toString();
    return fetch(`${API_BASE}${query ? '?' + query : ''}`).then(manejarRespuesta);
  },

  obtener(id) {
    return fetch(`${API_BASE}/${id}`).then(manejarRespuesta);
  },

  crear(datos) {
    return fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    }).then(manejarRespuesta);
  },

  actualizar(id, datos) {
    return fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    }).then(manejarRespuesta);
  },

  borrar(id) {
    return fetch(`${API_BASE}/${id}`, { method: 'DELETE' }).then(manejarRespuesta);
  },
};

function ordenarPorMasReciente(videojuegos) {
  return [...videojuegos].sort((a, b) => (a.id < b.id ? 1 : -1));
}

const ESTADOS_LABEL = {
  PENDIENTE: 'Pendiente',
  JUGANDO: 'Jugando',
  COMPLETADO: 'Completado',
  ABANDONADO: 'Abandonado',
};