import { memeTemplates, drawMeme } from './memeTemplates';
import { useEffect, useRef } from 'react';

function TemplateThumb({ template, onSelect }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const W = 240;
    const H = 240;
    c.width = W; c.height = H;
    const ctx = c.getContext('2d');
    // draw without text
    drawMeme(ctx, W, H, template, '', '');
  }, [template]);

  return (
    <button
      onClick={() => onSelect(template)}
      className="group border border-white/15 hover:border-white/50 transition-colors bg-black"
    >
      <div className="aspect-square w-full bg-black">
        <canvas ref={canvasRef} className="w-full h-full" aria-label={template.name} />
      </div>
      <div className="p-3 text-left">
        <div className="text-sm text-white/90 font-semibold tracking-wide">{template.name}</div>
      </div>
    </button>
  );
}

export default function TemplateGridModal({ open, onClose, onSelect }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="absolute inset-0 p-6 overflow-auto">
        <div className="max-w-5xl mx-auto bg-black border border-white/15">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <h2 className="text-white text-lg font-bold tracking-wide uppercase">Choose Template</h2>
            <button onClick={onClose} className="text-white/60 hover:text-white uppercase tracking-widest text-xs">Close</button>
          </div>
          <div className="p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {memeTemplates.map(t => (
              <TemplateThumb key={t.id} template={t} onSelect={(tpl) => { onSelect(tpl); onClose(); }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
