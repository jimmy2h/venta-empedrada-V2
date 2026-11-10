import { useId } from 'react';
import { Palette, Search, ShoppingBasket, X } from 'lucide-react';
import { BrandWordmark } from './BrandMark';
import { CATALOG_CATEGORIES } from '../data/products';
import { useCart } from '../context/useCart';

const formatEuro = (value) => `${value.toFixed(2).replace('.', ',')} €`;

export function SiteHeader({
  activeView,
  selectedCategory,
  searchQuery,
  onSelectCategory,
  onSearchChange,
  onNavigate,
}) {
  const { totalCount, subtotal, setIsDrawerOpen } = useCart();
  const searchInputId = useId();

  const handleCategoryClick = (catId) => {
    onSelectCategory(catId);
    onNavigate('tienda', 'recomendamos');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onNavigate('tienda', 'recomendamos');
  };

  const handleAnchorClick = (e, sectionId) => {
    e.preventDefault();
    onNavigate('tienda', sectionId);
  };

  return (
    <header className="site-header">
      <a href="#contenido-principal" className="skip-link visually-hidden">
        Ir directamente al contenido principal
      </a>

      {/* Fila 1: Marca · Buscador · Sistema de marca y Cesta con importe */}
      <div className="header-top-row">
        <div className="container header-top-inner">
          <a
            href="#inicio"
            className="brand-home-link"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('todos');
              onSearchChange('');
              onNavigate('tienda');
            }}
            aria-label="Venta Empedrada — Volver al inicio de la tienda"
          >
            <BrandWordmark showDescriptor compact />
          </a>

          <div className="header-search-wrap">
            <search>
              <form
                className="header-search-form"
                onSubmit={handleSearchSubmit}
                aria-label="Buscar productos de la finca"
              >
                <label htmlFor={searchInputId} className="visually-hidden">
                  Buscar en la despensa de Venta Empedrada
                </label>
                <input
                  id={searchInputId}
                  type="search"
                  name="q"
                  className="header-search-input"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Buscar Picual, miel de romero, Marcona, lote..."
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck={false}
                />
                {searchQuery.trim() && (
                  <button
                    type="button"
                    className="header-search-icon-btn"
                    aria-label="Limpiar búsqueda"
                    onClick={() => onSearchChange('')}
                  >
                    <X size={18} aria-hidden="true" />
                  </button>
                )}
                <button
                  type="submit"
                  className="header-search-icon-btn"
                  aria-label="Buscar productos"
                >
                  <Search size={19} aria-hidden="true" />
                </button>
              </form>
            </search>
          </div>

          <div className="header-actions">
            <button
              type="button"
              className="nav-pill-identidad"
              aria-pressed={activeView === 'identidad'}
              onClick={() => onNavigate(activeView === 'identidad' ? 'tienda' : 'identidad')}
            >
              <Palette size={18} aria-hidden="true" />
              <span>{activeView === 'identidad' ? 'Volver a tienda' : 'Sistema de marca'}</span>
            </button>

            <button
              type="button"
              className="cart-trigger"
              onClick={() => setIsDrawerOpen(true)}
              aria-label={`Abrir tu cesta, ${totalCount} ${totalCount === 1 ? 'producto' : 'productos'}, subtotal ${formatEuro(subtotal)}`}
            >
              <span className="cart-subtotal" aria-hidden="true">
                {formatEuro(subtotal)}
              </span>
              <ShoppingBasket size={20} aria-hidden="true" />
              <span className="cart-badge" aria-hidden="true">
                {totalCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Fila 2: Barra de categorías de despensa y secciones editoriales */}
      <div className="header-nav-row">
        <div className="container">
          <nav aria-label="Categorías y secciones de la finca">
            <ul className="clean-list header-nav-list" role="list">
              {CATALOG_CATEGORIES.map((cat) => {
                const isActive = activeView === 'tienda' && selectedCategory === cat.id;
                return (
                  <li key={cat.id}>
                    <button
                      type="button"
                      className="nav-link-cat"
                      aria-current={isActive ? 'true' : undefined}
                      onClick={() => handleCategoryClick(cat.id)}
                    >
                      {cat.accent && (
                        <span
                          className="dot-swatch"
                          style={{ backgroundColor: cat.accent }}
                          aria-hidden="true"
                        />
                      )}
                      <span>{cat.navLabel}</span>
                    </button>
                  </li>
                );
              })}

              <li>
                <a
                  href="#la-mesa-de-la-venta"
                  className="nav-link-cat"
                  onClick={(e) => handleAnchorClick(e, 'la-mesa-de-la-venta')}
                >
                  Personalizar caja
                </a>
              </li>
              <li>
                <a
                  href="#finca"
                  className="nav-link-cat"
                  onClick={(e) => handleAnchorClick(e, 'finca')}
                >
                  La Finca
                </a>
              </li>
              <li>
                <a
                  href="#practicas"
                  className="nav-link-cat"
                  onClick={(e) => handleAnchorClick(e, 'practicas')}
                >
                  Origen y lotes
                </a>
              </li>
              <li>
                <a
                  href="#ideas-mesa"
                  className="nav-link-cat"
                  onClick={(e) => handleAnchorClick(e, 'ideas-mesa')}
                >
                  En tu mesa
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="nav-link-cat"
                  onClick={(e) => handleAnchorClick(e, 'contacto')}
                >
                  Noticias
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
