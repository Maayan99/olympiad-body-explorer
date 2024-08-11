// components/AnimatedSilhouette.tsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { UserMeasurements } from '../utils/types';

interface AnimatedSilhouetteProps {
    measurements: UserMeasurements;
}

const AnimatedSilhouette: React.FC<AnimatedSilhouetteProps> = ({ measurements }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const drawSilhouette = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const scale = canvas.height / 200; // Assume 200cm is full height
            const headSize = 20 * scale;
            const shoulderWidth = measurements.wingspan ? measurements.wingspan * scale : 50 * scale;
            const torsoHeight = 60 * scale;
            const legHeight = (measurements.height - 60) * scale;

            ctx.strokeStyle = '#0081C8'; // Olympic blue
            ctx.lineWidth = 2 * scale;
            ctx.lineCap = 'round';

            // Draw head
            ctx.beginPath();
            ctx.arc(canvas.width / 2, headSize / 2 + 5 * scale, headSize / 2, 0, Math.PI * 2);
            ctx.stroke();

            // Draw body
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, headSize);
            ctx.lineTo(canvas.width / 2, headSize + torsoHeight);
            ctx.stroke();

            // Draw arms
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 - shoulderWidth / 2, headSize + 15 * scale);
            ctx.lineTo(canvas.width / 2 + shoulderWidth / 2, headSize + 15 * scale);
            ctx.stroke();

            // Draw legs
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, headSize + torsoHeight);
            ctx.lineTo(canvas.width / 2 - 15 * scale, canvas.height);
            ctx.moveTo(canvas.width / 2, headSize + torsoHeight);
            ctx.lineTo(canvas.width / 2 + 15 * scale, canvas.height);
            ctx.stroke();
        };

        drawSilhouette();
    }, [measurements]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
        >
            <canvas
                ref={canvasRef}
                width={200}
                height={400}
                className="w-full h-full border border-gray-300 rounded-lg"
            />
        </motion.div>
    );
};

export default AnimatedSilhouette;