import { useState } from 'react';
import { Eye, Plus } from 'lucide-react';
import { GIFT_BOX, PRODUCTS } from '../data/products';
import { useCart } from '../context/useCart';

const formatEuro = (value) => `${value.toFixed(2).replace('.', ',')} €`;

const SPOTLIGHT_ITEMS = [PRODUCTS[0], GIFT_BOX];

export function IconicShowcaseSection({ onInspectProduct }) {
  const [spotId, setSpotId] = useState(PRODUCTS[0].id);
  const { addItem } = useCart();

  const item = SPOTLIGHT_ITEMS.find((entry) => entry.id === spotId) || PRODUCTS[0];

  return (
    <section className="iconic-showcase-section">
      <div className="container">
        <div className="iconic-split-grid">
          <div className="iconic-media-stage">
            <img
              src={item.image}
              alt={item.imageAlt}
              width="1200"
              height="825"
              onError={(e) => {
                e.currentTarget.src = item.fallbackImage;
              }}
            />
            <span
              className="iconic-family-stripe"
              style={{ backgroundColor: item.accentColor }}
              aria-hidden="true"
            />
          </div>

          <div style={{ display: 'grid', gap: '1rem' }}>
            <div
              className="spotlight-switcher"
              role="group"
              aria-label="Cambiar producto destacado"
            >
              {SPOTLIGHT_ITEMS.map((candidate) => (
                <button
                  key={candidate.id}
                  type="button"
                  className="spotlight-tab"
                  aria-pressed={candidate.id === item.id}
                  onClick={() => setSpotId(candidate.id)}
                >
                  {candidate.id === PRODUCTS[0].id ? 'Producto icono' : 'Caja completa'}
                </button>
              ))}
            </div>

            <span className="eyebrow">
              {item.shortFamily} · {item.format}
            </span>

            <h2>
              Nuestro icono:{' '}
              <br />
              {item.name}
            </h2>

            <p className="prose-measure">{item.description}</p>

            <div className="iconic-specs-strip">
              <span className="iconic-spec-pill">{formatEuro(item.price)}</span>
              <span className="iconic-spec-pill">{item.unitMeasureLabel}</span>
              <span className="iconic-spec-pill">{item.tagline}</span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBlockStart: '0.4rem' }}>
              <button
                type="button"
                className="btn-primary"
                onClick={() => addItem(item.id, 1, { openDrawer: true })}
              >
                <Plus size={18} aria-hidden="true" />
                <span>{item.ctaLabel}</span>
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={() => onInspectProduct(item)}
              >
                <Eye size={18} aria-hidden="true" />
                <span>Ver ficha completa</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
