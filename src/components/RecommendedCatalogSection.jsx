import { Eye, Plus, RotateCcw } from 'lucide-react';
import { CATALOG_CATEGORIES, CATALOG_ITEMS } from '../data/products';
import { useCart } from '../context/useCart';

const formatEuro = (value) => `${value.toFixed(2).replace('.', ',')} €`;

export function RecommendedCatalogSection({
  selectedCategory,
  searchQuery,
  onSelectCategory,
  onClearSearch,
  onInspectProduct,
}) {
  const { addItem } = useCart();

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredItems = CATALOG_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'todos' || item.categoryKey === selectedCategory;

    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;

    const haystack = [
      item.name,
      item.subtitle,
      item.category,
      item.shortFamily,
      item.format,
      item.sku,
      item.description,
      item.searchKeywords,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });

  return (
    <section id="recomendamos" className="section-pad section-surface-light">
      <div className="container">
        <div className="recommended-header-bar">
          <div>
            <span className="eyebrow">Colección Venta Empedrada</span>
            <h2 className="mt-xs">Te recomendamos:</h2>
            <p className="prose-measure mt-xs text-muted">
              Cuatro referencias directas de nuestra finca en Almería. Cada familia mantiene su franja cromática y desglose por medida para elegir sin rodeos.
            </p>
          </div>
          <span className="pill-status">
            {filteredItems.length} {filteredItems.length === 1 ? 'referencia visible' : 'referencias visibles'}
          </span>
        </div>

        <div
          className="filter-pills-row"
          role="group"
          aria-label="Filtrar referencias por familia de producto"
        >
          {CATALOG_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                className="filter-pill-btn"
                aria-pressed={isActive}
                onClick={() => onSelectCategory(cat.id)}
              >
                {cat.accent && (
                  <span
                    className="dot-swatch"
                    style={{ backgroundColor: isActive ? '#FFFFFF' : cat.accent }}
                    aria-hidden="true"
                  />
                )}
                <span>
                  {cat.label} ({cat.count})
                </span>
              </button>
            );
          })}
        </div>

        {(normalizedQuery || selectedCategory !== 'todos') && (
          <div className="search-status-bar">
            <span>
              Mostrando <strong>{filteredItems.length}</strong> de {CATALOG_ITEMS.length}{' '}
              productos
              {normalizedQuery ? ` para “${searchQuery.trim()}”` : ''}.
            </span>
            <button
              type="button"
              className="btn-quiet"
              style={{ minBlockSize: '40px', padding: '0.35rem 0.85rem' }}
              onClick={() => {
                onSelectCategory('todos');
                onClearSearch();
              }}
            >
              <RotateCcw size={16} aria-hidden="true" />
              <span>Ver toda la despensa</span>
            </button>
          </div>
        )}

        {filteredItems.length === 0 ? (
          <div className="empty-cart-card">
            <h3>No hay coincidencias exactas para “{searchQuery.trim()}”</h3>
            <p className="prose-measure text-muted">
              Prueba buscando por «Picual», «miel de romero», «almendra Marcona» o «La Mesa de la Venta», o restablece todos los filtros.
            </p>
            <div>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  onSelectCategory('todos');
                  onClearSearch();
                }}
              >
                <RotateCcw size={18} aria-hidden="true" />
                <span>Restablecer filtros</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="recommended-grid">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="shop-card"
                style={{ '--card-accent': item.accentColor }}
              >
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  width="600"
                  height="600"
                  loading="lazy"
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
                  <p className="shop-card-sub">{item.subtitle}</p>
                </header>

                <div className="shop-card-body">
                  <p style={{ fontSize: '0.98rem' }}>{item.shortSpec || item.tagline}</p>

                  <div className="shop-card-pricing">
                    <div className="shop-card-price-row">
                      <span className="shop-card-price">{formatEuro(item.price)}</span>
                      <span className="text-muted" style={{ fontSize: '0.84rem' }}>
                        {item.sku}
                      </span>
                    </div>
                    <div className="shop-card-measure">{item.unitMeasureLabel}</div>
                  </div>
                </div>

                <footer className="shop-card-footer">
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
                    className="btn-quiet"
                    onClick={() => onInspectProduct(item)}
                  >
                    <Eye size={17} aria-hidden="true" />
                    <span>Ver ficha · {item.name}</span>
                  </button>
                </footer>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

