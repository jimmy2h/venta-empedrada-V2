import { useState } from 'react';
import { Eye, Minus, Plus, RotateCcw } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/useCart';

const formatEuro = (value) => `${value.toFixed(2).replace('.', ',')} €`;

export function RecommendedCatalogSection({
  selectedCategory,
  onSelectCategory,
  onInspectProduct,
}) {
  const { addItem } = useCart();
  const [quantities, setQuantities] = useState({});

  const getQuantity = (productId) => quantities[productId] ?? 1;

  const updateCardQuantity = (productId, delta) => {
    setQuantities((prev) => {
      const current = prev[productId] ?? 1;
      const next = Math.max(1, current + delta);
      if (next === current) return prev;
      return { ...prev, [productId]: next };
    });
  };

  const filteredItems = PRODUCTS.filter(
    (item) => selectedCategory === 'todos' || item.categoryKey === selectedCategory
  );

  return (
    <section id="recomendamos" className="section-pad section-surface-light">
      <div className="container">
        <div className="recommended-header-bar">
          <div className="recommended-header-content">
            <span className="eyebrow">Colección Venta Empedrada</span>
            <h2>Nuestros productos</h2>
            <p className="prose-measure text-muted">
              Tres referencias directas de nuestra finca en Almería. Cada familia mantiene su identificador cromático y desglose por medida para elegir sin rodeos.
            </p>
          </div>
        </div>

        {selectedCategory !== 'todos' && (
          <div className="search-status-bar">
            <span>
              Mostrando <strong>{filteredItems.length}</strong> de {PRODUCTS.length}{' '}
              productos.
            </span>
            <button
              type="button"
              className="btn-quiet"
              style={{ minBlockSize: '40px', padding: '0.35rem 0.85rem' }}
              onClick={() => onSelectCategory('todos')}
            >
              <RotateCcw size={16} aria-hidden="true" />
              <span>Ver toda la despensa</span>
            </button>
          </div>
        )}

        <div className="recommended-grid">
          {filteredItems.map((item) => {
            const qty = getQuantity(item.id);
            const totalPrice = item.price * qty;
            return (
              <article
                key={item.id}
                className="shop-card"
                style={{ '--card-accent': item.accentColor }}
              >
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  width="1024"
                  height="782"
                  className="shop-card-img"
                  onError={(e) => {
                    e.currentTarget.src = item.fallbackImage;
                  }}
                />

                <header className="shop-card-header">
                  <span className="shop-card-family">
                    <span
                      className="dot-swatch"
                      style={{ backgroundColor: item.accentColor }}
                      aria-hidden="true"
                    />
                    <span>
                      {item.shortFamily} · {item.format}
                    </span>
                  </span>
                  <h3 className="shop-card-title">{item.name}</h3>
                </header>

                <div className="shop-card-pricing">
                  <div className="shop-card-price-row">
                    <span className="shop-card-price">{formatEuro(totalPrice)}</span>

                    <div
                      className="qty-stepper"
                      role="group"
                      aria-label={`Cantidad de ${item.name}`}
                    >
                      <button
                        type="button"
                        className="qty-btn"
                        aria-label={`Reducir cantidad de ${item.name}`}
                        aria-disabled={qty <= 1}
                        onClick={() => updateCardQuantity(item.id, -1)}
                      >
                        <Minus size={16} aria-hidden="true" />
                      </button>
                      <span className="qty-value">{qty}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        aria-label={`Aumentar cantidad de ${item.name}`}
                        onClick={() => updateCardQuantity(item.id, 1)}
                      >
                        <Plus size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="shop-card-measure">
                    {qty > 1
                      ? `${qty} uds. (${formatEuro(item.price)} / ud.) · ${item.unitMeasureLabel}`
                      : item.unitMeasureLabel}
                  </div>
                </div>

                <footer className="shop-card-footer">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => addItem(item.id, qty, { openDrawer: true })}
                  >
                    <Plus size={18} aria-hidden="true" />
                    <span>
                      {qty > 1 ? `${item.ctaLabel} (${qty})` : item.ctaLabel}
                    </span>
                  </button>

                  <button
                    type="button"
                    className="btn-quiet"
                    onClick={() => onInspectProduct(item)}
                  >
                    <Eye size={17} aria-hidden="true" />
                    <span>Ver ficha · {item.name}</span>
                  </button>
                </footer>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

