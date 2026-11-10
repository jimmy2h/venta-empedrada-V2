import { ShieldCheck, Sprout, Truck } from 'lucide-react';
import { BRAND_IDENTITY } from '../data/brandContent';

export function HeroBannerSection() {
  return (
    <section id="inicio" className="hero-dark-band">
      <img
        src="./images/finca-amanecer.png"
        alt="Camino empedrado y bancales de olivos, almendros y romeral de Finca La Venta Empedrada en Almería al amanecer."
        width="1536"
        height="1024"
        fetchPriority="high"
        className="hero-bg-img"
      />
      <div className="hero-scrim" aria-hidden="true" />

      <div className="container">
        <div className="hero-overlay-content">
          <span className="eyebrow eyebrow--light">
            {BRAND_IDENTITY.institutionalName} · {BRAND_IDENTITY.location}
          </span>

          <h1 id="contenido-principal" tabIndex={-1}>
            {BRAND_IDENTITY.heroHeadline}
          </h1>

          <p className="hero-subtagline">{BRAND_IDENTITY.heroSubheadline}</p>

          <p className="hero-lead-light">{BRAND_IDENTITY.heroLead}</p>

          <div className="hero-actions-row">
            <a href="#finca" className="btn-outline-light">
              Descubre el origen y la finca
            </a>
            <a href="#recomendamos" className="btn-primary">
              Explorar despensa
            </a>
          </div>

          <div className="hero-trust-row">
            <span className="hero-trust-item">
              <Sprout size={18} aria-hidden="true" />
              <span>Origen común verificado por lote</span>
            </span>
            <span className="hero-trust-item">
              <Truck size={18} aria-hidden="true" />
              <span>Envío protegido para vidrio · gratis desde 55 €</span>
            </span>
            <span className="hero-trust-item">
              <ShieldCheck size={18} aria-hidden="true" />
              <span>Tres envases para disfrutar o regalar</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

