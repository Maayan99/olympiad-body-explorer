// components/Results.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { UserMeasurements, SportData } from '../utils/types';
import { calculateCompatibility } from '../utils/calculations';
import SocialShare from './SocialShare';
import AnimatedSilhouette from './AnimatedSilhouette';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ResultsProps {
    measurements: UserMeasurements;
}

interface HistoricalData {
    year: number;
    sports: SportData[];
}
const historicalData: HistoricalData[] = [
    {
        year: 2024,
        sports: [] // This will be filled with current data
    },
    {
        year: 1952,
        sports: [
            { name: 'Athletics', averageHeight: 178, averageWeight: 72, averageWingspan: 182 },
            { name: 'Gymnastics', averageHeight: 165, averageWeight: 58, averageWingspan: 170 },
            { name: 'Swimming', averageHeight: 182, averageWeight: 76, averageWingspan: 188 },
        ],
    },
    {
        year: 1984,
        sports: [
            { name: 'Athletics', averageHeight: 180, averageWeight: 74, averageWingspan: 185 },
            { name: 'Gymnastics', averageHeight: 160, averageWeight: 52, averageWingspan: 165 },
            { name: 'Swimming', areHeight: 185, averageWeight: 78, averageWingspan: 192 },
        ],
    },
    // ... you can add more historical data as needed
];

export default function Results({ measurements }: ResultsProps) {
    const [compatibleSports, setCompatibleSports] = useState<{ sport: SportData; compatibility: number }[]>([]);
    const [allSports, setAllSports] = useState<SportData[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState<number>(2024);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('/api/athleteData');
            const data: SportData[] = await res.json();
            setAllSports(data);
            historicalData[0].sports = data; // Set current year data
            updateCompatibleSports(data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const yearData = historicalData.find(d => d.year === selectedYear);
        if (yearData) {
            updateCompatibleSports(yearData.sports);
        }
    }, [selectedYear, measurements]);

    const updateCompatibleSports = (sports: SportData[]) => {
        const sortedSports = calculateCompatibility(measurements, sports)
            .sort((a, b) => b.compatibility - a.compatibility);
        setCompatibleSports(sortedSports);
        setLoading(false);
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    const scatterData = {
        datasets: [
            {
                label: 'Your Measurements',
                data: [{ x: measurements.height, y: measurements.weight }],
                backgroundColor: 'rgba(255, 0, 0, 1)', // Red for user
                pointRadius: 8,
            },
            ...compatibleSports.map((sport, index) => ({
                label: sport.sport.name,
                data: [{ x: sport.sport.averageHeight, y: sport.sport.averageWeight }],
                backgroundColor: index < 5 ? 'rgba(0, 129, 200, 1)' : 'rgba(200, 200, 200, 0.5)',
                pointRadius: index < 5 ? 6 : 4,
            })),
        ],
    };

    const scatterOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'linear' as const,
                position: 'bottom' as const,
                title: { display: true, text: 'Height (cm)' },
                min: 150,
                max: 210
            },
            y: {
                type: 'linear' as const,
                position: 'left' as const,
                title: { display: true, text: 'Weight (kg)' },
                min: 40,
                max: 120
            },
        },
    };

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareTitle = `Check out my Olympic body type match for ${selectedYear}!`;

    const topSport2024 = compatibleSports.find(sport => sport.year === 2024)?.sports[0];

    return (
        <motion.div
            key={selectedYear}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 bg-white rounded-lg shadow-lg p-6"
        >
            <h2 className="text-3xl font-bold mb-6 text-center text-olympic-blue">Your Results for {selectedYear} Olympics</h2>
            <div className="flex justify-center mb-6">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-2xl font-semibold mb-4 text-olympic-blue">Top 5 Compatible Sports</h3>
                    <ul>
                        {compatibleSports.slice(0, 5).map(({ sport, compatibility }, index) => (
                            <motion.li
                                key={sport.name}
                                className="mb-4 p-4 bg-gray-50 rounded-md shadow-sm"
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <span className="font-medium text-lg">{sport.name}</span>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                    <motion.div
                                        className="bg-olympic-blue h-2.5 rounded-full"
                                        style={{ width: `${compatibility * 100}%` }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${compatibility * 100}%` }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    ></motion.div>
                                </div>
                                <span className="text-sm text-gray-600">{(compatibility * 100).toFixed(2)}% compatible</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>
                <div className="mt-8">
                    <h3 className="text-xl md:text-2xl font-semibold mb-4 text-olympic-blue">Height vs Weight
                        Comparison</h3>
                    <div className="w-full h-64 md:h-96">
                        <Scatter data={scatterData} options={scatterOptions}/>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-xl md:text-2xl font-semibold mb-4 text-center text-olympic-blue">Share Your
                        Results</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        <SocialShare
                            url={shareUrl}
                            title={shareTitle}
                            sport={topSport2024?.name || 'Unknown'}
                            compatibility={topSport2024?.compatibility || 0}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}