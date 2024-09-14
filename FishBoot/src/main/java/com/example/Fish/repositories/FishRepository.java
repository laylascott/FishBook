package com.example.Fish.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.Fish.model.Fish;

@Repository
public interface FishRepository extends CrudRepository<Fish, Integer> {

    Iterable<Fish> findByCommonNameContainsOrderByCommonNameAsc(String name);
    Iterable<Fish> findBySpeciesGroupContainsOrderByCommonNameAsc(String species);
    Fish findById(String id);
}
