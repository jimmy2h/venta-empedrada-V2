import { Plus } from 'lucide-react';
import { TABLE_RITUALS } from '../data/brandContent';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/useCart';

export function TableIdeasSection() {
  const { addItem } = useCart();

  const productById = {
    'pan-picual': PRODUCTS[0],
    'yogur-miel': PRODUCTS[1],
    'cuenco-marcona': PRODUCTS[2],
  };

  return (
    <section id="ideas-mesa" className="section-pad section-surface-stone">
      <div className="container">
        <div className="split-grid">
          <div>
            <span className="eyebrow">En tu mesa cada día</span>
            <h2 className="mt-sm">Hazles un sitio en tu mesa</h2>
            <p className="prose-measure mt-sm">
              Un chorrito de Picual sobre el pan, una cucharada de miel en el yogur y unas Marconas para compartir. Tres gestos cotidianos pensados para abrir y disfrutar sin complicaciones.
            </p>

            <div className="rituales-grid mt-md">
              {TABLE_RITUALS.map((ritual) => {
                const relatedProduct = productById[ritual.id];
                return (
                  <article
                    key={ritual.id}
                    className="scroll-reveal"
                    style={{
                      backgroundColor: 'var(--color-caliza-clara)',
                      border: '1px solid var(--color-caliza-borde)',
                      borderTop: `5px solid ${ritual.accent}`,
                      borderRadius: 'var(--radio-suave)',
                      padding: '1.15rem 1.25rem',
                      display: 'grid',
                      gap: '0.55rem',
                      alignContent: 'space-between',
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: '0.88rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          color: 'var(--color-tinta-suave)',
                        }}
                      >
                        {ritual.moment}
                      </span>
                      <h3 style={{ fontSize: '1.25rem', marginBlock: '0.2rem 0.45rem' }}>
                        {ritual.headline}
                      </h3>
                      <p style={{ fontSize: '0.98rem' }}>{ritual.body}</p>
                    </div>

                    {relatedProduct && (
                      <div style={{ marginBlockStart: '0.5rem' }}>
                        <button
                          type="button"
                          className="btn-quiet"
                          onClick={() => addItem(relatedProduct.id, 1, { openDrawer: true })}
                        >
                          <Plus size={16} aria-hidden="true" />
                          <span>{relatedProduct.ctaLabel}</span>
                        </button>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>

          <figure>
            <div className="hero-frame">
              <img
                src="./images/mesa-consumo.png"
                alt="Escena de mesa con tostadas de pan artesano regadas con aceite de oliva virgen extra Picual, bol de yogur con miel de romero, rama fresca de romero y cuenco pequeño de almendras Marcona repeladas."
                width="1536"
                height="1024"
                loading="lazy"
              />
            </div>
            <figcaption className="hero-caption">
              Propuesta de consumo cotidiano: pan con Picual, yogur natural con miel de romero y almendra Marcona en crudo.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

