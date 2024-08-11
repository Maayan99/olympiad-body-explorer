// components/SocialShare.tsx
import React from 'react';
import { FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';

interface SocialShareProps {
    url: string;
    title: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title }) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
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
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-[#0077B5] hover:bg-[#006699] transition-colors"
            >
                <FaLinkedin className="inline-block mr-2" /> Share on LinkedIn
            </a>
        </div>
    );
};

export default SocialShare;