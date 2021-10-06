package com.example.inventario2_0.Controlador;

import com.example.inventario2_0.Modelos.inventarioModelo;
import com.example.inventario2_0.Servicios.inventarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE})
@RequestMapping("/inventario")
public class inventarioControlador {
    @Autowired
    inventarioServicio invServicio;

    @GetMapping()
    public ArrayList<inventarioModelo> obtenerInventario(){
        return invServicio.obtenerInventario();
    }
    @PostMapping
    public inventarioModelo guardarInventario(@RequestBody inventarioModelo invModelo){
        return invServicio.guardarInventario(invModelo);
    }
    @DeleteMapping(path = "/{id}")
    public String eliminarPorId(@PathVariable("id") Long id){
        boolean ok = this.invServicio.eliminarInventario(id);
        if (ok){
            return "Se eliminó el usuario con id " + id;
        }else{
            return "No pudo eliminar el usuario con id " + id;
        }
    }
}
