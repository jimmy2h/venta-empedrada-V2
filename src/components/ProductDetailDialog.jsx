import { useEffect, useRef, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useCart } from '../context/useCart';

const formatEuro = (value) => `${value.toFixed(2).replace('.', ',')} €`;

export function ProductDetailDialog({ product, onClose }) {
  const dialogRef = useRef(null);
  const pointerDownOutsideRef = useRef(false);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    setQty(1);
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (product && !dialog.open) {
      dialog.showModal();
    } else if (!product && dialog.open) {
      dialog.close();
    }
  }, [product]);

  const handleClose = () => {
    const dialog = dialogRef.current;
    if (dialog) dialog.returnValue = '';
    onClose();
  };

  const isOutsideDialog = (e, dialog) => {
    const rect = dialog.getBoundingClientRect();
    return (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    );
  };

  const isGiftBox = Boolean(product?.contents);

  return (
    <dialog
      ref={dialogRef}
      className="detail-dialog"
      closedby="any"
      aria-labelledby="detail-dialog-title"
      onClose={handleClose}
      onCancel={(e) => {
        e.preventDefault();
        handleClose();
      }}
      onPointerDown={(e) => {
        pointerDownOutsideRef.current = isOutsideDialog(e, e.currentTarget);
      }}
      onPointerUp={(e) => {
        if (pointerDownOutsideRef.current && isOutsideDialog(e, e.currentTarget)) {
          handleClose();
        }
        pointerDownOutsideRef.current = false;
      }}
    >
      {product && (
        <div>
          <div className="dialog-header">
            <div>
              <span className="eyebrow" style={{ fontSize: '0.84rem' }}>
                {product.shortFamily} · {product.format}
              </span>
              <h2 id="detail-dialog-title" style={{ fontSize: '1.65rem' }}>
                {product.name}
              </h2>
            </div>

            <button
              type="button"
              className="dialog-close-btn"
              onClick={handleClose}
              aria-label="Cerrar ficha del producto"
            >
              <X size={20} aria-hidden="true" />
              <span>Cerrar</span>
            </button>
          </div>

          <div style={{ padding: '1.4rem' }}>
            <div className="split-grid" style={{ gap: '1.75rem', alignItems: 'start' }}>
              <div>
                <div
                  style={{
                    position: 'relative',
                    backgroundColor: '#ffffff',
                    borderRadius: 'var(--radio-suave)',
                    overflow: 'hidden',
                    border: '1px solid var(--color-caliza-borde)',
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    width="900"
                    height="900"
                    style={{ inlineSize: '100%', aspectRatio: '1 / 1', objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.src = product.fallbackImage;
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      insetBlockEnd: 0,
                      insetInline: 0,
                      blockSize: '6px',
                      backgroundColor: product.accentColor,
                    }}
                    aria-hidden="true"
                  />
                </div>
                <p className="text-muted mt-sm" style={{ fontSize: '0.92rem' }}>
                  {product.containerType || product.tagline}
                </p>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                <p
                  className="text-serif"
                  style={{ fontStyle: 'italic', fontSize: '1.18rem', color: 'var(--color-olivo)' }}
                >
                  {product.subtitle}
                </p>

                <p>{product.description}</p>

                {isGiftBox ? (
                  <div
                    style={{
                      backgroundColor: 'var(--color-caliza-clara)',
                      border: '1px solid var(--color-caliza-borde)',
                      borderRadius: 'var(--radio-suave)',
                      padding: '1rem',
                    }}
                  >
                    <strong style={{ color: 'var(--color-olivo)' }}>
                      Contenido de la caja completa
                    </strong>
                    <ul style={{ marginBlockStart: '0.5rem', paddingInlineStart: '1.2rem' }}>
                      {product.contents.map((item) => (
                        <li key={item.label}>
                          <strong>{item.label}:</strong> {item.detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        backgroundColor: 'var(--color-caliza-clara)',
                        border: '1px solid var(--color-caliza-borde)',
                        borderRadius: 'var(--radio-suave)',
                        padding: '1rem',
                      }}
                    >
                      <strong style={{ color: 'var(--color-olivo)' }}>Perfil sensorial de cata</strong>
                      <dl style={{ display: 'grid', gap: '0.4rem', marginBlockStart: '0.5rem', fontSize: '0.96rem' }}>
                        <div>
                          <dt style={{ display: 'inline', fontWeight: 700 }}>Intensidad: </dt>
                          <dd style={{ display: 'inline', marginInlineStart: 0 }}>{product.sensoryProfile.intensidad}</dd>
                        </div>
                        <div>
                          <dt style={{ display: 'inline', fontWeight: 700 }}>Aromas: </dt>
                          <dd style={{ display: 'inline', marginInlineStart: 0 }}>{product.sensoryProfile.aromas}</dd>
                        </div>
                        <div>
                          <dt style={{ display: 'inline', fontWeight: 700 }}>En boca: </dt>
                          <dd style={{ display: 'inline', marginInlineStart: 0 }}>{product.sensoryProfile.enBoca}</dd>
                        </div>
                      </dl>
                    </div>

                    <div>
                      <strong style={{ color: 'var(--color-olivo)' }}>Tres ideas sencillas para tu mesa</strong>
                      <ul style={{ marginBlockStart: '0.4rem', paddingInlineStart: '1.2rem' }}>
                        {product.usageIdeas.map((idea) => (
                          <li key={idea}>{idea}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                <div
                  style={{
                    borderBlockStart: '1px solid var(--color-caliza-borde)',
                    paddingBlockStart: '1rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                  }}
                >
                  <div>
                    <div className="shop-card-price">{formatEuro(product.price * qty)}</div>
                    <div className="text-muted" style={{ fontSize: '0.9rem' }}>
                      {product.traceability
                        ? `Lote ${product.traceability.lotCode}`
                        : product.unitMeasureLabel}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="qty-stepper" aria-label="Cantidad a añadir">
                      <button
                        type="button"
                        className="qty-btn"
                        aria-label="Reducir cantidad"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                      >
                        −
                      </button>
                      <span className="qty-value">{qty}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        aria-label="Aumentar cantidad"
                        onClick={() => setQty((q) => q + 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() => {
                        addItem(product.id, qty, {
                          openDrawer: true,
                          ...(isGiftBox ? { conEstuche: true } : {}),
                        });
                        handleClose();
                      }}
                    >
                      <Plus size={18} aria-hidden="true" />
                      <span>{product.ctaLabel}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

