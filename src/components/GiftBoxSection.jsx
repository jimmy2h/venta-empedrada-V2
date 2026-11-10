import { useId, useState } from 'react';
import { Gift, PackageCheck } from 'lucide-react';
import { GIFT_BOX } from '../data/products';
import { useCart } from '../context/useCart';

export function GiftBoxSection() {
  const { addItem } = useCart();
  const [wantGiftWrap, setWantGiftWrap] = useState(true);
  const [dedicatoriaLocal, setDedicatoriaLocal] = useState('');
  const wrapId = useId();
  const noteId = useId();

  const effectivePrice = GIFT_BOX.price + (wantGiftWrap ? GIFT_BOX.giftWrapPrice : 0);

  const handleChooseBox = () => {
    addItem(GIFT_BOX.id, 1, {
      conEstuche: wantGiftWrap,
      dedicatoria: wantGiftWrap ? dedicatoriaLocal.trim() : '',
      openDrawer: true,
    });
  };

  return (
    <section id="la-mesa-de-la-venta" className="section-pad">
      <div className="container">
        <div className="gift-card-box scroll-reveal">
          <div className="split-grid">
            <div>
              <span className="eyebrow">Colección completa y regalo</span>
              <h2 className="mt-sm">{GIFT_BOX.name}</h2>
              <p
                className="text-serif mt-sm"
                style={{ fontSize: '1.22rem', fontStyle: 'italic', color: 'var(--color-tinta-suave)' }}
              >
                {GIFT_BOX.subtitle} · Tres productos para abrir, probar y compartir.
              </p>

              <p className="prose-measure mt-md">{GIFT_BOX.description}</p>

              <ul
                className="clean-list gift-contents-list"
                role="list"
                aria-label="Contenido exacto de la caja"
              >
                {GIFT_BOX.contents.map((entry) => (
                  <li key={entry.label} className="gift-content-item">
                    <span
                      className="gift-bar"
                      style={{ backgroundColor: entry.accent }}
                      aria-hidden="true"
                    />
                    <div>
                      <strong>{entry.label}</strong>
                      <div className="text-muted" style={{ fontSize: '0.94rem' }}>
                        {entry.detail}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="gift-options-box">
                <label htmlFor={wrapId} className="choice-card-estuche">
                  <input
                    id={wrapId}
                    type="checkbox"
                    checked={wantGiftWrap}
                    onChange={(e) => setWantGiftWrap(e.target.checked)}
                  />
                  <span>
                    Añadir estuche de regalo preparado y tarjeta impresa (+
                    {GIFT_BOX.giftWrapPrice.toFixed(2).replace('.', ',')} €)
                  </span>
                </label>

                {wantGiftWrap && (
                  <div>
                    <div className="field-group" style={{ marginBlockEnd: '0.65rem' }}>
                      <label htmlFor={noteId} className="field-label">
                        Añade una dedicatoria personalizada (opcional)
                      </label>
                      <span className="field-hint">
                        La imprimimos en papel caliza junto a la tarjeta de bienvenida de la finca.
                      </span>
                      <textarea
                        id={noteId}
                        className="field-textarea"
                        maxLength={220}
                        placeholder="Ej.: Para que nunca falten buenos momentos alrededor de vuestra mesa. Un abrazo."
                        value={dedicatoriaLocal}
                        onChange={(e) => setDedicatoriaLocal(e.target.value)}
                      />
                    </div>

                    <div className="dedicatoria-preview">
                      “{dedicatoriaLocal.trim() || GIFT_BOX.welcomeCardText}”
                    </div>
                  </div>
                )}
              </div>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <div>
                  <div
                    className="text-serif"
                    style={{ fontSize: '1.9rem', color: 'var(--color-olivo)', lineHeight: 1.1 }}
                  >
                    {effectivePrice.toFixed(2).replace('.', ',')} €
                  </div>
                  <div className="text-muted" style={{ fontSize: '0.92rem' }}>
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

            <div>
              <figure>
                <div className="gift-media-frame">
                  <img
                    src={GIFT_BOX.image}
                    alt={GIFT_BOX.imageAlt}
                    width="1536"
                    height="1024"
                    loading="lazy"
                  />
                </div>
                <figcaption className="hero-caption">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <PackageCheck size={16} aria-hidden="true" />
                    Caja rígida con separadores protectores y los tres productos reales de la colección.
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

