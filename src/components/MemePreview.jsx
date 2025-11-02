import { useEffect, useRef } from 'react';
import { drawMeme } from './memeTemplates';

export default function MemePreview({ template, topText, bottomText, onCanvasRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Fixed working resolution for crisp downloads
    const W = 1000;
    const H = 1000;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    drawMeme(ctx, W, H, template, topText, bottomText);
  }, [template, topText, bottomText]);

  useEffect(() => {
    if (onCanvasRef) onCanvasRef(canvasRef);
  }, [onCanvasRef]);

  return (
    <div className="w-full bg-white/0 border border-white/10 rounded-none">
      <div className="aspect-square w-full bg-black grid place-items-center p-3">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain bg-white"
          aria-label="Live meme preview"
        />
      </div>
    </div>
  );
}
