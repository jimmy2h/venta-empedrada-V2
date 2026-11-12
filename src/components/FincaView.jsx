import { ArrowLeft, Compass, Layers } from 'lucide-react';
import {
  BRAND_IDENTITY,
  FINCA_BANNER_CONTENT,
  STORY_CHAPTERS,
  VALUES_PILLARS,
} from '../data/brandContent';

export function FincaView({ onReturnToStore }) {
  return (
    <div className="section-pad">
      <div className="container" style={{ display: 'grid', gap: 'var(--espacio-lg)' }}>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <button
            type="button"
            className="btn-quiet"
            style={{ inlineSize: 'fit-content' }}
            onClick={() => {
              onReturnToStore();
              window.scrollTo({ top: 0 });
            }}
          >
            <ArrowLeft size={18} aria-hidden="true" />
            <span>Volver a la tienda</span>
          </button>

          <span className="eyebrow">
            Relato de la finca · {BRAND_IDENTITY.institutionalName} · {BRAND_IDENTITY.location}
          </span>

          <h1 id="contenido-principal" tabIndex={-1}>
            La finca
          </h1>

          <p className="hero-lead prose-measure">
            {FINCA_BANNER_CONTENT.lead} Descubre dónde nace cada producto, por qué unimos aceite, miel y almendras bajo un mismo techo y cómo volvimos a abrir los bancales del camino.
          </p>
        </div>

        <figure>
          <div className="hero-frame">
            <img
              src="./images/finca-amanecer.png"
              alt="Camino empedrado, bancales de piedra seca y antigua venta de Venta Empedrada al amanecer en el interior de Almería."
              width="1536"
              height="1024"
              fetchPriority="high"
            />
          </div>
          <figcaption className="hero-caption">
            Camino empedrado, bancales de piedra seca y antigua venta al amanecer en el interior de Almería.
          </figcaption>
        </figure>

        <section className="section-surface-light" style={{ padding: 'clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem)', borderRadius: 'var(--radio-tarjeta)' }}>
          <div className="section-header" style={{ marginBlockEnd: '1.75rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-olivo)' }}>
              <Compass size={20} aria-hidden="true" />
              <span className="eyebrow">Historia y parajes</span>
            </div>
            <h2>Un origen que puedes conocer</h2>
            <p className="prose-measure">
              Tres capítulos que explican cómo una antigua venta del interior de Almería volvió a producir aceite Picual, miel de romero y almendra Marcona en un mismo entorno.
            </p>
          </div>

          <div className="split-grid">
            <div style={{ display: 'grid', gap: '1.35rem' }}>
              {STORY_CHAPTERS.map((chapter, idx) => (
                <article
                  key={chapter.id}
                  className="scroll-reveal"
                  style={{
                    padding: '1.25rem 1.4rem',
                    backgroundColor: 'var(--color-caliza)',
                    border: '1px solid var(--color-caliza-borde)',
                    borderRadius: 'var(--radio-suave)',
                  }}
                >
                  <h3 style={{ fontSize: '1.25rem', marginBlockEnd: '0.45rem' }}>
                    0{idx + 1}. {chapter.title}
                  </h3>
                  <p className="prose-measure">{chapter.text}</p>
                </article>
              ))}
            </div>

            <div>
              <figure>
                <img
                  src="./images/infografia-coleccion.png"
                  alt="Esquema de colección Venta Empedrada: El Olivar (Picual 500 ml para terminar un plato), El Romeral (Miel de romero 500 g para endulzar el desayuno) y El Almendral (Marcona 250 g para compartir un aperitivo), reunidos en Caja La Mesa de la Venta."
                  width="1800"
                  height="800"
                  loading="lazy"
                  className="story-infographic-img"
                />
                <figcaption className="hero-caption">
                  Arquitectura de colección: tres parajes de una misma finca con reposición por separado.
                </figcaption>
              </figure>

              <div style={{ marginBlockStart: '1.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-olivo)', marginBlockEnd: '0.75rem' }}>
                  <Layers size={19} aria-hidden="true" />
                  <h3 style={{ fontSize: '1.25rem' }}>Cuatro valores que guían el campo</h3>
                </div>

                <div className="valores-grid">
                  {VALUES_PILLARS.map((pillar) => (
                    <div
                      key={pillar.title}
                      style={{
                        padding: '1rem 1.15rem',
                        backgroundColor: 'var(--color-caliza)',
                        border: '1px solid var(--color-caliza-borde)',
                        borderRadius: 'var(--radio-suave)',
                      }}
                    >
                      <strong style={{ color: 'var(--color-olivo)', fontFamily: 'var(--font-marca)' }}>
                        {pillar.title}
                      </strong>
                      <p style={{ fontSize: '0.96rem', marginBlockStart: '0.25rem' }}>{pillar.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-lg">
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                onReturnToStore();
                window.scrollTo({ top: 0 });
              }}
            >
              <ArrowLeft size={18} aria-hidden="true" />
              <span>Explorar la despensa de la finca</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
