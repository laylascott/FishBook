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

import java.util.List;

@RestController
@RequestMapping(value = "/fish")
@CrossOrigin(origins = "*")  // Allow all origins for now, including mobile devices
public class FishController {

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Fish> getAllFish() {
        return fishService.getFishes();
    }

    @GetMapping(path = "/species-groups")
    public @ResponseBody Iterable<String> getAllSpeciesGroups() {
        return fishService.getSpeciesGroups();
    }

    @GetMapping(path = "/name")
    public @ResponseBody Iterable<Fish> getFishByName(@PathParam("Common Name") String name) {
        return fishService.getByCommonName(name);
    }

    @GetMapping(path = "/species")
    public @ResponseBody Iterable<Fish> getFishBySpecies(@PathParam("species") String species) {
        String[] speciesArray = species.split(",");
        return fishService.getByMultipleSpeciesGroups(List.of(speciesArray));
    }

    @GetMapping(path = "/filter-by-tank-size")
    public @ResponseBody Iterable<Fish> getFishByTankSize(@PathParam("tankSize") int tankSize) {
        // Fetch fish where the minimum tank size is less than or equal to the selected tank size
        return fishService.getCompFishTankSize(tankSize);
    }

    @GetMapping(path = "/id")
    public @ResponseBody Fish getFishByID(@PathParam("Id") String id) {
        return fishService.getByID(id);
    }

    @Autowired
    private FishService fishService;
}
