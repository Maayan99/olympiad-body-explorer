// components/SocialShare.tsx
import React from 'react';
import { FaTwitter, FaFacebook, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

interface SocialShareProps {
    url: string;
    title: string;
    image: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title, image }) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedImage = encodeURIComponent(image);

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedTitle}&source=${encodedUrl}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    };

    return (
        <div className="flex flex-wrap justify-center gap-4 my-4">
            {Object.entries(shareLinks).map(([platform, link]) => (
                <a
                    key={platform}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn text-white transition-transform hover:scale-105"
                    style={{ backgroundColor: getColor(platform) }}
                >
                    {getIcon(platform)}
                    <span className="ml-2">Share on {capitalize(platform)}</span>
                </a>
            ))}
        </div>
    );
};

function getColor(platform: string): string {
    const colors: { [key: string]: string } = {
        twitter: '#1DA1F2',
        facebook: '#4267B2',
        linkedin: '#0077B5',
        whatsapp: '#25D366',
    };
    return colors[platform] || '#000000';
}

function getIcon(platform: string) {
    switch (platform) {
        case 'twitter': return <FaTwitter />;
        case 'facebook': return <FaFacebook />;
        case 'linkedin': return <FaLinkedin />;
        case 'whatsapp': return <FaWhatsapp />;
        default: return null;
    }
}

function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export default SocialShare;