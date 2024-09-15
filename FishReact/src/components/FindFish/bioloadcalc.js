// bioLoadCalculator.js
const highSpecies = ["Goldfish", "Koi", "African cichlids", "American cichlids", "Arowana", "Bichir", "Monster", "Snakehead", "Synos"];
const lowSpecies = ["Invertebrates", "Barbs", "Cory", "Bettas", "Danios", "Loaches", "Rasboras", "Tetras"];

export const getSpeciesFactor = (fish) => {
    const spGroup = fish.speciesGroup
    if (highSpecies.includes(spGroup)) {
        return 1.5;
    } else if (lowSpecies.includes(spGroup)) {
        return 0.95;
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

const extractAdultSize = (sizeString) => {
    const match = sizeString.match(/[\d.]+/); // Match the first number (integer or decimal)
    return match ? parseFloat(match[0]) : null; // Convert it to a float and return
};

// Species, activity, diet, and size weights
const SPECIES_WEIGHT = 0.40;  // 40%
const ACTIVITY_WEIGHT = 0.20; // 20%
const DIET_WEIGHT = 0.15;    // 15%
const SIZE_WEIGHT = 0.25;    // 25%

// Weighted bio load calculation
export const calculateBioLoad = (fish, quantity, plantFactor) => {
    const weightedSpecies = getSpeciesFactor(fish) * SPECIES_WEIGHT;
    const weightedActivity = getActivityFactor(fish) * ACTIVITY_WEIGHT;
    const weightedDiet = getDietFactor(fish) * DIET_WEIGHT;
    const weightedSize = extractAdultSize(fish.maximumAdultSize) * SIZE_WEIGHT;


    // Total bio load based on weighted factors
    return (plantFactor * (weightedSpecies + weightedActivity + weightedDiet + weightedSize)) * quantity;
};
