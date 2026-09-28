package com.example.catalogovideojuegos.dto;

import com.example.catalogovideojuegos.model.EstadoJuego;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class VideojuegoRequest {

    @NotBlank(message = "El título es obligatorio")
    private String titulo;

    @NotBlank(message = "El género es obligatorio")
    private String genero;

    @Min(value = 1970, message = "El año debe ser 1970 o posterior")
    private int anio;

    @DecimalMin(value = "0.0", message = "La valoración no puede ser negativa")
    @DecimalMax(value = "10.0", message = "La valoración no puede ser mayor de 10")
    private double valoracion;

    @Min(value = 0, message = "Las horas jugadas no pueden ser negativas")
    private int horasJugadas;

    @NotBlank(message = "La plataforma es obligatoria")
    private String plataforma;

    @NotNull(message = "El estado es obligatorio")
    private EstadoJuego estado;

    private String urlCaratula;
    private String reseña;
    private boolean favorito;
}
