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

            const scale = canvas.height / 250; // Adjust scale to make silhouette smaller
            const headSize = 15 * scale;
            const shoulderWidth = measurements.wingspan ? measurements.wingspan * scale * 0.4 : 40 * scale;
            const torsoHeight = 45 * scale;
            const legHeight = (measurements.height - 60) * scale * 0.4;

            // Draw podium
            ctx.fillStyle = '#FFD700'; // Gold color
            ctx.fillRect(canvas.width * 0.3, canvas.height - 40 * scale, canvas.width * 0.4, 40 * scale);

            // Draw silhouette
            ctx.strokeStyle = '#0081C8'; // Olympic blue
            ctx.lineWidth = 2 * scale;
            ctx.lineCap = 'round';

            const centerX = canvas.width / 2;
            const bottomY = canvas.height - 40 * scale; // Adjust for podium height

            // Draw head
            ctx.beginPath();
            ctx.arc(centerX, bottomY - legHeight - torsoHeight - headSize / 2, headSize / 2, 0, Math.PI * 2);
            ctx.stroke();

            // Draw body
            ctx.beginPath();
            ctx.moveTo(centerX, bottomY - legHeight - torsoHeight);
            ctx.lineTo(centerX, bottomY - legHeight);
            ctx.stroke();

            // Draw arms (slightly raised)
            ctx.beginPath();
            ctx.moveTo(centerX - shoulderWidth / 2, bottomY - legHeight - torsoHeight * 0.8);
            ctx.quadraticCurveTo(
                centerX, bottomY - legHeight - torsoHeight - 10 * scale,
                centerX + shoulderWidth / 2, bottomY - legHeight - torsoHeight * 0.8
            );
            ctx.stroke();

            // Draw legs
            ctx.beginPath();
            ctx.moveTo(centerX, bottomY - legHeight);
            ctx.lineTo(centerX - 10 * scale, bottomY);
            ctx.moveTo(centerX, bottomY - legHeight);
            ctx.lineTo(centerX + 10 * scale, bottomY);
            ctx.stroke();
        };

        drawSilhouette();
    }, [measurements]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-32 h-48" // Adjust size as needed
        >
            <canvas
                ref={canvasRef}
                width={128}
                height={192}
                className="w-full h-full"
            />
        </motion.div>
    );
};

export default AnimatedSilhouette;