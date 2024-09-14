package com.example.Fish.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Fish.model.Fish;
import com.example.Fish.repositories.FishRepository;

import java.util.List;


@Service
public class FishService {

    @Autowired
    private FishRepository fishRepository;

    public Iterable<Fish> getFishes() {
        return fishRepository.findAll();
    }

    public Iterable<Fish> getByCommonName(String name) {
        return fishRepository.findByCommonNameContainsOrderByCommonNameAsc(name);
    }

    public Iterable<Fish> getByMultipleSpeciesGroups(List<String> speciesGroups) {
        return fishRepository.findBySpeciesGroupInOrderByCommonNameAsc(speciesGroups);
    }


    public Fish getByID(String id){
        return fishRepository.findById(id);
    }

    public Iterable<String> getSpeciesGroups() {
        return fishRepository.findAllDistinctSpeciesGroups();
    }

}
