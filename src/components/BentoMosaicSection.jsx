import { ArrowUpRight, Plus } from 'lucide-react';
import { MOSAIC_TILES, TABLE_RITUALS } from '../data/brandContent';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/useCart';

export function BentoMosaicSection({ onSelectCategoryAndScroll, onNavigate }) {
  const { addItem } = useCart();

  const productById = {
    'pan-picual': PRODUCTS[0],
    'yogur-miel': PRODUCTS[1],
    'cuenco-marcona': PRODUCTS[2],
  };

  return (
    <section id="ideas-mesa" className="bento-mosaic-section">
      <div className="container">
        <div className="bento-mosaic-grid">
          <div className="bento-editorial-panel">
            <div className="bento-editorial-intro">
              <span className="eyebrow">En tu mesa cada día</span>
              <h2 className="bento-editorial-title">Hazles un sitio en tu mesa</h2>
              <p className="prose-measure bento-editorial-lead">
                Un chorrito de Picual sobre el pan, una cucharada de miel en el yogur y unas Marconas para compartir. Tres gestos cotidianos pensados para abrir y disfrutar sin complicaciones.
              </p>
            </div>

            <div className="bento-rituals-list">
              {TABLE_RITUALS.map((ritual) => {
                const relatedProduct = productById[ritual.id];
                return (
                  <article
                    key={ritual.id}
                    className="bento-ritual-card scroll-reveal"
                    style={{ '--ritual-accent': ritual.accent }}
                  >
                    <header className="bento-ritual-header">
                      <span className="bento-ritual-moment">{ritual.moment}</span>
                      <h3 className="bento-ritual-title">{ritual.headline}</h3>
                    </header>

                    <p className="bento-ritual-body">{ritual.body}</p>

                    {relatedProduct && (
                      <footer className="bento-ritual-footer">
                        <button
                          type="button"
                          className="btn-quiet"
                          onClick={() => addItem(relatedProduct.id, 1, { openDrawer: true })}
                        >
                          <Plus size={16} aria-hidden="true" />
                          <span>{relatedProduct.ctaLabel}</span>
                        </button>
                      </footer>
                    )}
                  </article>
                );
              })}
            </div>
          </div>

          {MOSAIC_TILES.map((tile) => {
            const tileClassName = ['bento-tile', tile.slotClass].filter(Boolean).join(' ');

            const tileContent = (
              <>
                <img
                  src={tile.image}
                  alt={tile.imageAlt}
                  width="900"
                  height="900"
                  loading="lazy"
                  className="bento-tile-img"
                />
                <span className="bento-tile-overlay" aria-hidden="true" />
                <div className="bento-tile-content">
                  <div className="bento-tile-meta">
                    <span className="bento-tile-sub">
                      <span
                        className="dot-swatch"
                        style={{ backgroundColor: tile.accent }}
                        aria-hidden="true"
                      />
                      <span>{tile.subtitle}</span>
                    </span>
                    <span className="bento-tile-title">{tile.title}</span>
                  </div>
                  <span className="bento-arrow-circle" aria-hidden="true">
                    <ArrowUpRight size={20} strokeWidth={2.2} />
                  </span>
                </div>
              </>
            );

            if (tile.actionType === 'category') {
              return (
                <button
                  key={tile.id}
                  type="button"
                  className={tileClassName}
                  onClick={() => onSelectCategoryAndScroll(tile.categoryId, tile.targetId)}
                >
                  {tileContent}
                </button>
              );
            }

            if (tile.actionType === 'view') {
              return (
                <button
                  key={tile.id}
                  type="button"
                  className={tileClassName}
                  onClick={() => onNavigate(tile.targetView)}
                >
                  {tileContent}
                </button>
              );
            }

            return (
              <a
                key={tile.id}
                href={`#${tile.targetId}`}
                className={tileClassName}
              >
                {tileContent}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
