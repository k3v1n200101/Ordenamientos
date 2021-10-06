package com.example.inventario2_0.Repositorio;

import com.example.inventario2_0.Modelos.inventarioModelo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface inventarioRepositorio extends CrudRepository<inventarioModelo, Long> {
    void deleteById(Long id);
    Optional<inventarioModelo> findById(Long id);
}
