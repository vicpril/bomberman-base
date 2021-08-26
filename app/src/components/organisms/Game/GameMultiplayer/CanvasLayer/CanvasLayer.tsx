import './CanvasLayer.css';
import React, { useImperativeHandle, useRef } from 'react';

export type CanvasHandle = {
  context: CanvasRenderingContext2D | null
}

export const CanvasLayer = React.memo(React.forwardRef<CanvasHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement| null>(null);

  useImperativeHandle(ref, () => ({
    context: canvasRef.current?.getContext('2d') ?? null,
  }));

  return (
    <canvas
      ref={canvasRef}
      className="canvas-layer-container"
      width="960"
      height="704"
      id="game"
    />
  );
}));
