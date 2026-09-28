<div align="center">
Backlog

Catálogo personal de videojuegos

Aplicación web para registrar los videojuegos que se han jugado, se están jugando o están pendientes.

<br> <img src="https://img.shields.io/badge/Java-17+-1f2328?style=flat-square&logo=openjdk&logoColor=white" alt="Java"> <img src="https://img.shields.io/badge/Spring_Boot-4-1f2328?style=flat-square&logo=springboot&logoColor=white" alt="Spring Boot"> <img src="https://img.shields.io/badge/MongoDB-Atlas-1f2328?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB Atlas"> <img src="https://img.shields.io/badge/JavaScript-vanilla-1f2328?style=flat-square&logo=javascript&logoColor=white" alt="JavaScript"> <img src="https://img.shields.io/badge/licencia-MIT-1f2328?style=flat-square" alt="Licencia MIT"> </div> <br>
Descripción

Backlog permite llevar el registro de los videojuegos del usuario. Cada juego se guarda con su plataforma, género, año de lanzamiento, estado, horas jugadas, valoración y, opcionalmente, una reseña personal.

El proyecto se compone de una API REST desarrollada con Spring Boot y una interfaz web escrita en HTML, CSS y JavaScript sin frameworks. Los datos se almacenan en MongoDB Atlas.

Se trata de un proyecto personal de aprendizaje, cuyo objetivo es afianzar Java y Spring Boot, trabajar con bases de datos documentales y practicar JavaScript puro.

<!-- Para mostrar capturas de pantalla: crear la carpeta docs/ en el repositorio, subir las imágenes con estos nombres y eliminar las marcas de comentario de este bloque. ## Capturas <table> <tr> <td align="center"><img src="docs/home.png" width="400" alt="Página de inicio"><br><sub>Inicio</sub></td> <td align="center"><img src="docs/perfil.png" width="400" alt="Colección del usuario"><br><sub>Colección</sub></td> </tr> <tr> <td align="center" colspan="2"><img src="docs/buscar.png" width="400" alt="Formulario de alta"><br><sub>Alta de videojuegos con autocompletado</sub></td> </tr> </table> -->
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
<table> <tr> <td><b>Backend</b></td> <td>Java, Spring Boot, Spring Data MongoDB, Bean Validation, Lombok</td> </tr> <tr> <td><b>Base de datos</b></td> <td>MongoDB Atlas</td> </tr> <tr> <td><b>Frontend</b></td> <td>HTML, CSS y JavaScript</td> </tr> <tr> <td><b>Servicios externos</b></td> <td>API de RAWG</td> </tr> <tr> <td><b>Gestión del proyecto</b></td> <td>Maven</td> </tr> </table>
Estructura del repositorio
<details> <summary>Ver estructura</summary> <br>
src/: código del backend, organizado por capas (controlador, servicio, repositorio, modelo, DTO y excepciones).
frontend/: páginas y scripts de la interfaz web.
http/: peticiones de ejemplo para probar la API.
</details>
Estado del proyecto

En desarrollo. Están previstos, entre otros, la sección de últimos lanzamientos, la gestión de usuarios con reseñas públicas y el despliegue de la aplicación.

Licencia

Este proyecto se distribuye bajo la licencia MIT. Consulte el archivo LICENSE para más información.
