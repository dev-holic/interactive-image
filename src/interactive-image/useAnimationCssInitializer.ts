import { useEffect } from "react";
import { ANIMATION_POSITION_LENGTH } from "./constants";

export const useAnimationCssInitializer = () => {
  useEffect(() => {
    const styleSheet = document.createElement('style');
    document.head.appendChild(styleSheet);
    let keyframes = '@keyframes moveCanvas {';
    for (let i = 0; i <= ANIMATION_POSITION_LENGTH; i++) {
        keyframes += `
            ${(100 / ANIMATION_POSITION_LENGTH) * i}% {
                transform: translateX(var(--pos-${i}, 0px));
            }
        `;
    }
    keyframes += '}';
    styleSheet.sheet?.insertRule(keyframes, 0);
  }, []);
};