import { useState } from 'react';
import { QrCode, Sprout } from 'lucide-react';
import { FIELD_PRACTICES } from '../data/brandContent';
import { PRODUCTS } from '../data/products';

export function TraceabilityPracticesSection() {
  const [selectedLotId, setSelectedLotId] = useState(PRODUCTS[0].id);
  const selectedProduct = PRODUCTS.find((p) => p.id === selectedLotId) || PRODUCTS[0];

  return (
    <section id="practicas" className="section-pad">
      <div className="container">
        <div className="split-grid">
          <div>
            <div className="section-header" style={{ marginBlockEnd: '1.5rem' }}>
              <span className="eyebrow">Cuidado de la tierra y transparencia</span>
              <h2>Cuidar la tierra forma parte del trabajo</h2>
              <p className="prose-measure">
                Cultivamos con criterios ecológicos y prácticas regenerativas pensadas para el clima seco de Almería. En cada producto explicamos qué hacemos en el campo y cómo se verifica cada lote.
              </p>
            </div>

            <div className="accordion-group">
              {FIELD_PRACTICES.map((item, idx) => (
                <details
                  key={item.id}
                  name="practicas-venta-empedrada-v2"
                  className="accordion-item"
                  open={idx === 0}
                >
                  <summary>{item.title}</summary>
                  <div className="accordion-content">
                    <p style={{ fontWeight: 700, marginBlockEnd: '0.45rem' }}>{item.summary}</p>
                    <p className="prose-measure text-muted">{item.detail}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>

          <aside
            aria-label="Consulta de trazabilidad por lote"
            style={{
              backgroundColor: 'var(--color-caliza-clara)',
              border: '1.5px solid var(--color-caliza-borde)',
              borderRadius: 'var(--radio-tarjeta)',
              padding: 'clamp(1.35rem, 1rem + 1.5vw, 2.15rem)',
              boxShadow: 'var(--sombra-sutil)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-olivo)' }}>
              <QrCode size={22} aria-hidden="true" />
              <span className="eyebrow" style={{ letterSpacing: '0.06em' }}>
                Consulta de lote y contraetiqueta
              </span>
            </div>

            <h3 className="mt-sm" style={{ marginBlockEnd: '0.75rem' }}>
              Recorrido visible antes de comprar
            </h3>
            <p className="text-muted" style={{ fontSize: '0.98rem', marginBlockEnd: '1rem' }}>
              Selecciona una referencia para consultar los datos de parcela, cosecha y extracción que acompañan al QR de cada envase:
            </p>

            <div
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBlockEnd: '1.25rem' }}
              role="group"
              aria-label="Seleccionar producto para ver su ficha de lote"
            >
              {PRODUCTS.map((prod) => {
                const isActive = prod.id === selectedLotId;
                return (
                  <button
                    key={prod.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setSelectedLotId(prod.id)}
                    className={isActive ? 'btn-primary' : 'btn-quiet'}
                    style={{ padding: '0.45rem 0.9rem', fontSize: '0.96rem' }}
                  >
                    <span
                      className="dot-swatch"
                      style={{
                        backgroundColor: isActive ? '#FAF8F3' : prod.accentColor,
                      }}
                      aria-hidden="true"
                    />
                    <span>{prod.name}</span>
                  </button>
                );
              })}
            </div>

            <div
              style={{
                backgroundColor: 'var(--color-caliza)',
                border: '1px solid var(--color-caliza-borde)',
                borderRadius: 'var(--radio-suave)',
                padding: '1.1rem 1.25rem',
                display: 'grid',
                gap: '0.65rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBlockEnd: '1px solid var(--color-caliza-borde)',
                  paddingBlockEnd: '0.5rem',
                }}
              >
                <strong style={{ color: 'var(--color-olivo)', fontFamily: 'var(--font-marca)' }}>
                  Lote {selectedProduct.traceability.lotCode}
                </strong>
                <span className="pill-status">
                  <Sprout size={15} aria-hidden="true" />
                  <span>{selectedProduct.shortFamily}</span>
                </span>
              </div>

              <dl style={{ display: 'grid', gap: '0.5rem', fontSize: '0.98rem' }}>
                <div>
                  <dt style={{ fontWeight: 700, color: 'var(--color-tinta)' }}>Parcela de origen</dt>
                  <dd className="text-muted">{selectedProduct.traceability.parcel}</dd>
                </div>
                <div>
                  <dt style={{ fontWeight: 700, color: 'var(--color-tinta)' }}>Época de cosecha</dt>
                  <dd className="text-muted">{selectedProduct.traceability.harvestWindow}</dd>
                </div>
                <div>
                  <dt style={{ fontWeight: 700, color: 'var(--color-tinta)' }}>Método y cuidado</dt>
                  <dd className="text-muted">
                    {selectedProduct.traceability.extraction} · {selectedProduct.traceability.stewardship}
                  </dd>
                </div>
              </dl>

              <p
                style={{
                  fontSize: '0.88rem',
                  color: 'var(--color-tinta-suave)',
                  borderBlockStart: '1px dashed var(--color-borde-piedra)',
                  paddingBlockStart: '0.55rem',
                }}
              >
                {selectedProduct.traceability.certificationNote}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

