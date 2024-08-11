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
    const encodedTitle = encodeURIComponent(title);
    const message = `I'm ${compatibility.toFixed(2)}% compatible with ${sport} in the Olympics! Check your match: ${url}`;
    const encodedMessage = encodeURIComponent(message);

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodedMessage}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedMessage}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodedMessage}`,
    };

    return (
        <div className="flex space-x-4 my-4">
            <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-[#1DA1F2] hover:bg-[#1a91da] transition-colors"
            >
                <FaTwitter className="inline-block mr-2" /> Share on Twitter
            </a>
            <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-[#4267B2] hover:bg-[#365899] transition-colors"
            >
                <FaFacebook className="inline-block mr-2" /> Share on Facebook
            </a>
            <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-[#25D366] hover:bg-[#20bf5a] transition-colors"
            >
                <FaWhatsapp className="inline-block mr-2" /> Share on WhatsApp
            </a>
        </div>
    );
};

export default SocialShare;