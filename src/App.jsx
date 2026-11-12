import { useCallback, useEffect, useRef, useState } from 'react';
import { ShoppingBasket, X } from 'lucide-react';
import { CartProvider } from './context/CartContext';
import { useCart } from './context/useCart';
import { SiteHeader, StoreCategoryNav } from './components/SiteHeader';
import { HeroBannerSection } from './components/HeroBannerSection';
import { BentoMosaicSection } from './components/BentoMosaicSection';
import { RecommendedCatalogSection } from './components/RecommendedCatalogSection';
import { GiftBoxSection } from './components/GiftBoxSection';
import { FincaBannerSection } from './components/FincaBannerSection';
import { FincaView } from './components/FincaView';
import { TraceabilityPracticesSection } from './components/TraceabilityPracticesSection';
import { NewsletterShowcaseSection } from './components/NewsletterShowcaseSection';
import { BrandIdentityView } from './components/BrandIdentityView';
import { ProductDetailDialog } from './components/ProductDetailDialog';
import { CartDrawer } from './components/CartDrawer';
import { SiteFooter } from './components/SiteFooter';

function StorefrontShell({ initialView = 'tienda' }) {
  const [activeView, setActiveView] = useState(initialView);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [inspectedProduct, setInspectedProduct] = useState(null);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  const {
    isDrawerOpen,
    setIsDrawerOpen,
    toastMessage,
    setToastMessage,
    liveMessage,
  } = useCart();

  const isFirstRenderRef = useRef(true);
  const pendingSectionRef = useRef(null);

  useEffect(() => {
    if (activeView === 'finca') {
      document.title = 'La finca · Venta Empedrada V2';
    } else if (activeView === 'identidad') {
      document.title = 'Sistema de marca · Venta Empedrada V2';
    } else {
      document.title = 'Venta Empedrada V2 · Despensa de Finca en Almería';
    }
  }, [activeView]);

  useEffect(() => {
    if (activeView !== 'tienda' || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const heroEl = document.getElementById('inicio');
    if (!heroEl) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolledPastHero(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '-76px 0px 0px 0px',
      }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [activeView]);

  const handleNavigate = useCallback((nextView, sectionId = null) => {
    pendingSectionRef.current = sectionId;
    if (nextView !== 'tienda') {
      setIsScrolledPastHero(false);
    }
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

  const hasOpenModal = isDrawerOpen || Boolean(inspectedProduct);

  return (
    <>
      <SiteHeader
        activeView={activeView}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onNavigate={handleNavigate}
        isScrolledPastHero={isScrolledPastHero}
      />

      <main>
        {activeView === 'tienda' ? (
          <>
            <HeroBannerSection onOpenFinca={() => handleNavigate('finca')} />
            <StoreCategoryNav
              activeView={activeView}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onNavigate={handleNavigate}
            />
            <RecommendedCatalogSection
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onInspectProduct={setInspectedProduct}
            />
            <GiftBoxSection />
            <FincaBannerSection onOpenFinca={() => handleNavigate('finca')} />
            <TraceabilityPracticesSection />
            <BentoMosaicSection
              onSelectCategoryAndScroll={handleSelectCategoryAndScroll}
              onNavigate={handleNavigate}
            />
            <NewsletterShowcaseSection />
          </>
        ) : activeView === 'finca' ? (
          <FincaView onReturnToStore={() => handleNavigate('tienda')} />
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

