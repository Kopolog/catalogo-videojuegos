// api.js — funciones compartidas para hablar con el backend Spring Boot

const API_BASE = 'http://localhost:8080/api/videojuegos';

/**
 * Lanza un error "enriquecido" cuando la respuesta no es 2xx.
 * Si el backend devuelve un JSON de error (400 de validación, 404...),
 * lo adjunta en err.data para que la pantalla pueda mostrarlo.
 */
async function manejarRespuesta(response) {
  if (response.status === 204) return null; // DELETE sin contenido

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

// Utilidad: como el id de MongoDB (ObjectId) empieza por un timestamp en hex,
// ordenar los ids de mayor a menor de forma alfabética equivale a
// ordenar de más reciente a más antiguo. Nos sirve para "últimos añadidos"
// sin tener que guardar un campo de fecha aparte.
function ordenarPorMasReciente(videojuegos) {
  return [...videojuegos].sort((a, b) => (a.id < b.id ? 1 : -1));
}

const ESTADOS_LABEL = {
  PENDIENTE: 'Pendiente',
  JUGANDO: 'Jugando',
  COMPLETADO: 'Completado',
  ABANDONADO: 'Abandonado',
};
