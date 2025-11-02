import { useCallback, useMemo, useRef, useState } from 'react';
import HeaderBrand from './components/HeaderBrand';
import MemePreview from './components/MemePreview';
import ControlsPanel from './components/ControlsPanel';
import TemplateGridModal from './components/TemplateGridModal';
import { memeTemplates, drawMeme } from './components/memeTemplates';

function downloadCanvas(canvas, filename = 'noth-meme.png') {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, 'image/png');
}

export default function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [template, setTemplate] = useState(memeTemplates[0]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const canvasRef = useRef(null);

  const handleGenerate = useCallback(() => {
    const c = canvasRef.current?.current;
    if (!c) return;
    // ensure the latest render before download
    const ctx = c.getContext('2d');
    drawMeme(ctx, c.width, c.height, template, topText, bottomText);
    downloadCanvas(c);
  }, [template, topText, bottomText]);

  const darkGridBg = useMemo(() => (
    'bg-[radial-gradient(circle_at_1px_1px,_#111_1px,_transparent_0)] [background-size:24px_24px]'
  ), []);

  return (
    <div className={`min-h-screen w-full bg-black text-white ${darkGridBg}`}>
      <div className="max-w-6xl mx-auto px-6">
        <HeaderBrand />
        <main className="grid lg:grid-cols-2 gap-8 items-start pb-16">
          <section className="order-1 lg:order-none">
            <div className="mb-4">
              <h2 className="text-2xl font-extrabold tracking-tight">Live Preview</h2>
              <p className="text-white/60 text-sm tracking-wide">Sharp, monochrome, unapologetic.</p>
            </div>
            <MemePreview
              template={template}
              topText={topText}
              bottomText={bottomText}
              onCanvasRef={(ref) => { canvasRef.current = ref; }}
            />
          </section>
          <section className="order-2 lg:order-none">
            <div className="mb-4">
              <h2 className="text-2xl font-extrabold tracking-tight">Controls</h2>
              <p className="text-white/60 text-sm tracking-wide">Type, pick, mint the meme.</p>
            </div>
            <ControlsPanel
              topText={topText}
              bottomText={bottomText}
              setTopText={setTopText}
              setBottomText={setBottomText}
              onChooseTemplate={() => setPickerOpen(true)}
              onGenerate={handleGenerate}
            />
            <div className="mt-6 text-xs text-white/50 leading-relaxed">
              • Strictly black and white. • Your meme includes a subtle NOTH watermark in the corner.
            </div>
          </section>
        </main>
      </div>

      <TemplateGridModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(tpl) => setTemplate(tpl)}
      />
    </div>
  );
}
