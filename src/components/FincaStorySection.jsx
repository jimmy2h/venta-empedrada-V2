import { BRAND_IDENTITY, STORY_CHAPTERS, VALUES_PILLARS } from '../data/brandContent';

export function FincaStorySection() {
  return (
    <section id="finca" className="section-pad section-surface-light">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Relato de la finca · {BRAND_IDENTITY.institutionalName}</span>
          <h2>Un origen que puedes conocer</h2>
          <p className="prose-measure">
            Descubre dónde nace cada producto, por qué unimos aceite, miel y almendras bajo un mismo techo y cómo volvimos a abrir los bancales del camino.
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

            <div className="valores-grid mt-md">
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
    </section>
  );
}

