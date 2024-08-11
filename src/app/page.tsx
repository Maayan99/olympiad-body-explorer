// app/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import InputForm from '../components/InputForm';
import Results from '../components/Results';
import { UserMeasurements } from '../utils/types';

export default function Home() {
    const [measurements, setMeasurements] = useState<UserMeasurements | null>(null);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <motion.header
                className="bg-olympic-blue text-white py-4 mb-8"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold text-center">Olympic Body Type Explorer</h1>
            </motion.header>
            <main className="container mx-auto px-4">
                <InputForm onSubmit={setMeasurements} />
                {measurements && <Results measurements={measurements} />}
            </main>
            <motion.footer
                className="bg-olympic-blue text-white py-4 mt-8 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                &copy; 2024 Olympic Body Explorer. All rights reserved.
            </motion.footer>
        </div>
    );
}