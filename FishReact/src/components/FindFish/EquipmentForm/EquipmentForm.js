import React, { useState, useEffect } from "react";
import './EquipmentForm.css';
import InfoButton from "./InfoButton";

function TankDetailsForm({ onMandatoryFieldsFilled, onTankSizeChange }) {
    const tankData = {
        'Select Tank Size': { gallons: 0, length: 0, width: 0, height: 0 },
        '5.5 g': { gallons: 5.5, length: 17, width: 9, height: 11 },
        '10 g': { gallons: 10, length: 20, width: 11, height: 13 },
        '20 g': { gallons: 20, length: 24, width: 13, height: 16 },
        '20 g long': { gallons: 20, length: 30, width: 12, height: 12 },
        '29 g': { gallons: 29, length: 30, width: 12, height: 18 },
        '40 g': { gallons: 40, length: 36, width: 18, height: 17 },
        '55 g': { gallons: 55, length: 48, width: 13, height: 21 },
        '75 g': { gallons: 75, length: 48, width: 18, height: 21 },
        '90 g': { gallons: 90, length: 49, width: 19, height: 26 },
        '120 g': { gallons: 120, length: 49, width: 25, height: 26 },
        '125 g': { gallons: 125, length: 73, width: 19, height: 24 },
        '150 g': { gallons: 150, length: 73, width: 19, height: 29 },
        '180 g': { gallons: 180, length: 73, width: 25, height: 26 },
    };

    const [tankSize, setTankSize] = useState('Select Tank Size');
    const [dimensions, setDimensions] = useState(tankData[tankSize]);
    const [gphValue, setGphValue] = useState(0); // Calculated GPH value based on gallons
    const [heater, setHeater] = useState(null);
    const [plants, setPlants] = useState(null);
    const [pump, setPump] = useState(null);

    // Handle tank size selection
    const handleTankChange = (e) => {
        const selectedTank = e.target.value;
        setTankSize(selectedTank);
        setDimensions(tankData[selectedTank]);

        // Calculate the GPH value and update it (gallons * 4)
        const calculatedGph = Math.round(tankData[selectedTank].gallons * 4);
        setGphValue(calculatedGph);

        // Pass the selected tank size (in gallons) to the parent component
        onTankSizeChange(Math.round(tankData[selectedTank].gallons));
    };

    // Check if the mandatory fields (tank size) are filled
    useEffect(() => {
        const mandatoryFieldsFilled = tankSize !== 'Select Tank Size';
        onMandatoryFieldsFilled(mandatoryFieldsFilled);
    }, [tankSize, onMandatoryFieldsFilled]);

    const handleRadioChange = (currentValue, setter, value) => {
        if (currentValue === value) {
            setter(null);
        } else {
            setter(value);
        }
    };

    return (
        <div className="container">
            <h2>Tank Details</h2>
            <label>Dimensions:</label>
            <div className="formGroup">
                <select
                    value={tankSize}
                    onChange={handleTankChange}
                    className="select enabled"
                >
                    {Object.keys(tankData).map((size, index) => (
                        <option key={index} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
                <div>
                    <div>
                        <label className="disabled">L:</label>
                        <input
                            type="number"
                            value={dimensions.length}
                            className="dimensionInput disabled"
                            disabled
                        />
                        <p className="inches">"</p>
                    </div>
                    <div>
                        <label className="disabled">W:</label>
                        <input
                            type="number"
                            value={dimensions.width}
                            className="dimensionInput disabled"
                            disabled
                        />
                        <p className="inches">"</p>
                    </div>
                    <div>
                        <label className="disabled">H:</label>
                        <input
                            type="number"
                            value={dimensions.height}
                            className="dimensionInput disabled"
                            disabled
                        />
                        <p className="inches">"</p>
                    </div>
                </div>
            </div>

            {/* GPH display, non-editable */}
            <label>Filtration:</label>
            <div className="formGroup">
                <div>
                    <label className="enabled label">GPH:</label>
                    {/* Non-editable GPH value (gallons * 4) */}
                    <input 
                        type="text"
                        value={gphValue}
                        className="dimensionInput enabled"
                        readOnly
                    />
                </div>
                <InfoButton />
            </div>
            
            <hr />
            <p className="italic small">Optional Details</p>
            <table className="radioTable">
                <thead>
                    <tr>
                        <th>Will these items be in your tank?</th>
                        <th>Yes</th>
                        <th>No</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Heater</td>
                        <td>
                            <input
                                type="radio"
                                id="heaterYes"
                                name="heater"
                                value="true"
                                checked={heater === true}
                                onChange={() => handleRadioChange(heater, setHeater, true)}
                            />
                        </td>
                        <td>
                            <input
                                type="radio"
                                id="heaterNo"
                                name="heater"
                                value="false"
                                checked={heater === false}
                                onChange={() => handleRadioChange(heater, setHeater, false)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Live Plants</td>
                        <td>
                            <input
                                type="radio"
                                id="plantsYes"
                                name="plants"
                                value="true"
                                checked={plants === true}
                                onChange={() => handleRadioChange(plants, setPlants, true)}
                            />
                        </td>
                        <td>
                            <input
                                type="radio"
                                id="plantsNo"
                                name="plants"
                                value="false"
                                checked={plants === false}
                                onChange={() => handleRadioChange(plants, setPlants, false)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Circulation Pump</td>
                        <td>
                            <input
                                type="radio"
                                id="pumpYes"
                                name="pump"
                                value="true"
                                checked={pump === true}
                                onChange={() => handleRadioChange(pump, setPump, true)}
                            />
                        </td>
                        <td>
                            <input
                                type="radio"
                                id="pumpNo"
                                name="pump"
                                value="false"
                                checked={pump === false}
                                onChange={() => handleRadioChange(pump, setPump, false)}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default TankDetailsForm;
