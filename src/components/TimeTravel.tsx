// components/TimeTravel.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserMeasurements, SportData } from '../utils/types';
import { calculateCompatibility } from '../utils/calculations';

interface TimeTravelProps {
    measurements: UserMeasurements;
}

interface HistoricalData {
    year: number;
    sports: SportData[];
}

const historicalData: HistoricalData[] = [
    {
        year: 1896,
        sports: [
            { name: 'Athletics', averageHeight: 170, averageWeight: 65, averageWingspan: 175 },
            { name: 'Gymnastics', averageHeight: 160, averageWeight: 55, averageWingspan: 165 },
            { name: 'Swimming', averageHeight: 175, averageWeight: 70, averageWingspan: 180 },
        ],
    },
    {
        year: 1936,
        sports: [
            { name: 'Athletics', averageHeight: 175, averageWeight: 70, averageWingspan: 180 },
            { name: 'Gymnastics', averageHeight: 162, averageWeight: 57, averageWingspan: 167 },
            { name: 'Swimming', averageHeight: 180, averageWeight: 75, averageWingspan: 185 },
        ],
    },
    {
        year: 1972,
        sports: [
            { name: 'Athletics', averageHeight: 180, averageWeight: 75, averageWingspan: 185 },
            { name: 'Gymnastics', averageHeight: 158, averageWeight: 50, averageWingspan: 163 },
            { name: 'Swimming', averageHeight: 185, averageWeight: 80, averageWingspan: 190 },
        ],
    },
    // Add more historical data as needed
];

const TimeTravel: React.FC<TimeTravelProps> = ({ measurements }) => {
    const [selectedYear, setSelectedYear] = useState<number>(historicalData[0].year);
    const [compatibleSports, setCompatibleSports] = useState<{ sport: SportData; compatibility: number }[]>([]);

    useEffect(() => {
        const selectedData = historicalData.find(data => data.year === selectedYear);
        if (selectedData) {
            const sortedSports = calculateCompatibility(measurements, selectedData.sports)
                .sort((a, b) => b.compatibility - a.compatibility);
            setCompatibleSports(sortedSports);
        }
    }, [selectedYear, measurements]);

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4 text-center text-olympic-blue">Time Travel</h3>
            <div className="flex justify-center mb-4">
                {historicalData.map(data => (
                    <motion.button
                        key={data.year}
                        onClick={() => setSelectedYear(data.year)}
                        className={`mx-2 px-4 py-2 rounded-full ${
                            selectedYear === data.year ? 'bg-olympic-blue text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {data.year}
                    </motion.button>
                ))}
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4">
                <h4 className="text-xl font-semibold mb-2">Your compatibility in {selectedYear}</h4>
                <ul>
                    {compatibleSports.map(({ sport, compatibility }) => (
                        <li key={sport.name} className="mb-2">
                            <span className="font-medium">{sport.name}</span>: {(compatibility * 100).toFixed(2)}% compatible
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TimeTravel;