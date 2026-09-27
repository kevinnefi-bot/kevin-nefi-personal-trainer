import { usePresentation } from '../../engine/usePresentation';
import { SCENES, TOTAL_SCENES } from '../../engine/sceneConfig';

export function ChapterNav() {
  const { currentScene, goNext, goPrev, goTo, isTransitioning } = usePresentation();
  const scene = SCENES[currentScene];

  const chapterNumber = String(currentScene + 1).padStart(2, '0');
  const totalStr = String(TOTAL_SCENES).padStart(2, '0');
  const isFirst = currentScene === 0;
  const isLast = currentScene === TOTAL_SCENES - 1;

  const sceneName = scene?.label.replace(/^\d{2}\s/, '') ?? '';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-white/10 py-3 px-6 shadow-2xl">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto gap-4">
        {/* Chapter number + name */}
        <div className="flex flex-col min-w-[80px]">
          <span className="font-black text-xl leading-none text-[#00d2ff] tabular-nums font-mono">
            {chapterNumber}
            <span className="text-white/20 mx-1">/</span>
            {totalStr}
          </span>
          <span className="text-xs font-semibold text-white/50 mt-0.5 uppercase tracking-[0.2em] hidden sm:block">
            {sceneName}
          </span>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5 flex-1 justify-center">
          {SCENES.map((s) => (
            <button
              key={s.id}
              onClick={() => goTo(s.id)}
              disabled={isTransitioning}
              aria-label={`Ir a ${s.label}`}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff] rounded-full transition-all duration-300 disabled:cursor-not-allowed"
              style={{
                width: s.id === currentScene ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: s.id === currentScene ? '#00d2ff' : 'rgba(255,255,255,0.2)',
                boxShadow: s.id === currentScene ? '0 0 12px rgba(0,210,255,0.6)' : 'none',
                transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
              }}
            />
          ))}
        </div>

        {/* Prev / Next buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            disabled={isFirst || isTransitioning}
            aria-label="Escena anterior"
            className={[
              'w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff]',
              isFirst || isTransitioning
                ? 'border-white/10 text-white/20 cursor-not-allowed'
                : 'border-white/20 text-white hover:border-[#00d2ff] hover:bg-[#00d2ff]/15 hover:text-[#00d2ff]',
            ].join(' ')}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={goNext}
            disabled={isTransitioning}
            aria-label={isLast ? 'Reiniciar recorrido (Loop)' : 'Siguiente escena'}
            title={isLast ? 'Reiniciar recorrido 3D' : 'Siguiente'}
            className={[
              'w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff]',
              isTransitioning
                ? 'border-white/10 text-white/20 cursor-not-allowed'
                : isLast
                ? 'border-[#00d2ff]/60 text-[#00d2ff] bg-[#00d2ff]/10 hover:bg-[#00d2ff]/25'
                : 'border-white/20 text-white hover:border-[#00d2ff] hover:bg-[#00d2ff]/15 hover:text-[#00d2ff]',
            ].join(' ')}
          >
            {isLast ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
