import { ArrowLeft, Check, Layers, Palette, Type } from 'lucide-react';
import {
  BRAND_IDENTITY,
  BRAND_RULES,
  COLOR_PALETTE_SPEC,
} from '../data/brandContent';
import { EmpedradoSymbol } from './BrandMark';

const PACKAGING_HIERARCHY = [
  {
    level: 'Marca común',
    example: 'VENTA EMPEDRADA',
    note: 'Sello tipográfico Georgia en dos líneas con las tres piedras del camino.',
  },
  {
    level: 'Categoría y familia',
    example: 'El Olivar · El Romeral · El Almendral',
    note: 'Identificación instantánea mediante color de franja (Olivo, Miel o Barro).',
  },
  {
    level: 'Variedad o floración',
    example: 'Picual · Miel de romero · Almendra Marcona',
    note: 'Protagonista en portada de tarjeta y contraetiqueta junto a su uso en mesa.',
  },
  {
    level: 'Formato y lote',
    example: '500 ml / 500 g / 250 g · Código VE-...',
    note: 'Tipografía Calibri/Carlito de alta legibilidad para cantidades y trazabilidad.',
  },
];

export function BrandIdentityView({ onReturnToStore }) {
  return (
    <div className="section-pad">
      <div className="container" style={{ display: 'grid', gap: 'var(--espacio-lg)' }}>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <button
            type="button"
            className="btn-quiet"
            style={{ inlineSize: 'fit-content' }}
            onClick={() => {
              onReturnToStore();
              window.scrollTo({ top: 0 });
            }}
          >
            <ArrowLeft size={18} aria-hidden="true" />
            <span>Volver a la tienda</span>
          </button>

          <span className="eyebrow">Identidad visual y coherencia digital · Proyecto Venta Empedrada V2</span>
          <h1 id="contenido-principal" tabIndex={-1}>
            Por qué una marca coherente sostiene toda la experiencia e-commerce
          </h1>
          <p className="hero-lead prose-measure">
            {BRAND_IDENTITY.briefAbout} En esta versión V2 se adapta la estructura de catálogo de escaparate (cabecera con buscador, héroe atmosférico, mosaico visual y franja oscura de captación) manteniendo íntegramente los cuatro colores, tipografías y tono cercano en segunda persona de{' '}
            <strong>{BRAND_IDENTITY.institutionalName}</strong>.
          </p>
        </div>

        <section className="identity-plate-frame">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBlockEnd: '1rem' }}>
            <div>
              <span className="eyebrow">Documento maestro de identidad</span>
              <h2 id="identidad-lamina-title" style={{ marginBlockStart: '0.25rem' }}>
                Lámina base de logotipo, símbolo y paleta
              </h2>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-olivo)' }}>
              <EmpedradoSymbol width={72} decorative={false} label="Símbolo vectorial interactivo de tres piedras de Venta Empedrada" />
            </div>
          </div>

          <img
            src="./images/lamina-identidad.png"
            alt="Lámina de identidad de Venta Empedrada: logotipo en dos líneas con el símbolo de tres piedras y muestras exactas de los cuatro colores corporativos Olivo (#293D32), Caliza (#F4F0E7), Miel (#BE852C) y Barro (#AB5E43)."
            width="1800"
            height="1000"
          />
          <p className="hero-caption">
            Referencia directa extraída del manual de marca para asegurar continuidad entre envase físico y tienda digital.
          </p>
        </section>

        <section>
          <div className="section-header" style={{ marginBlockEnd: '1.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-olivo)' }}>
              <Palette size={20} aria-hidden="true" />
              <span className="eyebrow">Sistema cromático y contraste WCAG</span>
            </div>
            <h2 id="identidad-paleta-title">Cuatro colores con función clara y contraste verificado</h2>
            <p className="prose-measure">
              No usamos el color de forma decorativa: cada tono identifica una familia de producto y organiza la lectura sobre el lienzo Caliza pensando en usuarios mayores de 50 años.
            </p>
          </div>

          <div className="swatch-grid">
            {COLOR_PALETTE_SPEC.map((swatch) => (
              <article key={swatch.name} className="swatch-card">
                <div
                  className="swatch-chip"
                  style={{ '--swatch-color': swatch.hex }}
                  aria-hidden="true"
                />
                <div className="swatch-info">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem' }}>
                    <h3>{swatch.name}</h3>
                    <code>{swatch.hex}</code>
                  </div>
                  <p style={{ fontSize: '0.96rem' }}>{swatch.role}</p>
                  <p className="text-muted" style={{ fontSize: '0.88rem' }}>
                    <Check size={14} aria-hidden="true" style={{ display: 'inline', verticalAlign: '-2px', marginInlineEnd: '0.3rem' }} />
                    {swatch.contrastNote}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-surface-light" style={{ padding: 'clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem)', borderRadius: 'var(--radio-tarjeta)' }}>
          <div className="split-grid" style={{ alignItems: 'start' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-olivo)' }}>
                <Layers size={20} aria-hidden="true" />
                <span className="eyebrow">Coherencia envase → web</span>
              </div>
              <h2 id="identidad-jerarquia-title" className="mt-sm">
                Jerarquía fija de información
              </h2>
              <p className="prose-measure mt-sm">
                Tanto en el frontal de cada botella, tarro o bolsa como en sus tarjetas React, mantenemos siempre el mismo orden de lectura para reducir dudas al elegir:
              </p>

              <div className="packaging-ladder mt-md" role="list" aria-label="Niveles de jerarquía en etiqueta y web">
                {PACKAGING_HIERARCHY.map((step, index) => (
                  <div key={step.level} className="packaging-step" role="listitem">
                    <span className="packaging-step-num" aria-hidden="true">
                      {index + 1}
                    </span>
                    <div>
                      <strong style={{ color: 'var(--color-olivo)' }}>{step.level}:</strong>{' '}
                      <span style={{ fontWeight: 700 }}>{step.example}</span>
                      <div className="text-muted" style={{ fontSize: '0.92rem' }}>
                        {step.note}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-olivo)' }}>
                <Type size={20} aria-hidden="true" />
                <span className="eyebrow">Tipografía y principios de diseño</span>
              </div>
              <h2 className="mt-sm">Georgia para el carácter, Calibri para la claridad</h2>

              <div style={{ display: 'grid', gap: '1rem', marginBlockStart: '1rem' }}>
                <div className="identity-card">
                  <span className="eyebrow">Titulares · Georgia Regular</span>
                  <div className="text-serif" style={{ fontSize: '2rem', color: 'var(--color-olivo)', lineHeight: 1.15 }}>
                    El sabor de volver a la tierra
                  </div>
                  <p className="text-muted" style={{ fontSize: '0.92rem' }}>
                    Escala fluida entre 32 px y 56 px, peso regular y{' '}
                    <code>text-wrap: balance</code>.
                  </p>
                </div>

                <div className="identity-card">
                  <span className="eyebrow">Lectura y fichas · Calibri / Carlito</span>
                  <p className="prose-measure">
                    Cuerpo mínimo de 18 px, interlineado 1.55, líneas acotadas a 60 caracteres y compatibilidad con escalado del sistema operativo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="section-header" style={{ marginBlockEnd: '1.5rem' }}>
            <span className="eyebrow">Reglas aplicadas en toda la interfaz</span>
            <h2>Cuatro pilares de identidad en código y contenido</h2>
          </div>

          <div className="identity-cards-grid">
            {BRAND_RULES.map((rule) => (
              <article key={rule.title} className="identity-card">
                <h3>{rule.title}</h3>
                <p className="prose-measure">{rule.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-md">
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                onReturnToStore();
                window.scrollTo({ top: 0 });
              }}
            >
              <ArrowLeft size={18} aria-hidden="true" />
              <span>Ver estos principios aplicados en la tienda</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

