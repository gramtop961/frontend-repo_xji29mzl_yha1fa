import { useCallback } from 'react';

export default function ControlsPanel({ topText, bottomText, setTopText, setBottomText, onChooseTemplate, onGenerate }) {
  const handleDownload = useCallback(() => {
    onGenerate();
  }, [onGenerate]);

  return (
    <section className="w-full grid gap-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="grid gap-2">
          <label className="text-xs tracking-widest uppercase text-white/60">Top text</label>
          <input
            type="text"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
            placeholder="ENTER HEADLINE"
            className="w-full bg-black text-white placeholder-white/30 border border-white/15 focus:border-white/40 outline-none px-4 py-3 tracking-wide"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-xs tracking-widest uppercase text-white/60">Bottom text</label>
          <input
            type="text"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
            placeholder="ENTER PUNCHLINE"
            className="w-full bg-black text-white placeholder-white/30 border border-white/15 focus:border-white/40 outline-none px-4 py-3 tracking-wide"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onChooseTemplate}
          className="flex-1 bg-white text-black border border-white px-4 py-3 font-semibold tracking-wide uppercase hover:bg-black hover:text-white transition-colors"
        >
          Choose Template
        </button>
        <button
          onClick={handleDownload}
          className="flex-[2] bg-white/0 text-white border border-white px-4 py-3 font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
        >
          Generate & Download
        </button>
      </div>
    </section>
  );
}
