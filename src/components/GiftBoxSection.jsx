import { useEffect, useId, useRef, useState } from 'react';
import { Gift, PackageCheck, PenLine, X } from 'lucide-react';
import { GIFT_BOX } from '../data/products';
import { useCart } from '../context/useCart';

export function GiftBoxSection() {
  const { addItem } = useCart();
  const [dedicatoriaLocal, setDedicatoriaLocal] = useState('');
  const [isDedicationOpen, setIsDedicationOpen] = useState(false);

  const dialogRef = useRef(null);
  const pointerDownOutsideRef = useRef(false);

  const dialogTitleId = useId();
  const noteId = useId();
  const noteHintId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isDedicationOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isDedicationOpen && dialog.open) {
      dialog.close();
    }
  }, [isDedicationOpen]);

  const handleCloseDedication = () => {
    const dialog = dialogRef.current;
    if (dialog) dialog.returnValue = '';
    setIsDedicationOpen(false);
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

  const needsClosedByFallback = () =>
    typeof HTMLDialogElement !== 'undefined' && !('closedBy' in HTMLDialogElement.prototype);

  const handleChooseBox = () => {
    addItem(GIFT_BOX.id, 1, {
      dedicatoria: dedicatoriaLocal.trim(),
      openDrawer: true,
    });
  };

  return (
    <section id="la-mesa-de-la-venta" className="section-pad gift-showcase-section">
      <div className="container">
        <div className="gift-card-box scroll-reveal">
          <div className="split-grid gift-split-grid">
            <div className="gift-content-col">
              <div className="gift-copy-block">
                <span className="eyebrow gift-eyebrow">Colección completa y regalo</span>
                <h2 className="gift-title">{GIFT_BOX.name}</h2>
                <p className="text-serif gift-subtitle">
                  {GIFT_BOX.subtitle} · Tres productos para abrir, probar y compartir.
                </p>

                <p className="prose-measure gift-description">{GIFT_BOX.description}</p>
              </div>

              <ul
                className="clean-list gift-contents-list"
                role="list"
                aria-label="Contenido exacto de la caja"
              >
                {GIFT_BOX.contents.map((entry) => (
                  <li key={entry.label} className="gift-content-item">
                    <strong>{entry.label}</strong>
                    <span className="text-muted gift-content-detail">{entry.detail}</span>
                  </li>
                ))}
              </ul>

              <div className="gift-options-box">
                <button
                  type="button"
                  className="btn-secondary gift-dedication-trigger"
                  onClick={() => setIsDedicationOpen(true)}
                >
                  <span className="gift-dedication-label">
                    <PenLine size={18} aria-hidden="true" />
                    <span>Añade una dedicatoria personalizada</span>
                  </span>
                  <span className="gift-free-badge">gratis</span>
                </button>

                {dedicatoriaLocal.trim() && (
                  <p className="gift-dedication-summary">
                    Dedicatoria guardada: “{dedicatoriaLocal.trim()}”
                  </p>
                )}
              </div>

              <div className="gift-cta-row">
                <div>
                  <div className="text-serif gift-price">
                    {GIFT_BOX.price.toFixed(2).replace('.', ',')} €
                  </div>
                  <div className="text-muted gift-format-note">
                    {GIFT_BOX.format} · Ahorro en lote (suelto:{' '}
                    {GIFT_BOX.individualTotal.toFixed(2).replace('.', ',')} €)
                  </div>
                </div>

                <button type="button" className="btn-primary" onClick={handleChooseBox}>
                  <Gift size={20} aria-hidden="true" />
                  <span>Elegir mi caja</span>
                </button>
              </div>
            </div>

            <div className="gift-media-col">
              <figure className="gift-media-figure">
                <div className="gift-media-frame">
                  <img
                    src={GIFT_BOX.image}
                    alt={GIFT_BOX.imageAlt}
                    width="1536"
                    height="1024"
                    loading="lazy"
                  />
                </div>
                <figcaption className="hero-caption gift-media-caption">
                  <span className="gift-media-caption-inner">
                    <PackageCheck size={16} aria-hidden="true" />
                    <span>
                      Caja rígida con separadores protectores y los tres productos reales de la colección.
                    </span>
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="dedication-dialog"
        closedby="any"
        aria-labelledby={dialogTitleId}
        onClose={handleCloseDedication}
        onPointerDown={(e) => {
          if (!needsClosedByFallback()) return;
          pointerDownOutsideRef.current = isOutsideDialog(e, e.currentTarget);
        }}
        onPointerUp={(e) => {
          if (!needsClosedByFallback()) return;
          if (pointerDownOutsideRef.current && isOutsideDialog(e, e.currentTarget)) {
            handleCloseDedication();
          }
          pointerDownOutsideRef.current = false;
        }}
      >
        {isDedicationOpen && (
          <div>
            <div className="dialog-header">
              <div>
                <span className="eyebrow" style={{ fontSize: '0.84rem' }}>
                  Tarjeta impresa · Gratis
                </span>
                <h2 id={dialogTitleId} style={{ fontSize: '1.5rem' }}>
                  Añade una dedicatoria personalizada
                </h2>
              </div>

              <button
                type="button"
                className="dialog-close-btn"
                onClick={handleCloseDedication}
                aria-label="Cerrar ventana de dedicatoria"
              >
                <X size={20} aria-hidden="true" />
                <span>Cerrar</span>
              </button>
            </div>

            <form method="dialog" className="dedication-dialog-body">
              <div className="field-group" style={{ marginBlockEnd: 0 }}>
                <label htmlFor={noteId} className="field-label">
                  Tu mensaje en papel caliza
                </label>
                <span id={noteHintId} className="field-hint">
                  La imprimimos en papel caliza junto a la tarjeta de bienvenida de la finca.
                </span>
                <textarea
                  id={noteId}
                  autoFocus
                  className="field-textarea"
                  maxLength={220}
                  aria-describedby={noteHintId}
                  placeholder="Ej.: Para que nunca falten buenos momentos alrededor de vuestra mesa. Un abrazo."
                  value={dedicatoriaLocal}
                  onChange={(e) => setDedicatoriaLocal(e.target.value)}
                />
              </div>

              <div className="dedicatoria-preview">
                “{dedicatoriaLocal.trim() || GIFT_BOX.welcomeCardText}”
              </div>

              <div className="dedication-dialog-actions">
                {dedicatoriaLocal.trim() && (
                  <button
                    type="button"
                    className="btn-quiet"
                    onClick={() => setDedicatoriaLocal('')}
                  >
                    Borrar texto
                  </button>
                )}
                <button type="submit" className="btn-primary">
                  Guardar dedicatoria
                </button>
              </div>
            </form>
          </div>
        )}
      </dialog>
    </section>
  );
}

