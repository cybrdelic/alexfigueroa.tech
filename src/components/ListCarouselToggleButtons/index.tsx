import { css } from "styled-components";
import { useAlternateTheme } from "../../hooks/theming/useAlternateTheme";
import { rounded } from "../../theming/util-style-functions/misc";
import { padding } from "../../theming/util-style-functions/spacing";
import { createStyledMotionComponent } from "../../theming/styled-motion-utils/createStyledMotionComponent";
import { backgroundColor } from "../../theming/util-style-functions/colors";
import { colors } from "../../theming/design-tokens/colors";
import { FaRegWindowMaximize as GridIcon, FaRegClone as CarouselIcon } from 'react-icons/fa';


interface ListCarouselToggleButtonsProps {
    viewMode: "grid" | "carousel";
    setViewMode: (value: "grid" | "carousel") => any;
}

const ToggleButtonsContainer = createStyledMotionComponent('div')(props => {
    const dark = colors.dark.light;
    const light = colors.dark.dark;
    const isDarkMode = props.theme.mode == 'dark';
    const opacity = 0.5;
    return css`
        position: absolute;
        left: 0%;
        margin-left: 0.25rem;
        margin-right: 0.25rem;
        z-index: 100;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        ${backgroundColor(props.theme, 'background')}
        border-radius: 10px;  // Added a slight border-radius
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);  // Slight shadow for depth
    `;
});

const ToggleButton = createStyledMotionComponent('button')(props => {
    const isDarkMode = props.theme.mode === 'dark';
    const activeIconColor = isDarkMode ? colors.dark.light : colors.dark.dark;
    const inactiveIconColor = isDarkMode ? colors.light.light : colors.light.dark;

    const iconColor = props.isActive ? activeIconColor : inactiveIconColor;
    const borderColor = props.isActive ? activeIconColor : 'rgba(0,0,0,0)'

    const iconColorCSS = `color: ${iconColor};`
    const borderColorCSS = `border-color: ${borderColor};`

    return css`
        ${iconColorCSS}
        height: 40px;
        width: 40px;
        border: solid;
        ${rounded('lg')}
        ${padding('sm')}
        border-width: 0.1rem;
        ${borderColorCSS}
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease, background-color 0.3s ease;
        cursor: pointer;
        background-color: rgba(0,0,0,0);

        &:hover {
            transform: scale(1.5);
        }

        svg {
            font-size: 60px;
            transition: color 0.3s ease;
        }

        &:hover svg, &.active svg {
            color: ${props.theme.primary};
        }
    `
});

export default function ListCarouselToggleButtons(props: ListCarouselToggleButtonsProps) {
    const { viewMode, setViewMode } = props;
    return (
        <ToggleButtonsContainer theme={useAlternateTheme()}>
            <ToggleButton isActive={viewMode === 'grid'} theme={useAlternateTheme()} onClick={() => setViewMode("grid")}><GridIcon /></ToggleButton>
            <ToggleButton isActive={viewMode === 'carousel'} theme={useAlternateTheme()} onClick={() => setViewMode("carousel")}><CarouselIcon /></ToggleButton>
        </ToggleButtonsContainer>
    )
}
