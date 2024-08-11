// components/Results.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Scatter } from 'react-chartjs-2';
import { UserMeasurements, SportData } from '../utils/types';
import { calculateCompatibility } from '../utils/calculations';

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
        return <div>Loading...</div>;
    }

    const scatterData = {
        datasets: [
            {
                label: 'Your Measurements',
                data: [{ x: measurements.height, y: measurements.weight }],
                backgroundColor: 'rgba(255, 99, 132, 1)',
            },
            ...compatibleSports.map((sport) => ({
                label: sport.sport.name,
                data: [{ x: sport.sport.averageHeight, y: sport.sport.averageWeight }],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            })),
        ],
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
        >
            <h2 className="text-2xl font-bold mb-4">Your Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-semibold mb-2">Top 5 Compatible Sports</h3>
                    <ul>
                        {compatibleSports.map(({ sport, compatibility }) => (
                            <motion.li
                                key={sport.name}
                                className="mb-2 p-2 bg-white rounded-md shadow-sm"
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="font-medium">{sport.name}</span>:{' '}
                                {(compatibility * 100).toFixed(2)}% compatible
                            </motion.li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">Height vs Weight Comparison</h3>
                    <Scatter
                        data={scatterData}
                        options={{
                            scales: {
                                x: { title: { display: true, text: 'Height (cm)' } },
                                y: { title: { display: true, text: 'Weight (kg)' } },
                            },
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
}