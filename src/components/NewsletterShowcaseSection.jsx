import { useId, useState } from 'react';
import { AlertCircle, CheckCircle2, Mail, Phone, Truck } from 'lucide-react';
import { SHIPPING_CONFIG } from '../data/products';

export function NewsletterShowcaseSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);

  const [emailTouched, setEmailTouched] = useState(false);
  const [consentTouched, setConsentTouched] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [consentError, setConsentError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const formHeadingId = useId();
  const nameId = useId();
  const emailId = useId();
  const emailHintId = useId();
  const emailErrorId = useId();
  const consentId = useId();
  const consentErrorId = useId();

  const validateEmailValue = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return 'Escribe tu correo electrónico para recibir los avisos de cosecha.';
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!valid) return 'Revisa el formato del correo electrónico (ej. nombre@correo.es).';
    return '';
  };

  const validateConsentValue = (checked) =>
    checked ? '' : 'Marca esta casilla para autorizar el aviso de nuevas cosechas.';

  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailError(validateEmailValue(email));
  };

  const handleEmailChange = (e) => {
    const next = e.target.value;
    setEmail(next);
    if (emailError) {
      setEmailError(validateEmailValue(next));
    }
  };

  const handleConsentChange = (e) => {
    const next = e.target.checked;
    setConsent(next);
    setConsentTouched(true);
    setConsentError(validateConsentValue(next));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errEmail = validateEmailValue(email);
    const errConsent = validateConsentValue(consent);

    setEmailTouched(true);
    setConsentTouched(true);
    setEmailError(errEmail);
    setConsentError(errConsent);

    if (errEmail) {
      document.getElementById(emailId)?.focus();
      return;
    }
    if (errConsent) {
      document.getElementById(consentId)?.focus();
      return;
    }

    setSubmitted(true);
  };

  return (
    <section id="contacto" className="newsletter-dark-band">
      <div className="newsletter-split-layout">
        <div className="newsletter-form-col">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', color: '#edd095' }}>
            <Mail size={20} aria-hidden="true" />
            <span className="eyebrow eyebrow--light">Novedades de cosecha</span>
          </div>

          <h2 id={formHeadingId}>Las noticias de la venta</h2>

          <p className="prose-measure" style={{ color: 'rgba(244, 240, 231, 0.92)' }}>
            Entérate antes que nadie de cada cosecha temprana de Picual, floración de miel de romero, nuevas añadas de Marcona y sugerencias para tu mesa.
          </p>

          {submitted ? (
            <div
              role="status"
              style={{
                backgroundColor: 'var(--color-caliza-clara)',
                border: '2px solid var(--color-miel)',
                borderRadius: 'var(--radio-suave)',
                padding: '1.25rem',
                color: 'var(--color-tinta)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  fontWeight: 700,
                  color: 'var(--color-exito)',
                }}
              >
                <CheckCircle2 size={22} aria-hidden="true" />
                <span>Bienvenido a la mesa de la venta</span>
              </div>
              <p style={{ marginBlockStart: '0.5rem' }}>
                Hemos anotado <strong>{email}</strong>
                {name.trim() ? ` (${name.trim()})` : ''} para avisarte en la próxima cosecha de la finca.
              </p>
              <button
                type="button"
                className="btn-quiet mt-sm"
                onClick={() => {
                  setSubmitted(false);
                  setEmail('');
                  setName('');
                  setConsent(false);
                  setEmailTouched(false);
                  setConsentTouched(false);
                  setEmailError('');
                  setConsentError('');
                }}
              >
                Registrar otra dirección
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate aria-labelledby={formHeadingId}>
              <p style={{ fontSize: '0.92rem', color: 'rgba(244, 240, 231, 0.85)', marginBlockEnd: '0.9rem' }}>
                Los campos marcados con asterisco (<span aria-hidden="true">*</span>) son obligatorios.
              </p>

              <div className="field-group">
                <label htmlFor={nameId} className="field-label">
                  Tu nombre (opcional)
                </label>
                <input
                  id={nameId}
                  name="name"
                  type="text"
                  className="field-input"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej.: Carmen Morales"
                />
              </div>

              <div className="field-group">
                <label htmlFor={emailId} className="field-label">
                  Correo electrónico <span aria-hidden="true">*</span>
                </label>
                <span id={emailHintId} className="field-hint">
                  Solo enviaremos avisos de cosecha y apertura de lotes.
                </span>
                <input
                  id={emailId}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  required
                  value={email}
                  onBlur={handleEmailBlur}
                  onChange={handleEmailChange}
                  aria-invalid={emailTouched && Boolean(emailError) ? 'true' : 'false'}
                  aria-describedby={emailError ? `${emailHintId} ${emailErrorId}` : emailHintId}
                  className={`field-input ${emailTouched && emailError ? 'user-invalid-fallback' : ''}`}
                  placeholder="nombre@correo.es"
                />
                {emailError && (
                  <div id={emailErrorId} className="field-error-msg" data-visible="true">
                    <AlertCircle size={17} aria-hidden="true" />
                    <span>Error: {emailError}</span>
                  </div>
                )}
              </div>

              <div className="field-group">
                <label htmlFor={consentId} className="newsletter-consent-label">
                  <input
                    id={consentId}
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={handleConsentChange}
                    aria-invalid={consentTouched && Boolean(consentError) ? 'true' : 'false'}
                    aria-describedby={consentError ? consentErrorId : undefined}
                  />
                  <span>
                    Acepto recibir avisos estacionales de Venta Empedrada y su nota de privacidad de proyecto <span aria-hidden="true">*</span>
                  </span>
                </label>
                {consentError && (
                  <div id={consentErrorId} className="field-error-msg" data-visible="true">
                    <AlertCircle size={17} aria-hidden="true" />
                    <span>Error: {consentError}</span>
                  </div>
                )}
              </div>

              <button type="submit" className="btn-primary newsletter-btn-submit">
                Suscribirme a las noticias
              </button>
            </form>
          )}

          <div className="newsletter-help-strip">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={17} aria-hidden="true" />
              <span>
                <strong>Compra asistida:</strong> +34 950 000 112 (L–V 9:30–14:00 · demostrativo)
              </span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <Truck size={17} aria-hidden="true" />
              <span>
                Envío estándar protegido {SHIPPING_CONFIG.standardCost.toFixed(2).replace('.', ',')} € · Gratis desde {SHIPPING_CONFIG.freeThreshold} €
              </span>
            </span>
          </div>
        </div>

        <div className="newsletter-photo-col">
          <img
            src="./images/mesa-consumo.png"
            alt="Mesa compartida de Venta Empedrada con tostadas con AOVE Picual, yogur natural con miel de romero y almendras Marcona."
            width="1536"
            height="1024"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

