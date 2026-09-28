package com.example.catalogovideojuegos.service;

import com.example.catalogovideojuegos.dto.VideojuegoRequest;
import com.example.catalogovideojuegos.exception.VideojuegoNoEncontradoException;
import com.example.catalogovideojuegos.model.EstadoJuego;
import com.example.catalogovideojuegos.model.Videojuego;
import com.example.catalogovideojuegos.repository.VideojuegoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VideojuegoService {

    private final VideojuegoRepository videojuegoRepository;

    public List<Videojuego> listarTodos(){
        return videojuegoRepository.findAll();
    }

    public Videojuego obtenerPorId(String id){
        return videojuegoRepository.findById(id)
                .orElseThrow(() -> new VideojuegoNoEncontradoException(id));
    }

    public Videojuego crear(VideojuegoRequest request){
        Videojuego videojuego = new Videojuego();
        mapearDatos(videojuego, request);
        if(request.isFavorito()){
            quitarFavoritoDeOtros(null);
        }
        return videojuegoRepository.save(videojuego);
    }

    public Videojuego actualizar(String id, VideojuegoRequest request){
        Videojuego videojuego= obtenerPorId(id);
        mapearDatos(videojuego, request);
        if(request.isFavorito()){
            quitarFavoritoDeOtros(id);
        }
        return videojuegoRepository.save(videojuego);
    }

    public void borrar(String id){
        Videojuego videojuego=obtenerPorId(id);
        videojuegoRepository.deleteById(videojuego.getId());
    }

    public List<Videojuego> buscarPorPlataforma(String plataforma){
        return videojuegoRepository.findByPlataforma(plataforma);
    }

    public List<Videojuego> buscarPorEstado(EstadoJuego estado) {
        return videojuegoRepository.findByEstado(estado);
    }

    public List<Videojuego> buscarPorTitulo(String titulo) {
        return videojuegoRepository.findByTituloContainingIgnoreCase(titulo);
    }

    public List<Videojuego> buscarPorGenero(String genero) {
        return videojuegoRepository.findByGenero(genero);
    }

    public void quitarFavoritoDeOtros(String idExcluido){

        List<Videojuego> favoritosActuales =videojuegoRepository.findByFavoritoTrue();
        favoritosActuales.stream()
                .filter(juego -> juego.getId().equals(idExcluido))
                .forEach(juego -> {
                        juego.setFavorito(false);
                    videojuegoRepository.save(juego);
    });
    }

    private void mapearDatos(Videojuego videojuego, VideojuegoRequest request){
        videojuego.setTitulo(request.getTitulo());
        videojuego.setPlataforma(request.getPlataforma());
        videojuego.setGenero(request.getGenero());
        videojuego.setAnio(request.getAnio());
        videojuego.setValoracion(request.getValoracion());
        videojuego.setHorasJugadas(request.getHorasJugadas());
        videojuego.setEstado(request.getEstado());
        videojuego.setUrlCaratula(request.getUrlCaratula());
        videojuego.setReseña(request.getReseña());
        videojuego.setFavorito(request.isFavorito());
    }

}
