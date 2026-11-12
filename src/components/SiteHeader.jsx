import { ShoppingBasket } from 'lucide-react';
import { BrandWordmark } from './BrandMark';
import { CATALOG_CATEGORIES } from '../data/products';
import { useCart } from '../context/useCart';

const formatEuro = (value) => `${value.toFixed(2).replace('.', ',')} €`;

const NAV_CATEGORIES = CATALOG_CATEGORIES.filter((cat) => cat.id === 'cajas');

export function StoreCategoryNav({
  activeView,
  selectedCategory,
  onSelectCategory,
  onNavigate,
}) {
  const handleCategoryClick = (catId) => {
    if (catId === 'cajas') {
      onSelectCategory('todos');
      onNavigate('tienda', 'la-mesa-de-la-venta');
      return;
    }
    onSelectCategory(catId);
    onNavigate('tienda', 'recomendamos');
  };

  const handleAnchorClick = (e, sectionId) => {
    e.preventDefault();
    onNavigate('tienda', sectionId);
  };

  return (
    <div className="header-nav-row">
      <div className="container">
        <nav aria-label="Secciones de la tienda y la finca">
          <ul className="clean-list header-nav-list" role="list">
            {NAV_CATEGORIES.map((cat) => {
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
              <button
                type="button"
                className="nav-link-cat"
                aria-current={activeView === 'finca' ? 'page' : undefined}
                onClick={() => onNavigate('finca')}
              >
                La Finca
              </button>
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
  );
}

export function SiteHeader({
  activeView,
  selectedCategory,
  onSelectCategory,
  onNavigate,
  isScrolledPastHero = false,
}) {
  const { totalCount, subtotal, setIsDrawerOpen } = useCart();
  const isHeroOverlay = activeView === 'tienda';

  const headerClassName = [
    'site-header',
    isHeroOverlay ? 'site-header--hero-overlay' : 'site-header--solid',
    isHeroOverlay && isScrolledPastHero ? 'is-past-hero' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={headerClassName}>
      <a href="#contenido-principal" className="skip-link visually-hidden">
        Ir directamente al contenido principal
      </a>

      {/* Fila superior: Marca · Sistema de marca y Cesta con importe */}
      <div className="header-top-row">
        <div className="container header-top-inner">
          <a
            href="#inicio"
            className="brand-home-link"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('todos');
              onNavigate('tienda');
            }}
            aria-label="Venta Empedrada — Volver al inicio de la tienda"
          >
            <BrandWordmark showDescriptor compact inverted={isHeroOverlay} />
          </a>

          <div className="header-actions">
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

      {!isHeroOverlay && (
        <StoreCategoryNav
          activeView={activeView}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
          onNavigate={onNavigate}
        />
      )}
    </header>
  );
}
