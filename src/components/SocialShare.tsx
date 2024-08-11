// components/SocialShare.tsx
import React from 'react';
import { FaTwitter, FaFacebook, FaWhatsapp } from 'react-icons/fa';

interface SocialShareProps {
    url: string;
    title: string;
    sport: string;
    compatibility: number;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title, sport, compatibility }) => {
    const encodedUrl = encodeURIComponent(url);
    const message = `I'm ${compatibility.toFixed(2)}% compatible with ${sport} in the Olympics! Check your match: ${url}`;
    const encodedMessage = encodeURIComponent(message);

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodedMessage}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedMessage}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodedMessage}`,
    };

    return (
        <>
            {Object.entries(shareLinks).map(([platform, link]) => (
                <a
                    key={platform}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full sm:w-auto px-4 py-2 rounded-full text-white transition-colors"
                    style={{ backgroundColor: getColor(platform) }}
                >
                    {getIcon(platform)}
                    <span className="ml-2">Share on {capitalize(platform)}</span>
                </a>
            ))}
        </>
    );
};

function getColor(platform: string): string {
    const colors: { [key: string]: string } = {
        twitter: '#1DA1F2',
        facebook: '#4267B2',
        whatsapp: '#25D366',
    };
    return colors[platform] || '#000000';
}

function getIcon(platform: string) {
    switch (platform) {
        case 'twitter': return <FaTwitter />;
        case 'facebook': return <FaFacebook />;
        case 'whatsapp': return <FaWhatsapp />;
        default: return null;
    }
}

function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export default SocialShare;