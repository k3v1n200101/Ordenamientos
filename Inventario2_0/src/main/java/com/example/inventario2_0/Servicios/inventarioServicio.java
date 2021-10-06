package com.example.inventario2_0.Servicios;

import com.example.inventario2_0.Modelos.inventarioModelo;
import com.example.inventario2_0.Repositorio.inventarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
@Service
public class inventarioServicio {
    @Autowired
    inventarioRepositorio invRepositorio;

    public ArrayList<inventarioModelo> obtenerInventario() {
        return (ArrayList<inventarioModelo>) invRepositorio.findAll();
    }

    public inventarioModelo guardarInventario(inventarioModelo inventario) {
        return invRepositorio.save(inventario);
    }

    public boolean eliminarInventario(Long id) {
        try {
            invRepositorio.deleteById(id);
            return true;
        } catch (Exception err) {
            return false;
        }
    }
}
