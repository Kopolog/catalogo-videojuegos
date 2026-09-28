package com.example.catalogovideojuegos.repository;

import com.example.catalogovideojuegos.model.EstadoJuego;
import com.example.catalogovideojuegos.model.Videojuego;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface VideojuegoRepository extends MongoRepository <Videojuego, String>{
    List<Videojuego> findByPlataforma(String plataforma);
    List<Videojuego> findByGenero(String genero);
    List<Videojuego> findByEstado(EstadoJuego estado);
    List<Videojuego> findByAnio (int anio);
    List<Videojuego> findByTituloContainingIgnoreCase (String titulo);
    List<Videojuego> findByFavoritoTrue();
}
