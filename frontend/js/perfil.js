const listaPerfil = document.getElementById('lista-perfil');
const contadorJuegos = document.getElementById('contador-juegos');

VideojuegosAPI.listar()
  .then((juegos) => {
    contadorJuegos.textContent = juegos.length === 1 ? '1 juego' : `${juegos.length} juegos`;

    if (juegos.length === 0) {
      mostrarEstadoVacio(listaPerfil, {
        titulo: 'Aún no tienes juegos guardados',
        texto: 'Ve a la pestaña "Buscar" para añadir el primero a tu colección.',
      });
      return;
    }

    listaPerfil.innerHTML = '';
    ordenarPorMasReciente(juegos).forEach((juego) => {
      listaPerfil.appendChild(crearTarjetaVideojuego(juego, { conAcciones: true }));
    });
  })
  .catch(() => {
    mostrarEstadoError(listaPerfil, {
      titulo: 'No se ha podido cargar tu colección',
      texto: 'Comprueba que el backend esté en marcha en localhost:8080 e inténtalo de nuevo.',
    });
  });
