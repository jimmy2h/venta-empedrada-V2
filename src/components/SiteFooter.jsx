import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { BrandWordmark } from './BrandMark';
import { BRAND_IDENTITY } from '../data/brandContent';
import { CATALOG_CATEGORIES, SHIPPING_CONFIG } from '../data/products';

export function SiteFooter({ activeView, onSelectCategory, onNavigate }) {
  const navigateToSection = (e, sectionId) => {
    if (activeView !== 'tienda') {
      e.preventDefault();
      onNavigate('tienda', sectionId);
    }
  };

  const navigateToCategory = (categoryId) => {
    onSelectCategory(categoryId);
    onNavigate('tienda', 'recomendamos');
  };

  return (
    <footer className="site-footer">
      {/* Fila superior del footer: banda de envío replicando la barra superior de Finca La Barca */}
      <div className="footer-top-strip">
        <div className="container">
          <p>
            Envío Gratuito Península desde <strong>{SHIPPING_CONFIG.freeThreshold} €</strong> · Estándar con caja protectora para vidrio:{' '}
            <strong>{SHIPPING_CONFIG.standardCost.toFixed(2).replace('.', ',')} €</strong> ({SHIPPING_CONFIG.estimatedDays})
          </p>
        </div>
      </div>

      {/* Fila central: 4 columnas estructuradas */}
      <div className="footer-middle-row">
        <div className="container">
          <div className="footer-grid">
            {/* Columna 1: Marca e historia */}
            <div className="footer-col">
              <BrandWordmark showDescriptor inverted />
              <p style={{ maxInlineSize: '36ch', marginBlockStart: '0.45rem', color: 'rgba(244, 240, 231, 0.92)' }}>
                {BRAND_IDENTITY.briefAbout}
              </p>
            </div>

            {/* Columna 2: Nuestros Productos + recuento */}
            <div className="footer-col">
              <h2>Nuestros Productos</h2>
              <ul className="clean-list" role="list">
                {CATALOG_CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button
                      type="button"
                      className="footer-link"
                      onClick={() => navigateToCategory(cat.id)}
                    >
                      <span>{cat.label}</span>
                      <span className="footer-cat-count" aria-hidden="true">
                        {cat.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna 3: Información y Sistema de marca */}
            <div className="footer-col">
              <h2>Información y Marca</h2>
              <ul className="clean-list" role="list">
                <li>
                  <a
                    href="#finca"
                    className="footer-link"
                    onClick={(e) => navigateToSection(e, 'finca')}
                  >
                    Sobre nuestra finca
                  </a>
                </li>
                <li>
                  <a
                    href="#practicas"
                    className="footer-link"
                    onClick={(e) => navigateToSection(e, 'practicas')}
                  >
                    Trazabilidad y prácticas de campo
                  </a>
                </li>
                <li>
                  <a
                    href="#la-mesa-de-la-venta"
                    className="footer-link"
                    onClick={(e) => navigateToSection(e, 'la-mesa-de-la-venta')}
                  >
                    Caja regalo La Mesa de la Venta
                  </a>
                </li>
                <li>
                  <a
                    href="#ideas-mesa"
                    className="footer-link"
                    onClick={(e) => navigateToSection(e, 'ideas-mesa')}
                  >
                    Ideas cotidianas en mesa
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    className="footer-link"
                    onClick={() => onNavigate(activeView === 'identidad' ? 'tienda' : 'identidad')}
                  >
                    {activeView === 'identidad'
                      ? 'Volver a la tienda principal'
                      : 'Manual vivo: sistema de marca'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Columna 4: Información de contacto */}
            <div className="footer-col">
              <h2>Información de contacto</h2>
              <ul className="clean-list" role="list" style={{ display: 'grid', gap: '0.65rem', fontSize: '0.96rem', color: 'rgba(244, 240, 231, 0.92)' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem' }}>
                  <MapPin size={18} aria-hidden="true" style={{ flexShrink: 0, marginBlockStart: '0.2rem' }} />
                  <span>
                    Camino de la Venta s/n
                    <br />
                    Interior de Almería · Andalucía
                  </span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                  <Phone size={17} aria-hidden="true" style={{ flexShrink: 0 }} />
                  <span>+34 950 000 112 (atención demostrativa)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                  <Mail size={17} aria-hidden="true" style={{ flexShrink: 0 }} />
                  <span>hola@ventaempedrada.ejemplo</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem' }}>
                  <Clock size={17} aria-hidden="true" style={{ flexShrink: 0, marginBlockStart: '0.2rem' }} />
                  <span>
                    Lunes a viernes: 9:30–14:00
                    <br />
                    Compra directa o asistida
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <p className="footer-disclaimer">
            <strong>Nota editorial y de proyecto (V2):</strong> Esta versión desarrolla la arquitectura estructural de escaparate y tienda online (cabecera de doble fila con buscador, héroe atmosférico, foco de icono, mosaico asimétrico, recomendaciones de 4 columnas, franja de novedades y pie estructurado) aplicando al 100 % el sistema de marca, productos, tonos (Olivo, Caliza, Miel y Barro) y textos originales de <em>Marca y contenidos · Venta Empedrada</em>. Los datos comerciales, lotes y pasarela representan una simulación creativa académica sin cobros reales.
          </p>

          <div className="footer-bottom">
            <span>
              © 2026 {BRAND_IDENTITY.institutionalName} · Proyecto E-Commerce React V2
            </span>
            <span>
              Identidad coherente · Lectura clara ≥ 18 px · Sin cobros reales
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

