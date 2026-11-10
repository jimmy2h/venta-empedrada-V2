import { ArrowUpRight } from 'lucide-react';
import { MOSAIC_TILES } from '../data/brandContent';

export function BentoMosaicSection({ onSelectCategoryAndScroll }) {
  return (
    <section className="bento-mosaic-section">
      <div className="container">
        <h2 className="visually-hidden">
          Familias de producto y recorridos por la finca Venta Empedrada
        </h2>

        <div className="bento-mosaic-grid">
          {MOSAIC_TILES.map((tile) => {
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
                  className="bento-tile"
                  onClick={() => onSelectCategoryAndScroll(tile.categoryId, tile.targetId)}
                >
                  {tileContent}
                </button>
              );
            }

            return (
              <a
                key={tile.id}
                href={`#${tile.targetId}`}
                className="bento-tile"
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
