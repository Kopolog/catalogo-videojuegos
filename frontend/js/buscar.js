const form = document.getElementById('form-videojuego');
const mensaje = document.getElementById('mensaje-formulario');
const btnGuardar = document.getElementById('btn-guardar');
const tituloPagina = document.getElementById('titulo-pagina');

const params = new URLSearchParams(window.location.search);
const idEdicion = params.get('id');

const campos = ['titulo', 'plataforma', 'genero', 'anio', 'valoracion', 'horasJugadas', 'estado', 'urlCaratula', 'reseña', 'favorito'];

// ---------- Rating bar (estrellas, con medias) ----------
const ratingBar = document.getElementById('rating-bar');
const ratingInput = document.getElementById('valoracion');
const estrellas = Array.from(ratingBar.querySelectorAll('.rating-bar__star'));

function pintarEstrellas(valor) {
  estrellas.forEach((estrella) => {
    const indice = Number(estrella.dataset.index); // 1 a 5
    const relleno = Math.min(Math.max(valor - (indice - 1) * 2, 0), 2) / 2; // 0, 0.5 o 1
    estrella.querySelector('.rating-bar__star-fill').style.width = `${relleno * 100}%`;
  });
}

estrellas.forEach((estrella) => {
  estrella.addEventListener('click', (evento) => {
    const indice = Number(estrella.dataset.index);
    const rect = estrella.getBoundingClientRect();
    const clicEnMitadIzquierda = (evento.clientX - rect.left) < rect.width / 2;
    const valor = clicEnMitadIzquierda ? indice * 2 - 1 : indice * 2;
    ratingInput.value = valor;
    pintarEstrellas(valor);
  });
});

// ---------- Corazón de favorito ----------
const heartToggle = document.getElementById('heart-toggle');
const heartInput = document.getElementById('favorito');
const heartIcon = heartToggle.querySelector('.heart-toggle__icon');

function pintarCorazon(activo) {
  heartToggle.classList.toggle('is-active', activo);
  heartToggle.setAttribute('aria-pressed', String(activo));
  heartIcon.textContent = activo ? '♥' : '♡';
}

heartToggle.addEventListener('click', () => {
  const nuevoValor = heartInput.value !== 'true';
  heartInput.value = String(nuevoValor);
  pintarCorazon(nuevoValor);
});

// ---------- Plataformas: se reconstruyen según el juego elegido ----------
const PLATAFORMAS_POR_DEFECTO = Array.from(form.elements.plataforma.options).map((opt) => ({
  value: opt.value,
  texto: opt.textContent,
}));

function restringirPlataformas(valoresDisponibles) {
  const select = form.elements.plataforma;
  const placeholder = PLATAFORMAS_POR_DEFECTO[0];

  const opciones = valoresDisponibles.length > 0
      ? [placeholder, ...valoresDisponibles.map((nombre) => ({ value: nombre, texto: nombre }))]
      : PLATAFORMAS_POR_DEFECTO;

  select.innerHTML = '';
  opciones.forEach((opt) => {
    const option = document.createElement('option');
    option.value = opt.value;
    option.textContent = opt.texto;
    select.appendChild(option);
  });

  if (valoresDisponibles.length === 1) {
    select.value = valoresDisponibles[0];
  }
}

// Añade, si hace falta, una opción para una plataforma guardada que ya no
// esté en la lista actual del <select> (por ejemplo, al editar un juego).
function asegurarOpcionPlataforma(nombre) {
  if (!nombre) return;
  const select = form.elements.plataforma;
  const yaExiste = Array.from(select.options).some((opt) => opt.value === nombre);
  if (!yaExiste) {
    const option = document.createElement('option');
    option.value = nombre;
    option.textContent = nombre;
    select.appendChild(option);
  }
  select.value = nombre;
}

// ---------- Vista previa del juego elegido (título/año/género/carátula bloqueados) ----------
const selectedGame = document.getElementById('selected-game');
const selectedGameCover = document.getElementById('selected-game-cover');
const selectedGameTitle = document.getElementById('selected-game-title');
const selectedGameMeta = document.getElementById('selected-game-meta');
const tituloInput = document.getElementById('titulo');
const tituloHint = document.getElementById('titulo-hint');
const autocompleteList = document.getElementById('autocomplete-list');
let debounceTimer = null;

function mostrarJuegoSeleccionado({ titulo, anio, genero, caratula }) {
  selectedGameTitle.textContent = titulo;
  selectedGameMeta.textContent = [anio, genero].filter(Boolean).join(' · ');
  selectedGameCover.innerHTML = '';
  if (caratula) {
    const img = document.createElement('img');
    img.src = caratula;
    img.alt = `Carátula de ${titulo}`;
    selectedGameCover.appendChild(img);
  }
  selectedGame.hidden = false;
}

function limpiarJuegoSeleccionado() {
  form.elements.anio.value = '';
  form.elements.genero.value = '';
  form.elements.urlCaratula.value = '';
  selectedGame.hidden = true;
  restringirPlataformas([]);
}

function seleccionarJuegoRAWG(juego) {
  tituloInput.value = juego.titulo;
  form.elements.anio.value = juego.anio || '';
  form.elements.genero.value = juego.genero || '';
  form.elements.urlCaratula.value = juego.caratula || '';
  restringirPlataformas(juego.plataformas || []);
  mostrarJuegoSeleccionado(juego);
  limpiarErrores();

  autocompleteList.classList.remove('show');
  autocompleteList.innerHTML = '';
}

