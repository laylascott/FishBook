// bioLoadCalculator.js
const highSpecies = ["goldfish", "koi", "African cichlids", "American cichlids", "Arowana", "Bichir", "monster", "snakehead", "synos"];
const lowSpecies = ["invertebrates", "barbs", "bettas", "corys", "danios", "loaches", "rasboras", "tetra"];

export const getSpeciesFactor = (fish) => {
    const speciesGroup = fish.speciesGroup.toLowerCase();
    if (highSpecies.includes(speciesGroup)) {
        return 1.5;
    } else if (lowSpecies.includes(speciesGroup)) {
        return 0.8;
    }
    return 1; // Default species factor
};

export const getActivityFactor = (fish) => {
    const swimmingLevel = fish.swimmingLevel?.toLowerCase();
    if (swimmingLevel === "top") {
        return 1.2;
    } else if (swimmingLevel === "bottom") {
        return 0.8;
    }
    return 1;
};

export const getDietFactor = (fish) => {
    const dietType = fish.dietType?.toLowerCase();
    if (dietType === "carnivore") {
        return 1.2;
    } else if (dietType === "omnivore") {
        return 0.8;
    }
    return 1;
};

export const calculateBioLoad = (fish, quantity, plantFactor) => {
    const speciesFactor = getSpeciesFactor(fish);
    const activityFactor = getActivityFactor(fish);
    const dietFactor = getDietFactor(fish);
    const adultSize = fish.adultSize || 1;
    return (plantFactor * speciesFactor * activityFactor * dietFactor * adultSize * quantity) / 10;
};
