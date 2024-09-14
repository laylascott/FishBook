package com.example.Fish.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
@Table(name = "freshwater_fish")
public class Fish {

    @Id
    private String Id;

    @Column(name = "\"Common Name\"")
    private String commonName;

    @Column(name = "\"Scientific Name\"")
    private String scientificName;

    @Column(name = "\"Alternate Names\"")
    private String alternateNames;

    @Column(name = "\"Species Group\"")
    private String speciesGroup;

    @Column(name = "\"Care Level\"")
    private String careLevel;

    @Column(name = "\"Average Adult Size\"")
    private String averageAdultSize;

    @Column(name = "\"Maximum Adult Size\"")
    private String maximumAdultSize;

    @Column(name = "\"Lifespan\"")
    private String lifespan;

    @Column(name = "\"pH\"")
    private String pH;

    @Column(name = "\"Temperature\"")
    private String temperature;

    @Column(name = "\"Average Temp In F\"")
    private int averageTemp;

    @Column(name = "\"Hardness (GH)\"")
    private String hardnessGH;

    @Column(name = "\"Swimming Level\"")
    private String swimmingLevel;

    @Column(name = "\"Overall Aggressiveness\"")
    private String overallAggressiveness;

    @Column(name = "\"Aggressiveness Own Species\"")
    private String aggressivenessOwnSpecies;

    @Column(name = "\"Aggressiveness Other Species\"")
    private String aggressivenessOtherSpecies;

    @Column(name = "\"Ideal Number\"")
    private String idealNumber;

    @Column(name = "\"M:F Ratio\"")
    private String mfRatio;

    @Column(name = "\"Live Plants\"")
    private String livePlants;

    @Column(name = "\"Diet Type\"")
    private String dietType;

    @Column(name = "\"Food Preferences\"")
    private String foodPreferences;

    @Column(name = "\"Substrate\"")
    private String substrate;

    @Column(name = "\"Light\"")
    private String light;

    @Column(name = "\"Water Current\"")
    private String waterCurrent;

    @Column(name = "\"Decorations\"")
    private String decorations;

    @Column(name = "\"Minimum Tank Size\"")
    private String minimumTankSize;

    @Column(name = "\"Min Tank Size\"")
    private int minTankSize;

    @Column(name = "\"Image\"")
    private String image;
}
