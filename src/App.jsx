import { useCallback, useEffect, useRef, useState } from 'react';
import { ShoppingBasket, X } from 'lucide-react';
import { CartProvider } from './context/CartContext';
import { useCart } from './context/useCart';
import { SiteHeader } from './components/SiteHeader';
import { HeroBannerSection } from './components/HeroBannerSection';
import { IconicShowcaseSection } from './components/IconicShowcaseSection';
import { BentoMosaicSection } from './components/BentoMosaicSection';
import { RecommendedCatalogSection } from './components/RecommendedCatalogSection';
import { GiftBoxSection } from './components/GiftBoxSection';
import { FincaStorySection } from './components/FincaStorySection';
import { TraceabilityPracticesSection } from './components/TraceabilityPracticesSection';
import { TableIdeasSection } from './components/TableIdeasSection';
import { NewsletterShowcaseSection } from './components/NewsletterShowcaseSection';
import { BrandIdentityView } from './components/BrandIdentityView';
import { ProductDetailDialog } from './components/ProductDetailDialog';
import { CartDrawer } from './components/CartDrawer';
import { SiteFooter } from './components/SiteFooter';

function StorefrontShell({ initialView = 'tienda' }) {
  const [activeView, setActiveView] = useState(initialView);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedProduct, setInspectedProduct] = useState(null);

  const {
    isDrawerOpen,
    setIsDrawerOpen,
    toastMessage,
    setToastMessage,
    liveMessage,
  } = useCart();

  const isFirstRenderRef = useRef(true);
  const pendingSectionRef = useRef(null);

  const handleNavigate = useCallback((nextView, sectionId = null) => {
    pendingSectionRef.current = sectionId;
    setActiveView((prev) => {
      if (prev === nextView) {
        if (sectionId) {
          document.getElementById(sectionId)?.scrollIntoView();
        } else {
          window.scrollTo({ top: 0 });
          document.getElementById('contenido-principal')?.focus();
        }
        pendingSectionRef.current = null;
        return prev;
      }
      return nextView;
    });
  }, []);

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    const targetId = pendingSectionRef.current;
    pendingSectionRef.current = null;

    window.requestAnimationFrame(() => {
      if (targetId) {
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView();
          return;
        }
      }
      window.scrollTo({ top: 0 });
      document.getElementById('contenido-principal')?.focus();
    });
  }, [activeView]);

  const handleSelectCategoryAndScroll = useCallback(
    (categoryId, sectionId = 'recomendamos') => {
      setSelectedCategory(categoryId);
      handleNavigate('tienda', sectionId);
    },
    [handleNavigate]
  );

  const handleSearchChange = useCallback(
    (nextQuery) => {
      setSearchQuery(nextQuery);
      if (activeView !== 'tienda' && nextQuery.trim().length > 0) {
        handleNavigate('tienda', 'recomendamos');
      }
    },
    [activeView, handleNavigate]
  );

  const hasOpenModal = isDrawerOpen || Boolean(inspectedProduct);

  return (
    <>
      <SiteHeader
        activeView={activeView}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onSelectCategory={setSelectedCategory}
        onSearchChange={handleSearchChange}
        onNavigate={handleNavigate}
      />

      <main>
        {activeView === 'tienda' ? (
          <>
            <HeroBannerSection />
            <IconicShowcaseSection onInspectProduct={setInspectedProduct} />
            <BentoMosaicSection
              onSelectCategoryAndScroll={handleSelectCategoryAndScroll}
            />
            <RecommendedCatalogSection
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              onSelectCategory={setSelectedCategory}
              onClearSearch={() => setSearchQuery('')}
              onInspectProduct={setInspectedProduct}
            />
            <GiftBoxSection />
            <FincaStorySection />
            <TraceabilityPracticesSection />
            <TableIdeasSection />
            <NewsletterShowcaseSection />
          </>
        ) : (
          <BrandIdentityView onReturnToStore={() => handleNavigate('tienda')} />
        )}
      </main>

      <SiteFooter
        activeView={activeView}
        onSelectCategory={setSelectedCategory}
        onNavigate={handleNavigate}
      />

      <ProductDetailDialog
        product={inspectedProduct}
        onClose={() => setInspectedProduct(null)}
      />

      <CartDrawer />

      {!hasOpenModal && (
        <div className="visually-hidden" aria-live="polite" aria-atomic="true">
          {liveMessage}
        </div>
      )}

      {!isDrawerOpen && toastMessage && (
        <div className="toast-banner" role="status">
          <span>{toastMessage}</span>
          <button
            type="button"
            className="toast-action-btn"
            onClick={() => {
              setToastMessage('');
              setIsDrawerOpen(true);
            }}
          >
            <ShoppingBasket
              size={15}
              aria-hidden="true"
              style={{ display: 'inline', verticalAlign: '-2px', marginInlineEnd: '0.25rem' }}
            />
            <span>Ver cesta</span>
          </button>
          <button
            type="button"
            className="toast-action-btn"
            aria-label="Cerrar aviso"
            onClick={() => setToastMessage('')}
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}

export default function App({ initialView = 'tienda' }) {
  return (
    <CartProvider>
      <StorefrontShell initialView={initialView} />
    </CartProvider>
  );
}

