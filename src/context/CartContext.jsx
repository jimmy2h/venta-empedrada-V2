import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { flushSync } from 'react-dom';
import { CartContext } from './cartContextObject';
import { GIFT_BOX, PRODUCTS, SHIPPING_CONFIG } from '../data/products';

const STORAGE_KEY = 'venta-empedrada-v2-cesta-v1';

const ALL_CATALOG_ITEMS = {
  ...Object.fromEntries(PRODUCTS.map((p) => [p.id, p])),
  [GIFT_BOX.id]: {
    ...GIFT_BOX,
    accentColor: '#293D32',
    category: 'Colección Completa · Lote',
  },
};

function readInitialState() {
  if (typeof window === 'undefined') {
    return { items: [], conEstuche: false, dedicatoria: '' };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [], conEstuche: false, dedicatoria: '' };
    const parsed = JSON.parse(raw);
    return {
      items: Array.isArray(parsed.items) ? parsed.items : [],
      conEstuche: Boolean(parsed.conEstuche),
      dedicatoria: typeof parsed.dedicatoria === 'string' ? parsed.dedicatoria : '',
    };
  } catch {
    return { items: [], conEstuche: false, dedicatoria: '' };
  }
}

export function CartProvider({ children }) {
  const initial = useMemo(() => readInitialState(), []);
  const [items, setItems] = useState(initial.items);
  const [conEstuche, setConEstuche] = useState(initial.conEstuche);
  const [dedicatoria, setDedicatoria] = useState(initial.dedicatoria);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [liveMessage, setLiveMessage] = useState('');
  const toastTimerRef = useRef(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ items, conEstuche, dedicatoria })
      );
    } catch {
      // Sin almacenamiento persistente disponible en navegación privada estricta
    }
  }, [items, conEstuche, dedicatoria]);

  const showNotice = useCallback((text) => {
    setLiveMessage(text);
    setToastMessage(text);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage('');
    }, 3800);
  }, []);

  const runWithOptionalTransition = useCallback((updateFn) => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      !prefersReduced
    ) {
      document.startViewTransition(() => {
        flushSync(updateFn);
      });
    } else {
      updateFn();
    }
  }, []);

  const addItem = useCallback(
    (productId, quantity = 1, options = {}) => {
      const product = ALL_CATALOG_ITEMS[productId];
      if (!product) return;

      setItems((prev) => {
        const existing = prev.find((i) => i.id === productId);
        if (existing) {
          return prev.map((i) =>
            i.id === productId ? { ...i, quantity: i.quantity + quantity } : i
          );
        }
        return [...prev, { id: productId, quantity }];
      });

      if (typeof options.conEstuche === 'boolean') {
        setConEstuche(options.conEstuche);
      }
      if (typeof options.dedicatoria === 'string' && options.dedicatoria.trim()) {
        setDedicatoria(options.dedicatoria);
      }

      showNotice(`Añadido a tu cesta: ${product.name} (${product.format}).`);
      if (options.openDrawer) {
        setIsDrawerOpen(true);
      }
    },
    [showNotice]
  );

  const updateQuantity = useCallback(
    (productId, nextQty) => {
      const product = ALL_CATALOG_ITEMS[productId];
      runWithOptionalTransition(() => {
        if (nextQty <= 0) {
          setItems((prev) => prev.filter((item) => item.id !== productId));
          if (product) setLiveMessage(`Retirado ${product.name} de la cesta.`);
        } else {
          setItems((prev) =>
            prev.map((item) =>
              item.id === productId ? { ...item, quantity: nextQty } : item
            )
          );
          if (product) setLiveMessage(`Cantidad de ${product.name}: ${nextQty}.`);
        }
      });
    },
    [runWithOptionalTransition]
  );

  const removeItem = useCallback(
    (productId) => {
      updateQuantity(productId, 0);
    },
    [updateQuantity]
  );

  const clearCart = useCallback(() => {
    runWithOptionalTransition(() => {
      setItems([]);
      setConEstuche(false);
      setDedicatoria('');
    });
    setLiveMessage('Cesta vaciada.');
  }, [runWithOptionalTransition]);

  const detailedItems = useMemo(() => {
    return items
      .map((entry) => {
        const product = ALL_CATALOG_ITEMS[entry.id];
        if (!product) return null;
        return {
          ...product,
          quantity: entry.quantity,
          lineTotal: product.price * entry.quantity,
        };
      })
      .filter(Boolean);
  }, [items]);

  const totalCount = useMemo(
    () => detailedItems.reduce((acc, item) => acc + item.quantity, 0),
    [detailedItems]
  );

  const subtotal = useMemo(
    () => detailedItems.reduce((acc, item) => acc + item.lineTotal, 0),
    [detailedItems]
  );

  const giftWrapCost = detailedItems.length > 0 && conEstuche ? GIFT_BOX.giftWrapPrice : 0;
  const merchTotal = subtotal + giftWrapCost;
  const shippingCost =
    merchTotal === 0 || merchTotal >= SHIPPING_CONFIG.freeThreshold
      ? 0
      : SHIPPING_CONFIG.standardCost;
  const grandTotal = merchTotal + shippingCost;
  const amountToFreeShipping = Math.max(0, SHIPPING_CONFIG.freeThreshold - merchTotal);

  const value = useMemo(
    () => ({
      items: detailedItems,
      totalCount,
      subtotal,
      conEstuche,
      setConEstuche,
      dedicatoria,
      setDedicatoria,
      giftWrapCost,
      shippingCost,
      grandTotal,
      amountToFreeShipping,
      isDrawerOpen,
      setIsDrawerOpen,
      toastMessage,
      setToastMessage,
      liveMessage,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [
      detailedItems,
      totalCount,
      subtotal,
      conEstuche,
      dedicatoria,
      giftWrapCost,
      shippingCost,
      grandTotal,
      amountToFreeShipping,
      isDrawerOpen,
      toastMessage,
      liveMessage,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

