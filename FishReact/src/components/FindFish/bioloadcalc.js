// bioLoadCalculator.js
const highSpecies = ["Goldfish", "Koi", "African cichlids", "American cichlids", "Arowana", "Bichir", "Monster", "Snakehead", "Synos"];
const lowSpecies = ["Invertebrates", "Barbs", "Bettas", "Cory", "Danios", "Loaches", "Rasboras", "Tetras"];

export const getSpeciesFactor = (fish) => {
    const spGroup = fish.speciesGroup
    if (highSpecies.includes(spGroup)) {
        return 1.5;
    } else if (lowSpecies.includes(spGroup)) {
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
    const dietType = fish.dietType
    if (dietType === "Carnivore") {
        return 1.2;
    } else if (dietType === "Omnivore") {
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
