import { useEffect, useRef } from 'react';
import { BRAND_IDENTITY } from '../data/brandContent';

const HERO_PARALLAX_DISTANCE = 480;

const HERO_PARALLAX_LAYERS = [
  { key: 'fondo', endPercent: 12 },
  { key: 'casa', endPercent: 3 },
  { key: 'productos', endPercent: -7 },
];

export function HeroBannerSection({ onOpenFinca }) {
  const heroRef = useRef(null);
  const stageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof CSS === 'undefined' ||
      CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)') ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined;
    }

    const heroEl = heroRef.current;
    const stageEl = stageRef.current;
    const contentEl = contentRef.current;
    if (!stageEl) return undefined;

    const layerNodes = HERO_PARALLAX_LAYERS.map((layer) => ({
      node: stageEl.querySelector(`.hero-layer-${layer.key}`),
      endPercent: layer.endPercent,
    })).filter((entry) => entry.node);

    let rafId = 0;

    const updateTransforms = () => {
      rafId = 0;
      const docScrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const heroOffset = heroEl ? Math.max(0, -heroEl.getBoundingClientRect().top) : 0;
      const scrollY = Math.max(0, docScrollY, heroOffset);
      const progress = Math.min(1, scrollY / HERO_PARALLAX_DISTANCE);
      for (const { node, endPercent } of layerNodes) {
        node.style.transform = `translate3d(0, ${(endPercent * progress).toFixed(3)}%, 0)`;
      }
      if (contentEl) {
        contentEl.style.transform = `translate3d(0, ${(-48 * progress).toFixed(2)}px, 0)`;
      }
    };

    const scheduleUpdate = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateTransforms);
      }
    };

    updateTransforms();
    window.addEventListener('scroll', scheduleUpdate, { passive: true, capture: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', scheduleUpdate, { capture: true });
      window.removeEventListener('resize', scheduleUpdate);
      for (const { node } of layerNodes) {
        node.style.transform = '';
      }
      if (contentEl) {
        contentEl.style.transform = '';
      }
    };
  }, []);

  return (
    <section id="inicio" ref={heroRef} className="hero-dark-band">
      <div ref={stageRef} className="hero-parallax-stage">
        <img
          src="./images/hero-capa-fondo.png"
          alt=""
          width="2400"
          height="1214"
          fetchPriority="high"
          aria-hidden="true"
          className="hero-parallax-layer hero-layer-fondo"
        />
        <img
          src="./images/hero-capa-casa.png"
          alt=""
          width="2400"
          height="1214"
          fetchPriority="high"
          aria-hidden="true"
          className="hero-parallax-layer hero-layer-casa"
        />
        <img
          src="./images/hero-capa-productos.png"
          alt="Botella de aceite de oliva virgen extra Picual, tarro de miel de romero y bolsa de almendra Marcona de Venta Empedrada sobre muro de piedra frente a la finca y bancales de olivos al amanecer."
          width="2400"
          height="1214"
          fetchPriority="high"
          className="hero-parallax-layer hero-layer-productos"
        />
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="container">
        <div ref={contentRef} className="hero-overlay-content">
          <div className="hero-title-group">
            <h1 id="contenido-principal" tabIndex={-1}>
              {BRAND_IDENTITY.heroHeadline}
            </h1>

            <p className="hero-subtagline">{BRAND_IDENTITY.heroSubheadline}</p>
          </div>

          <div className="hero-lead-group">
            <p className="hero-lead-light">{BRAND_IDENTITY.heroLead}</p>

            <div className="hero-actions-row">
              <a href="#recomendamos" className="btn-primary">
                Descubre la colección
              </a>
              <button type="button" className="btn-outline-light" onClick={onOpenFinca}>
                Conoce la finca
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

