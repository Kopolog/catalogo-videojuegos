Backlog: catálogo personal de videojuegos

Backlog es una aplicación web que permite llevar el registro de los videojuegos que el usuario ha jugado, está jugando o tiene pendientes. Cada juego se guarda con su plataforma, género, año de lanzamiento, estado, horas jugadas, valoración y, opcionalmente, una reseña personal.

El proyecto está formado por una API REST desarrollada con Spring Boot y una interfaz web escrita en HTML, CSS y JavaScript sin frameworks. Los datos se almacenan en MongoDB Atlas.

Se trata de un proyecto personal de aprendizaje, cuyo objetivo es afianzar Java y Spring Boot, trabajar con bases de datos documentales y practicar JavaScript puro.

Funcionalidades
Alta, consulta, edición y borrado de videojuegos.
Estados de seguimiento: pendiente, jugando, completado y abandonado.
Valoración mediante estrellas, con posibilidad de media estrella.
Reseña opcional de texto libre.
Marcado de un único juego como favorito.
Autocompletado de los datos del juego (año, género, carátula y plataformas disponibles) mediante la API pública de RAWG.
Página de inicio con los últimos juegos añadidos y los que están pendientes o abandonados.
Filtrado por plataforma, género, estado y título.
Validación de los datos en el servidor, con mensajes de error descriptivos.
Tecnologías
Backend: Java, Spring Boot, Spring Data MongoDB, Bean Validation y Lombok.
Base de datos: MongoDB Atlas.
Frontend: HTML, CSS y JavaScript.
Servicios externos: API de RAWG.
Gestión del proyecto: Maven.
Estructura del repositorio
src/: código del backend, organizado por capas (controlador, servicio, repositorio, modelo, DTO y excepciones).
frontend/: páginas y scripts de la interfaz web.
http/: peticiones de ejemplo para probar la API.
Estado del proyecto

En desarrollo. Están previstos, entre otros, la sección de últimos lanzamientos, la gestión de usuarios con reseñas públicas y el despliegue de la aplicación.

Licencia

Este proyecto se distribuye bajo la licencia MIT. Consulte el archivo LICENSE para más información.
