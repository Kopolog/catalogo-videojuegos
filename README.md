<div align="center">

# Backlog

**Catálogo personal de videojuegos**

Aplicación web para registrar los videojuegos que se han jugado, se están jugando o están pendientes.

<br>

<a href="https://kopolog.github.io/catalogo-videojuegos/"><b>Ver demostración en línea</b></a>

<br>
<br>

<img src="https://img.shields.io/badge/Java-17+-1f2328?style=flat-square&logo=openjdk&logoColor=white" alt="Java">
<img src="https://img.shields.io/badge/Spring_Boot-4-1f2328?style=flat-square&logo=springboot&logoColor=white" alt="Spring Boot">
<img src="https://img.shields.io/badge/MongoDB-Atlas-1f2328?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB Atlas">
<img src="https://img.shields.io/badge/JavaScript-vanilla-1f2328?style=flat-square&logo=javascript&logoColor=white" alt="JavaScript">
<img src="https://img.shields.io/badge/Docker-desplegado-1f2328?style=flat-square&logo=docker&logoColor=white" alt="Docker">
<img src="https://img.shields.io/badge/licencia-MIT-1f2328?style=flat-square" alt="Licencia MIT">

</div>

<br>

## Descripción

Backlog permite llevar el registro de los videojuegos del usuario. Cada juego se guarda con su plataforma, género, año de lanzamiento, estado, horas jugadas, valoración y, opcionalmente, una reseña personal.

El proyecto se compone de una API REST desarrollada con Spring Boot y una interfaz web escrita en HTML, CSS y JavaScript sin frameworks. Los datos se almacenan en MongoDB Atlas, y la aplicación está desplegada en internet.

Se trata de un proyecto personal de aprendizaje, cuyo objetivo es afianzar Java y Spring Boot, trabajar con bases de datos documentales, practicar JavaScript puro y conocer el ciclo completo de despliegue de una aplicación.

## Demostración

La aplicación está disponible en [kopolog.github.io/catalogo-videojuegos](https://kopolog.github.io/catalogo-videojuegos/).

El servidor de la API se aloja en un plan gratuito que se suspende tras un periodo de inactividad. Por ello, en la primera visita los datos pueden tardar entre 30 y 50 segundos en aparecer mientras el servicio se reactiva. Las visitas posteriores responden con normalidad.

<!--
Para mostrar capturas de pantalla: crear la carpeta docs/ en el repositorio,
subir las imágenes con estos nombres y eliminar las marcas de comentario de este bloque.

## Capturas

<table>
  <tr>
    <td align="center"><img src="docs/home.png" width="400" alt="Página de inicio"><br><sub>Inicio</sub></td>
    <td align="center"><img src="docs/perfil.png" width="400" alt="Colección del usuario"><br><sub>Colección</sub></td>
  </tr>
  <tr>
    <td align="center" colspan="2"><img src="docs/buscar.png" width="400" alt="Formulario de alta"><br><sub>Alta de videojuegos con autocompletado</sub></td>
  </tr>
</table>
-->

## Funcionalidades

- Alta, consulta, edición y borrado de videojuegos.
- Estados de seguimiento: pendiente, jugando, completado y abandonado.
- Valoración mediante estrellas, con posibilidad de media estrella.
- Reseña opcional de texto libre.
- Marcado de un único juego como favorito.
- Autocompletado de los datos del juego (año, género, carátula y plataformas disponibles) mediante la API pública de RAWG, incluidas las plataformas de generaciones anteriores.
- Página de inicio con los últimos juegos añadidos, los que están pendientes o abandonados y los lanzamientos más recientes de la industria.
- Filtrado por plataforma, género, estado y título.
- Validación de los datos en el servidor, con mensajes de error descriptivos.

## Tecnologías

**Backend**

<img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java">
<img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot">
<img src="https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white" alt="Maven">

**Base de datos**

<img src="https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Atlas">

**Frontend**

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">

**Despliegue**

<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
<img src="https://img.shields.io/badge/Render-1f2328?style=for-the-badge&logo=render&logoColor=white" alt="Render">
<img src="https://img.shields.io/badge/GitHub_Pages-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Pages">
<img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions">

**Servicios externos**

<img src="https://img.shields.io/badge/RAWG_API-2B2B2B?style=for-the-badge" alt="API de RAWG">

Además se utilizan Spring Data MongoDB, Bean Validation y Lombok en el backend.

## Arquitectura y despliegue

La aplicación se divide en tres piezas independientes:

<table>
  <tr>
    <td><b>Interfaz web</b></td>
    <td>Archivos estáticos publicados en GitHub Pages mediante un flujo de GitHub Actions que despliega la carpeta <code>frontend/</code> en cada cambio.</td>
  </tr>
  <tr>
    <td><b>API REST</b></td>
    <td>Aplicación Spring Boot empaquetada con Docker y alojada en Render. Se reconstruye y reinicia automáticamente con cada cambio en la rama principal.</td>
  </tr>
  <tr>
    <td><b>Base de datos</b></td>
    <td>Clúster de MongoDB Atlas con acceso restringido por lista de direcciones IP.</td>
  </tr>
</table>

La cadena de conexión a la base de datos no forma parte del código: se proporciona a la aplicación mediante la variable de entorno `MONGODB_URI`.

## Estructura del repositorio

<details>
<summary>Ver estructura</summary>

<br>

- `src/`: código del backend, organizado por capas (controlador, servicio, repositorio, modelo, DTO y excepciones).
- `frontend/`: páginas y scripts de la interfaz web.
- `http/`: peticiones de ejemplo para probar la API.
- `Dockerfile`: definición de la imagen con la que se despliega el backend.
- `.github/workflows/`: flujo de publicación del frontend en GitHub Pages.

</details>

## Estado del proyecto

El proyecto cuenta con backend, interfaz web y despliegue operativos. Entre las ampliaciones previstas figuran la gestión de usuarios con autenticación, las reseñas públicas, la importación de la biblioteca de Steam y la incorporación de pruebas automáticas.

## Créditos

Los datos e imágenes de videojuegos proceden de [RAWG](https://rawg.io), cuya API gratuita se utiliza bajo sus condiciones de uso.

## Licencia

Este proyecto se distribuye bajo la licencia MIT. Consulte el archivo [LICENSE](LICENSE) para más información.
