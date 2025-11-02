export default function HeaderBrand() {
  return (
    <header className="w-full flex items-center justify-between py-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white/10 border border-white/20 grid place-content-center">
          <span className="text-white font-black tracking-widest text-xs">$</span>
        </div>
        <h1 className="text-white font-extrabold tracking-tight text-xl sm:text-2xl">
          $NOTH Meme Lab
        </h1>
      </div>
      <div className="text-sm text-white/60 uppercase tracking-widest">Minimal • Fast • Cynical</div>
    </header>
  );
}
