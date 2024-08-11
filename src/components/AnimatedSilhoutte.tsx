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

            // Calculate proportions
            const headSize = canvas.height * 0.15;
            const shoulderWidth = canvas.width * 0.3;
            const torsoHeight = (measurements.height / 200) * canvas.height * 0.4;
            const legHeight = (measurements.height / 200) * canvas.height * 0.45;
            const armLength = measurements.wingspan
                ? ((measurements.wingspan / 2) / 200) * canvas.width * 0.8
                : shoulderWidth * 1.2;

            ctx.fillStyle = '#0081C8'; // Olympic blue
            ctx.strokeStyle = '#0081C8';
            ctx.lineWidth = 2;

            // Draw head
            ctx.beginPath();
            ctx.arc(canvas.width / 2, headSize / 2 + 10, headSize / 2, 0, Math.PI * 2);
            ctx.fill();

            // Draw body
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 - shoulderWidth / 2, headSize);
            ctx.lineTo(canvas.width / 2 + shoulderWidth / 2, headSize);
            ctx.lineTo(canvas.width / 2 + shoulderWidth / 4, headSize + torsoHeight);
            ctx.lineTo(canvas.width / 2 - shoulderWidth / 4, headSize + torsoHeight);
            ctx.closePath();
            ctx.fill();

            // Draw legs
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 - shoulderWidth / 4, headSize + torsoHeight);
            ctx.lineTo(canvas.width / 2 - shoulderWidth / 4, canvas.height);
            ctx.moveTo(canvas.width / 2 + shoulderWidth / 4, headSize + torsoHeight);
            ctx.lineTo(canvas.width / 2 + shoulderWidth / 4, canvas.height);
            ctx.stroke();

            // Draw arms
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 - armLength, headSize + torsoHeight * 0.2);
            ctx.lineTo(canvas.width / 2 + armLength, headSize + torsoHeight * 0.2);
            ctx.stroke();
        };

        drawSilhouette();
    }, [measurements]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto"
        >
            <canvas
                ref={canvasRef}
                width={300}
                height={500}
                className="w-full h-auto border border-gray-300 rounded-lg"
            />
        </motion.div>
    );
};

export default AnimatedSilhouette;