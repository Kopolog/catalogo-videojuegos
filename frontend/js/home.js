const listaRecientes = document.getElementById('lista-recientes');
const contadorRecientes = document.getElementById('contador-recientes');
const listaEsperan = document.getElementById('lista-esperan');
const contadorEsperan = document.getElementById('contador-esperan');
const MAX_RECIENTES = 4;
const MAX_ESPERAN = 4;

VideojuegosAPI.listar()
  .then((juegos) => {
    if (juegos.length === 0) {
      contadorRecientes.textContent = '';
      mostrarEstadoVacio(listaRecientes, {
        titulo: 'Tu colección está vacía',
        texto: 'Ve a la pestaña "Buscar" para añadir tu primer videojuego.',
      });
      mostrarEstadoVacio(listaEsperan, {
        titulo: 'Nada pendiente por aquí',
        texto: 'Cuando marques un juego como pendiente o abandonado, aparecerá en esta sección.',
      });
      return;
    }

    const recientes = ordenarPorMasReciente(juegos).slice(0, MAX_RECIENTES);
    contadorRecientes.textContent = `${juegos.length === 1 ? '1 juego en total' : juegos.length + ' juegos en total'}`;
    listaRecientes.innerHTML = '';
    recientes.forEach((juego) => {
      listaRecientes.appendChild(crearTarjetaVideojuego(juego));
    });

    const teEsperan = juegos.filter((j) => j.estado === 'PENDIENTE' || j.estado === 'ABANDONADO');
    if (teEsperan.length === 0) {
      contadorEsperan.textContent = '';
      mostrarEstadoVacio(listaEsperan, {
        titulo: '¡Al día con todo!',
        texto: 'No tienes juegos pendientes ni abandonados ahora mismo.',
      });
    } else {
      contadorEsperan.textContent = teEsperan.length === 1 ? '1 juego' : `${teEsperan.length} juegos`;
      listaEsperan.innerHTML = '';
      ordenarPorMasReciente(teEsperan).slice(0, MAX_ESPERAN).forEach((juego) => {
        listaEsperan.appendChild(crearTarjetaVideojuego(juego));
      });
    }
  })
  .catch(() => {
    mostrarEstadoError(listaRecientes, {
      titulo: 'No se ha podido cargar tu colección',
      texto: 'Comprueba que el backend esté en marcha en localhost:8080 e inténtalo de nuevo.',
    });
    mostrarEstadoError(listaEsperan, {
      titulo: 'No se ha podido cargar',
      texto: 'Comprueba que el backend esté en marcha e inténtalo de nuevo.',
    });
  });