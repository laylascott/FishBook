package com.example.Fish.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.Fish.model.Fish;
import com.example.Fish.service.FishService;

import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping(value = "/fish")
@CrossOrigin(origins = "http://localhost:3000")
public class FishController {

//    @GetMapping(value = "again")
//    public ResponseEntity<Fish> helloGet2(@PathParam("id") String id)
//    {
//        // for http://localhost:8080/hello/again?id=1
//        Fish fish = fishRepository.findById(Integer.parseInt(id)).orElse(null);
//        System.out.println(fish + "----" + id);
//
//        return ResponseEntity.ok()
//                .header("Access-Control-Allow-Origin", "http://localhost:3000")
//                .body(fish);
//    }

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Fish> getAllFish() {
        // This returns a JSON with all fish
        return fishService.getFishes();
    }
    @GetMapping(path = "/name")
    public @ResponseBody Iterable<Fish> getFishByName(@PathParam("Common Name") String name) {
        // This returns a JSON with the fish by common name
        return fishService.getByCommonName(name);
    }
    @GetMapping(path = "/species")
    public @ResponseBody Iterable<Fish> getFishBySpecies(@PathParam("Species Group") String species) {
        // This returns a JSON with the fish by species
        return fishService.getBySpeciesGroup(species);
    }
    @GetMapping(path = "/id")
    public @ResponseBody Fish getFishByID(@PathParam("Id") String id) {
        // This returns a JSON with the fish by species
        return fishService.getByID(id);
    }

    @Autowired
    private FishService fishService;
}