import { calculateBioLoad } from '../../components/FindFish/bioloadcalc';  // Ensure this is correctly imported

export function checkCompatibility(cartItems, tankSize) {
    const results = {
        compatible: true,
        issues: {
            waterChanges: null,
            temperament: null,
            diet: null,
            idealNumber: null
        },
        finalMessage: null, // Add final message field
        success: true // Track if all conditions are met
    };

    let failedConditions = 0;

    // Calculate total bio load
    const totalBioLoad = cartItems.reduce((total, item) => {
        return total + calculateBioLoad(item, item.quantity, 1);  // Assuming no plant factor here
    }, 0);

    const stockPercentage = (totalBioLoad / tankSize) * 100;

    // Water Change Recommendation
    if (stockPercentage <= 40) {
        results.issues.waterChanges = "Moderate: We recommend weekly water changes of 25%";
    } else if (stockPercentage <= 70) {
        results.issues.waterChanges = "High: We recommend weekly water changes of at least 50%";
    } else {
        results.issues.waterChanges = "Not recommended";
        failedConditions++; // Increment failed conditions
    }

    // Loop through each pair of fish in the cart
    for (let i = 0; i < cartItems.length; i++) {
        for (let j = i + 1; j < cartItems.length; j++) {
            const fish1 = cartItems[i];
            const fish2 = cartItems[j];

            // Check aggressiveness compatibility (temperament)
            if (!checkAggressiveness(fish1, fish2) && !results.issues.temperament) {
                results.compatible = false;
                results.issues.temperament = `Temperament mismatch between ${fish1.commonName} and ${fish2.commonName}`;
                failedConditions++; // Increment failed conditions
            }

            // Check diet compatibility
            if (!checkDietCompatibility(fish1, fish2) && !results.issues.diet) {
                results.compatible = false;
                results.issues.diet = `Diet incompatibility between ${fish1.commonName} and ${fish2.commonName}`;
                failedConditions++; // Increment failed conditions
            }
        }

        // Check if ideal number of fish is met
        if (!checkIdealNumber(cartItems[i], cartItems[i].quantity) && !results.issues.idealNumber) {
            results.compatible = false;
            results.issues.idealNumber = `We recommend ${cartItems[i].idealNumber} ${cartItems[i].commonName} in this tank.`;
            failedConditions++; // Increment failed conditions
        }
    }

    // Final message based on number of failed conditions
    if (failedConditions > 0) {
        results.finalMessage = `${failedConditions} tank conditions have not been met.`;
        results.success = false; // Mark as failed
    } else {
        results.finalMessage = "Your tank is compatible!";
        results.success = true; // Mark as success
    }

    return results;
}



// Define the missing functions

function checkAggressiveness(fish1, fish2) {
    const aggressionLevels = ['Peaceful', 'Semi aggressive', 'Aggressive'];
    const fish1Aggression = aggressionLevels.indexOf(fish1.overallAggressiveness);
    const fish2Aggression = aggressionLevels.indexOf(fish2.overallAggressiveness);

    // If the difference in aggression levels is too large, they are incompatible
    return Math.abs(fish1Aggression - fish2Aggression) <= 1;
}

function checkDietCompatibility(fish1, fish2) {
    const incompatiblePairs = [
        ['Carnivore', 'Herbivore'],
        ['Herbivore', 'Carnivore'],
    ];

    const dietPair = [fish1.dietType, fish2.dietType];

    for (const pair of incompatiblePairs) {
        if (pair.includes(dietPair[0]) && pair.includes(dietPair[1])) {
            return false;
        }
    }

    return true;
}

function checkIdealNumber(fish, quantity) {
    const idealNumber = fish.idealNumber;
    // If the ideal number is "Any", return true
    if (idealNumber === "Any") {
        return true;
    }

    // Check if the ideal number exists and is a string
    if (idealNumber && typeof idealNumber === 'string') {
        // Check if the ideal number has a '+' symbol indicating a minimum number
        if (idealNumber.includes('+')) {
            const minIdeal = parseInt(idealNumber.split('+')[0]); // Extract the number before the '+'
            if (!isNaN(minIdeal)) {
                return quantity >= minIdeal; // Return true only if quantity is greater than or equal to minIdeal
            }
        }
        
        // If the ideal number is a specific integer, parse and compare
        const specificNumber = parseInt(idealNumber);
        if (!isNaN(specificNumber)) {
            return quantity === specificNumber;
        }
    }
    
    // If the ideal number is not defined or doesn't match the expected format, return true (no restriction)
    return true;
}


