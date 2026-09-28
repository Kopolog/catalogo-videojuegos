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
  const nEstrellas = valor / 2;
  ratingTexto.textContent = valor > 0 ? `${nEstrellas} de 5` : 'Sin valorar';
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

// ---------- Si venimos con ?id=... es una edición: cargamos los datos existentes ----------
if (idEdicion) {
  tituloPagina.textContent = 'Editar videojuego';
  btnGuardar.textContent = 'Guardar cambios';

  VideojuegosAPI.obtener(idEdicion)
      .then((juego) => {
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
  Object.entries(erroresPorCampo).forEach(([campo, texto]) => {
    const errorEl = form.querySelector(`[data-error-for="${campo}"]`);
    const input = form.elements[campo];
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