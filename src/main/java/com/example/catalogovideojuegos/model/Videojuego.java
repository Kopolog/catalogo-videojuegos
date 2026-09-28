package com.example.catalogovideojuegos.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "videojuegos")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Videojuego {

    @Id
    private String id;

    private String reseña;
    private boolean favorito;
    private String titulo;
    private String plataforma;
    private String genero;
    private int anio;
    private double valoracion;
    private int horasJugadas;
    private EstadoJuego estado;
    private String urlCaratula;
}
