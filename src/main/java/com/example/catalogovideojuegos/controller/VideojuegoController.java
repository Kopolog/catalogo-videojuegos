package com.example.catalogovideojuegos.controller;

import com.example.catalogovideojuegos.dto.VideojuegoRequest;
import com.example.catalogovideojuegos.model.EstadoJuego;
import com.example.catalogovideojuegos.model.Videojuego;
import com.example.catalogovideojuegos.service.VideojuegoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/videojuegos")
@RequiredArgsConstructor
public class VideojuegoController {

    private final VideojuegoService videojuegoService;

    @GetMapping
    public List<Videojuego> listar(
            @RequestParam(required = false) String plataforma,
            @RequestParam(required = false) String genero,
            @RequestParam(required = false) EstadoJuego estado,
            @RequestParam(required = false) String titulo
    ) {
        if (plataforma != null) return videojuegoService.buscarPorPlataforma(plataforma);
        if (genero != null) return videojuegoService.buscarPorGenero(genero);
        if (estado != null) return videojuegoService.buscarPorEstado(estado);
        if (titulo != null) return videojuegoService.buscarPorTitulo(titulo);
        return videojuegoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Videojuego obtenerPorId(@PathVariable String id) {
        return videojuegoService.obtenerPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Videojuego crear(@Valid @RequestBody VideojuegoRequest request) {
        return videojuegoService.crear(request);
    }

    @PutMapping("/{id}")
    public Videojuego actualizar(@PathVariable String id, @Valid @RequestBody VideojuegoRequest request) {
        return videojuegoService.actualizar(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void borrar(@PathVariable String id) {
        videojuegoService.borrar(id);
    }
}

