// ui.js — helpers de renderizado compartidos entre páginas

function crearTarjetaVideojuego(juego, { conAcciones = false } = {}) {
  const card = document.createElement('article');
  card.className = 'game-card';

  const cover = document.createElement('div');
  cover.className = 'game-card__cover';

  if (juego.favorito) {
    const badge = document.createElement('span');
    badge.className = 'favorite-badge';
    badge.title = 'Tu juego favorito';
    badge.textContent = '★';
    cover.appendChild(badge);
  }

  if (juego.urlCaratula) {
    const img = document.createElement('img');
    img.src = juego.urlCaratula;
    img.alt = `Carátula de ${juego.titulo}`;
    img.onerror = () => {
      const placeholder = document.createElement('span');
      placeholder.className = 'placeholder';
      placeholder.textContent = juego.titulo?.charAt(0) || '?';
      cover.appendChild(placeholder);
      img.remove();
    };
    cover.appendChild(img);
  } else {
    const placeholder = document.createElement('span');
    placeholder.className = 'placeholder';
    placeholder.textContent = juego.titulo?.charAt(0) || '?';
    cover.appendChild(placeholder);
  }

  const body = document.createElement('div');
  body.className = 'game-card__body';

  const titulo = document.createElement('div');
  titulo.className = 'game-card__title';
  titulo.textContent = juego.titulo;

  const meta = document.createElement('div');
  meta.className = 'game-card__meta';
  meta.textContent = `${juego.plataforma} · ${juego.genero} · ${juego.anio}`;

  body.appendChild(titulo);
  body.appendChild(meta);

  if (juego.valoracion > 0) {
    const stars = document.createElement('div');
    stars.className = 'game-card__stars';
    const nEstrellas = Math.round(juego.valoracion / 2);
    stars.textContent = '★'.repeat(nEstrellas) + '☆'.repeat(5 - nEstrellas);
    body.appendChild(stars);
  }

  const footer = document.createElement('div');
  footer.className = 'game-card__footer';

  const tag = document.createElement('span');
  const estadoKey = (juego.estado || '').toLowerCase();
  tag.className = `tag tag--${estadoKey}`;
  tag.textContent = ESTADOS_LABEL[juego.estado] || juego.estado;

  footer.appendChild(tag);

  if (conAcciones) {
    const acciones = document.createElement('div');
    acciones.className = 'game-card__actions';

    const btnEditar = document.createElement('a');
    btnEditar.className = 'icon-btn';
    btnEditar.title = 'Editar';
    btnEditar.href = `buscar.html?id=${juego.id}`;
    btnEditar.textContent = '✎';

    const btnBorrar = document.createElement('button');
    btnBorrar.className = 'icon-btn icon-btn--danger';
    btnBorrar.title = 'Borrar';
    btnBorrar.textContent = '✕';
    btnBorrar.addEventListener('click', () => {
      if (confirm(`¿Borrar "${juego.titulo}" de tu catálogo?`)) {
        VideojuegosAPI.borrar(juego.id)
          .then(() => card.remove())
          .catch(() => alert('No se ha podido borrar el videojuego. Inténtalo de nuevo.'));
      }
    });

    acciones.appendChild(btnEditar);
    acciones.appendChild(btnBorrar);
    footer.appendChild(acciones);
  }

  body.appendChild(footer);

  card.appendChild(cover);
  card.appendChild(body);

  return card;
}

function mostrarEstadoVacio(contenedor, { titulo, texto }) {
  contenedor.innerHTML = '';
  const bloque = document.createElement('div');
  bloque.className = 'state-block';
  bloque.innerHTML = `<strong>${titulo}</strong>${texto}`;
  contenedor.appendChild(bloque);
}

function mostrarEstadoError(contenedor, { titulo, texto }) {
  contenedor.innerHTML = '';
  const bloque = document.createElement('div');
  bloque.className = 'state-block state-block--error';
  bloque.innerHTML = `<strong>${titulo}</strong>${texto}`;
  contenedor.appendChild(bloque);
}