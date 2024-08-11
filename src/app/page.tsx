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
            <main className="container mx-auto px-4 py-8">
                <motion.h1
                    className="text-4xl font-bold mb-8 text-center text-olympic-blue"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Olympic Body Type Explorer
                </motion.h1>
                <InputForm onSubmit={setMeasurements} />
                {measurements && <Results measurements={measurements} />}
            </main>
        </div>
    );
}