import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa';
import { createStyledMotionComponent } from '../../theming/styled-motion-utils/createStyledMotionComponent';

const IconWrapper = createStyledMotionComponent('div')(props => `
    display: flex;
    gap: 15px; // Space between icons
`);

const SingleIcon = createStyledMotionComponent('a')(props => `
    color: ${props.color || '#000'}; // Default to black if no color is specified
    font-size: 1.5rem; // Size of the icon
    transition: color 0.3s;

    &:hover {
        color: ${props.hoverColor || '#888'}; // Default hover color to gray if not specified
    }
`);

function SocialMediaIcons(props) {
    return (
        <IconWrapper>
            <SingleIcon href="https://facebook.com" target="_blank" color="#1877F2" hoverColor="#155BB5">
                <FaGithub />
            </SingleIcon>
            <SingleIcon href="https://twitter.com" target="_blank" color="#1DA1F2" hoverColor="#0D8ED5">
                <FaTwitter />
            </SingleIcon>
            <SingleIcon href="https://instagram.com" target="_blank" color="#E1306C" hoverColor="#AD2353">
                <FaMedium />
            </SingleIcon>
        </IconWrapper>
    );
}

export default SocialMediaIcons;
