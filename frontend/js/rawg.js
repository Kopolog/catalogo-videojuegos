// rawg.js — datos de videojuegos usando la API pública de RAWG
// Consigue tu API key gratis en https://rawg.io/apidocs y pégala abajo.

const RAWG_API_KEY = 'd64f47d1aee44e8eb8914d9dfa07ce99';
const RAWG_BASE = 'https://api.rawg.io/api';

// Usamos directamente los nombres de plataforma que devuelve RAWG (sin traducirlos
// a una lista fija propia), para que funcione igual con un lanzamiento de este año
// que con un juego de PS1 o Nintendo DS.
function obtenerNombresPlataforma(platformsRAWG) {
    const nombres = (platformsRAWG || []).map((p) => p.platform.name);
    return Array.from(new Set(nombres));
}

async function buscarJuegosRAWG(texto) {
    if (!texto || texto.trim().length < 3) return [];

    const url = `${RAWG_BASE}/games?search=${encodeURIComponent(texto)}&page_size=6&key=${RAWG_API_KEY}`;
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
        throw new Error('No se ha podido consultar RAWG');
    }

    const data = await respuesta.json();

    return (data.results || []).map((juego) => ({
        titulo: juego.name,
        anio: juego.released ? juego.released.slice(0, 4) : '',
        genero: (juego.genres || []).map((g) => g.name).join(', '),
        caratula: juego.background_image || '',
        plataformas: obtenerNombresPlataforma(juego.platforms),
    }));
}

function formatearFecha(fecha) {
    return fecha.toISOString().slice(0, 10); // YYYY-MM-DD
}

// Lanzamientos recientes de la industria (no la colección del usuario),
// ordenados por popularidad dentro de los últimos ~60 días para evitar
// que aparezcan solo juegos menores o sin relevancia.
async function obtenerUltimosLanzamientos(limite = 8) {
    const hoy = new Date();
    const haceSesentaDias = new Date();
    haceSesentaDias.setDate(hoy.getDate() - 60);

    const rango = `${formatearFecha(haceSesentaDias)},${formatearFecha(hoy)}`;
    const url = `${RAWG_BASE}/games?dates=${rango}&ordering=-added&page_size=${limite}&key=${RAWG_API_KEY}`;

    const respuesta = await fetch(url);
    if (!respuesta.ok) {
        throw new Error('No se ha podido consultar RAWG');
    }

    const data = await respuesta.json();

    return (data.results || []).map((juego) => ({
        titulo: juego.name,
        fechaLanzamiento: juego.released || '',
        genero: (juego.genres || []).map((g) => g.name).join(', '),
        plataformas: obtenerNombresPlataforma(juego.platforms),
        caratula: juego.background_image || '',
    }));
}