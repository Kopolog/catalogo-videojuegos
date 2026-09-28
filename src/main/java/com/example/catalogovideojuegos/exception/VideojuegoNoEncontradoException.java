package com.example.catalogovideojuegos.exception;

import com.example.catalogovideojuegos.model.Videojuego;

public class VideojuegoNoEncontradoException extends RuntimeException{
    public VideojuegoNoEncontradoException(String id){
        super("Videojuego no encontrado con id "+id);
    }
}
