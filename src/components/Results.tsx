// components/Results.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { UserMeasurements, SportData } from '../utils/types';
import { calculateCompatibility } from '../utils/calculations';
import SocialShare from './SocialShare';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ResultsProps {
    measurements: UserMeasurements;
}

export default function Results({ measurements }: ResultsProps) {
    const [compatibleSports, setCompatibleSports] = useState<{ sport: SportData; compatibility: number }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('/api/athleteData');
            const data: SportData[] = await res.json();
            const sortedSports = calculateCompatibility(measurements, data)
                .sort((a, b) => b.compatibility - a.compatibility)
                .slice(0, 5);
            setCompatibleSports(sortedSports);
            setLoading(false);
        }
        fetchData();
    }, [measurements]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    const scatterData = {
        datasets: [
            {
                label: 'Your Measurements',
                data: [{ x: measurements.height, y: measurements.weight }],
                backgroundColor: 'rgba(0, 129, 200, 1)', // Olympic blue
            },
            ...compatibleSports.map((sport, index) => ({
                label: sport.sport.name,
                data: [{ x: sport.sport.averageHeight, y: sport.sport.averageWeight }],
                backgroundColor: `rgba(${index * 50}, 129, 200, 0.7)`,
            })),
        ],
    };

    const scatterOptions = {
        scales: {
            x: {
                type: 'linear' as const,
                position: 'bottom' as const,
                title: {
                    display: true,
                    text: 'Height (cm)',
                },
            },
            y: {
                type: 'linear' as const,
                position: 'left' as const,
                title: {
                    display: true,
                    text: 'Weight (kg)',
                },
            },
        },
    };

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareTitle = `I'm ${(compatibleSports[0].compatibility * 100).toFixed(2)}% compatible with ${compatibleSports[0].sport.name} in the Olympics! Check your match:`;
    const shareImage = `/api/og?sport=${encodeURIComponent(compatibleSports[0].sport.name)}&compatibility=${(compatibleSports[0].compatibility * 100).toFixed(2)}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 bg-white rounded-lg shadow-lg p-6"
        >
            <h2 className="text-3xl font-bold mb-6 text-center text-olympic-blue">Your Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-2xl font-semibold mb-4 text-olympic-blue">Top 5 Compatible Sports</h3>
                    <ul>
                        {compatibleSports.map(({ sport, compatibility }, index) => (
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
                <div>
                    <h3 className="text-2xl font-semibold mb-4 text-olympic-blue">Height vs Weight Comparison</h3>
                    <Scatter data={scatterData} options={scatterOptions} />
                </div>
            </div>
            <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-4 text-center text-olympic-blue">Share Your Results</h3>
                <SocialShare url={shareUrl} title={shareTitle} image={shareImage} />
            </div>
        </motion.div>
    );
}