function mostrarResultadosAutocompletado(resultados) {
  autocompleteList.innerHTML = '';

  if (resultados.length === 0) {
    autocompleteList.classList.remove('show');
    return;
  }

  resultados.forEach((juego) => {
    const item = document.createElement('div');
    item.className = 'autocomplete-item';

    const imagen = juego.caratula
        ? `<img src="${juego.caratula}" alt="">`
        : `<div class="autocomplete-item__placeholder"></div>`;

    item.innerHTML = `
      ${imagen}
      <div class="autocomplete-item__info">
        <span class="autocomplete-item__title">${juego.titulo}</span>
        <span class="autocomplete-item__meta">${juego.anio || '—'}${juego.genero ? ' · ' + juego.genero : ''}</span>
      </div>
    `;

    item.addEventListener('click', () => seleccionarJuegoRAWG(juego));
    autocompleteList.appendChild(item);
  });

  autocompleteList.classList.add('show');
}

tituloInput.addEventListener('input', () => {
  if (form.elements.anio.value) limpiarJuegoSeleccionado();

  clearTimeout(debounceTimer);
  const texto = tituloInput.value.trim();

  if (texto.length < 3) {
    autocompleteList.classList.remove('show');
    autocompleteList.innerHTML = '';
    return;
  }

  debounceTimer = setTimeout(() => {
    buscarJuegosRAWG(texto)
        .then(mostrarResultadosAutocompletado)
        .catch(() => {
          autocompleteList.classList.remove('show');
        });
  }, 400);
});

document.addEventListener('click', (evento) => {
  if (evento.target !== tituloInput && !evento.target.closest('#autocomplete-list')) {
    autocompleteList.classList.remove('show');
  }
});

// ---------- Si venimos con ?id=... es una edición: cargamos los datos existentes ----------
if (idEdicion) {
  tituloPagina.textContent = 'Editar videojuego';
  btnGuardar.textContent = 'Guardar cambios';
  tituloInput.readOnly = true;
  tituloHint.hidden = true;

  VideojuegosAPI.obtener(idEdicion)
      .then((juego) => {
        mostrarJuegoSeleccionado({
          titulo: juego.titulo,
          anio: juego.anio,
          genero: juego.genero,
          caratula: juego.urlCaratula,
        });

        campos.forEach((campo) => {
          if (campo === 'valoracion') {
            ratingInput.value = juego.valoracion || 0;
            pintarEstrellas(juego.valoracion || 0);
            return;
          }
          if (campo === 'favorito') {
            heartInput.value = String(!!juego.favorito);
            pintarCorazon(!!juego.favorito);
            return;
          }
          if (campo === 'plataforma') {
            asegurarOpcionPlataforma(juego.plataforma);
            return;
          }
          const input = form.elements[campo];
          if (input && juego[campo] !== undefined && juego[campo] !== null) {
            input.value = juego[campo];
          }
        });
      })
      .catch(() => {
        mostrarMensaje('error', 'No se ha podido cargar este videojuego. Puede que ya no exista.');
      });
}

function limpiarErrores() {
  form.querySelectorAll('.field-error').forEach((el) => (el.textContent = ''));
  form.querySelectorAll('.has-error').forEach((el) => el.classList.remove('has-error'));
}

function mostrarErroresValidacion(erroresPorCampo) {
  const ocultos = ['anio', 'genero', 'urlCaratula'];
  Object.entries(erroresPorCampo).forEach(([campo, texto]) => {
    const campoVisible = ocultos.includes(campo) ? 'titulo' : campo;
    const errorEl = form.querySelector(`[data-error-for="${campoVisible}"]`);
    const input = form.elements[campoVisible];
    if (errorEl) errorEl.textContent = texto;
    if (input) input.classList.add('has-error');
  });
}

function mostrarMensaje(tipo, texto) {
  mensaje.textContent = texto;
  mensaje.className = `form-message show form-message--${tipo}`;
}

function recogerDatosFormulario() {
  const datos = Object.fromEntries(new FormData(form).entries());
  return {
    titulo: datos.titulo.trim(),
    plataforma: datos.plataforma,
    genero: datos.genero.trim(),
    anio: Number(datos.anio),
    valoracion: Number(ratingInput.value),
    horasJugadas: Number(datos.horasJugadas || 0),
    estado: datos.estado,
    urlCaratula: datos.urlCaratula.trim() || null,
    reseña: (datos.reseña || '').trim() || null,
    favorito: heartInput.value === 'true',
  };
}

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  limpiarErrores();
  mensaje.className = 'form-message';

  if (!idEdicion && !form.elements.anio.value) {
    mostrarErroresValidacion({ titulo: 'Elige un juego de la lista de resultados.' });
    tituloInput.focus();
    return;
  }

  const datos = recogerDatosFormulario();
  const peticion = idEdicion
      ? VideojuegosAPI.actualizar(idEdicion, datos)
      : VideojuegosAPI.crear(datos);

  btnGuardar.disabled = true;

  peticion
      .then(() => {
        mostrarMensaje('success', idEdicion ? 'Cambios guardados correctamente.' : '¡Videojuego añadido a tu colección!');
        if (!idEdicion) form.reset();
        setTimeout(() => {
          window.location.href = 'perfil.html';
        }, 900);
      })
      .catch((error) => {
        if (error.status === 400 && error.data) {
          mostrarErroresValidacion(error.data);
          mostrarMensaje('error', 'Revisa los campos marcados antes de continuar.');
        } else {
          mostrarMensaje('error', 'No se ha podido guardar. Comprueba que el backend esté en marcha e inténtalo de nuevo.');
        }
      })
      .finally(() => {
        btnGuardar.disabled = false;
      });
});