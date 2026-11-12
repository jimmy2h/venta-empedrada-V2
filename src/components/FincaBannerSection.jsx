import { ArrowRight } from 'lucide-react';
import { FINCA_BANNER_CONTENT } from '../data/brandContent';

export function FincaBannerSection({ onOpenFinca }) {
  return (
    <section id="finca" className="finca-banner-section">
      <img
        src={FINCA_BANNER_CONTENT.image}
        alt=""
        aria-hidden="true"
        width="1536"
        height="1024"
        loading="lazy"
        className="finca-banner-bg"
      />
      <div className="finca-banner-scrim" aria-hidden="true" />
      <div className="container finca-banner-inner">
        <div className="finca-banner-content scroll-reveal">
          <span className="eyebrow eyebrow--light">{FINCA_BANNER_CONTENT.eyebrow}</span>
          <h2 className="finca-banner-heading">{FINCA_BANNER_CONTENT.headline}</h2>
          <p className="finca-banner-lead">{FINCA_BANNER_CONTENT.lead}</p>
          <p className="finca-banner-tagline">{FINCA_BANNER_CONTENT.tagline}</p>
          <button
            type="button"
            className="btn-outline-light finca-banner-cta"
            onClick={onOpenFinca}
          >
            <span>{FINCA_BANNER_CONTENT.ctaLabel}</span>
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

