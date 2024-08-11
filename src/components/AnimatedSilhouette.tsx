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

            const scale = canvas.height / 200;
            const headSize = 20 * scale;
            const shoulderWidth = measurements.wingspan ? measurements.wingspan * scale * 0.5 : 50 * scale;
            const torsoHeight = 60 * scale;
            const legHeight = (measurements.height - 60) * scale * 0.5;

            // Calculate body width based on weight (adjust these values as needed)
            const minWeight = 40;
            const maxWeight = 150;
            const minWidth = 20 * scale;
            const maxWidth = 40 * scale;
            const bodyWidth = minWidth + (maxWidth - minWidth) * ((measurements.weight - minWeight) / (maxWeight - minWeight));

            // Draw podium
            ctx.fillStyle = '#FFD700';
            ctx.fillRect(canvas.width * 0.2, canvas.height - 30 * scale, canvas.width * 0.6, 30 * scale);

            // Draw silhouette
            ctx.strokeStyle = '#0081C8';
            ctx.lineWidth = 3 * scale;
            ctx.lineCap = 'round';

            const centerX = canvas.width / 2;
            const bottomY = canvas.height - 30 * scale;

            // Draw head
            ctx.beginPath();
            ctx.arc(centerX, bottomY - legHeight - torsoHeight - headSize / 2, headSize / 2, 0, Math.PI * 2);
            ctx.stroke();

            // Draw body
            ctx.beginPath();
            ctx.moveTo(centerX - bodyWidth / 2, bottomY - legHeight - torsoHeight * 0.8);
            ctx.lineTo(centerX + bodyWidth / 2, bottomY - legHeight - torsoHeight * 0.8);
            ctx.lineTo(centerX + bodyWidth / 3, bottomY - legHeight);
            ctx.lineTo(centerX - bodyWidth / 3, bottomY - legHeight);
            ctx.closePath();
            ctx.stroke();

            // Draw arms (slightly raised)
            ctx.beginPath();
            ctx.moveTo(centerX - shoulderWidth / 2, bottomY - legHeight - torsoHeight * 0.75);
            ctx.quadraticCurveTo(
                centerX, bottomY - legHeight - torsoHeight - 15 * scale,
                centerX + shoulderWidth / 2, bottomY - legHeight - torsoHeight * 0.75
            );
            ctx.stroke();

            // Draw legs
            ctx.beginPath();
            ctx.moveTo(centerX - bodyWidth / 4, bottomY - legHeight);
            ctx.lineTo(centerX - bodyWidth / 4, bottomY);
            ctx.moveTo(centerX + bodyWidth / 4, bottomY - legHeight);
            ctx.lineTo(centerX + bodyWidth / 4, bottomY);
            ctx.stroke();
        };

        drawSilhouette();
    }, [measurements]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-64 h-96" // Increased size
        >
            <canvas
                ref={canvasRef}
                width={256}
                height={384}
                className="w-full h-full"
            />
        </motion.div>
    );
};

export default AnimatedSilhouette;