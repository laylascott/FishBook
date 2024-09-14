package com.example.Fish.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.Fish.model.Fish;

import java.util.List;

@Repository
public interface FishRepository extends CrudRepository<Fish, Integer> {

    Iterable<Fish> findByCommonNameContainsOrderByCommonNameAsc(String name);
    Iterable<Fish> findBySpeciesGroupInOrderByCommonNameAsc(List<String> speciesGroups);

    Fish findById(String id);
    // Custom query to fetch distinct species groups
    @Query("SELECT DISTINCT f.speciesGroup FROM Fish f ORDER BY f.speciesGroup ASC")
    Iterable<String> findAllDistinctSpeciesGroups();

}
