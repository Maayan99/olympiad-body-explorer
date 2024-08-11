// components/InputForm.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserMeasurements } from '../utils/types';

interface InputFormProps {
    onSubmit: (measurements: UserMeasurements) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
    const [height, setHeight] = useState(170);
    const [weight, setWeight] = useState(70);
    const [wingspan, setWingspan] = useState(170);
    const [knowWingspan, setKnowWingspan] = useState(true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ height, weight, wingspan: knowWingspan ? wingspan : undefined });
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold mb-6 text-center text-olympic-blue">Enter Your Measurements</h2>
            {[
                { label: 'Height', value: height, setValue: setHeight, min: 140, max: 220, unit: 'cm' },
                { label: 'Weight', value: weight, setValue: setWeight, min: 40, max: 150, unit: 'kg' },
            ].map((field) => (
                <div key={field.label} className="mb-6">
                    <label htmlFor={field.label.toLowerCase()} className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label} ({field.unit})
                    </label>
                    <input
                        type="range"
                        id={field.label.toLowerCase()}
                        min={field.min}
                        max={field.max}
                        value={field.value}
                        onChange={(e) => field.setValue(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>{field.min}</span>
                        <span className="font-medium">{field.value}</span>
                        <span>{field.max}</span>
                    </div>
                </div>
            ))}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <label htmlFor="wingspan" className="block text-sm font-medium text-gray-700 mb-2">
                        Wingspan (cm)
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={knowWingspan}
                            onChange={(e) => setKnowWingspan(e.target.checked)}
                            className="form-checkbox h-5 w-5 text-olympic-blue"
                        />
                        <span className="ml-2 text-sm text-gray-700">I know my wingspan</span>
                    </label>
                </div>
                <input
                    type="range"
                    id="wingspan"
                    min={140}
                    max={230}
                    value={wingspan}
                    onChange={(e) => setWingspan(Number(e.target.value))}
                    className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${
                        !knowWingspan ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={!knowWingspan}
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>140</span>
                    <span className="font-medium">{wingspan}</span>
                    <span>230</span>
                </div>
            </div>
            <motion.button
                type="submit"
                className="w-full bg-olympic-blue text-white py-2 px-4 rounded-md hover:bg-olympic-yellow hover:text-olympic-blue transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Analyze My Body Type
            </motion.button>
        </motion.form>
    );
};

export default InputForm;