import React, { useRef, useEffect } from "react";
import { ANIMATION_POSITION_LENGTH, PIECE_HEIGHT, PIECE_WIDTH } from "./constants";
import './InteractiveImage.css';
import { loadImgCanvas } from "../utils/loadImgCanvas";

type Props = {
    imgSrc: string;
}

export const InteractiveImage = ({imgSrc}: Props) => {
  const pieceContainerRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      if (!pieceContainerRef.current || pendingRef.current === imgSrc) {
        return;
      }
      pendingRef.current = imgSrc;
      
      const bodyRect = document.body.getBoundingClientRect();
      const {ctx, canvasWidth, canvasHeight} = await loadImgCanvas(imgSrc, bodyRect);
      initPieceContainer(canvasWidth, canvasHeight);
      divideImageIntoPieces(canvasWidth, canvasHeight, ctx!, bodyRect);
    })();
  }, [imgSrc]);

  const initPieceContainer = (canvasWidth: number, canvasHeight: number) => {
    if (!pieceContainerRef.current) {
      return;
    }
    pieceContainerRef.current.innerHTML = '';
    pieceContainerRef.current.style.width = `${canvasWidth}px`;
    pieceContainerRef.current.style.height = `${canvasHeight}px`;
    pieceContainerRef.current.style.lineHeight = `${PIECE_HEIGHT}px`;
  };

  const divideImageIntoPieces = (canvasWidth: number, canvasHeight: number, imgCtx: CanvasRenderingContext2D, bodyRect: DOMRect) => {
    if (!pieceContainerRef.current) {
      return;
    }
    const pieceContainerRect = pieceContainerRef.current.getBoundingClientRect();
    for (let pieceY = 0; pieceY < canvasHeight; pieceY += PIECE_HEIGHT) {
      for (let pieceX = 0; pieceX < canvasWidth; pieceX += PIECE_WIDTH) {
        const pieceWidth = Math.min(PIECE_WIDTH, canvasWidth - pieceX);
        const pieceHeight = Math.min(PIECE_HEIGHT, canvasHeight - pieceY);
        const piece = makePieceCanvas(imgCtx, pieceX, pieceY, pieceWidth, pieceHeight, bodyRect, pieceContainerRect);
        if (piece) {
          pieceContainerRef.current.appendChild(piece);
        }
      }
    }
  };

  return <div className='piece-container' ref={pieceContainerRef}/>;
};

const makePieceCanvas = (imgCtx: CanvasRenderingContext2D, pieceX: number, pieceY: number, pieceWidth: number, pieceHeight: number, bodyRect: DOMRect, pieceContainerRect: DOMRect) => {
  const imageData = imgCtx.getImageData(pieceX, pieceY, pieceWidth, pieceHeight);
  if (!imageData) {
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.className = 'piece-canvas';
  canvas.width = pieceWidth;
  canvas.height = pieceHeight;

  const ctx = canvas.getContext('2d');
  ctx?.putImageData(imageData, 0, 0);

  const dist = Math.random() * (bodyRect.width - PIECE_WIDTH) - (pieceContainerRect.left + pieceX);
  for (let i = 0; i < ANIMATION_POSITION_LENGTH; i++) {
    const basePos = (dist / ANIMATION_POSITION_LENGTH) * (ANIMATION_POSITION_LENGTH - i);
    const deltaPos = PIECE_WIDTH - ((PIECE_WIDTH * i) / ANIMATION_POSITION_LENGTH);
    canvas.style.setProperty(`--pos-${i}`, `${basePos + Math.random() * (deltaPos * 2) - deltaPos}px`);
  }
  canvas.style.setProperty(`--pos-${ANIMATION_POSITION_LENGTH}`, '0px');

  return canvas;
};