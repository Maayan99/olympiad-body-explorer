// components/InputForm.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserMeasurements } from '../utils/types';

interface InputFormProps {
    onSubmit: (measurements: UserMeasurements) => void;
}

export default function InputForm({ onSubmit }: InputFormProps) {
    const [height, setHeight] = useState(170);
    const [weight, setWeight] = useState(70);
    const [wingspan, setWingspan] = useState(170);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ height, weight, wingspan });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
                <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                    Height (cm)
                </label>
                <motion.input
                    type="range"
                    id="height"
                    min="140"
                    max="220"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    whileTap={{ scale: 1.1 }}
                />
                <span className="text-sm text-gray-500">{height} cm</span>
            </div>

            <div className="mb-4">
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                    Weight (kg)
                </label>
                <motion.input
                    type="range"
                    id="weight"
                    min="40"
                    max="150"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    whileTap={{ scale: 1.1 }}
                />
                <span className="text-sm text-gray-500">{weight} kg</span>
            </div>

            <div className="mb-4">
                <label htmlFor="wingspan" className="block text-sm font-medium text-gray-700">
                    Wingspan (cm)
                </label>
                <motion.input
                    type="range"
                    id="wingspan"
                    min="140"
                    max="230"
                    value={wingspan}
                    onChange={(e) => setWingspan(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    whileTap={{ scale: 1.1 }}
                />
                <span className="text-sm text-gray-500">{wingspan} cm</span>
            </div>

            <motion.button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Analyze My Body Type
            </motion.button>
        </form>
    );
}