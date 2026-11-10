import { useEffect, useId, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Gift,
  Info,
  Package,
  Plus,
  ShoppingBasket,
  Trash2,
  X,
} from 'lucide-react';
import { useCart } from '../context/useCart';
import { GIFT_BOX, PRODUCTS, SHIPPING_CONFIG } from '../data/products';

const formatEuro = (value) => `${value.toFixed(2).replace('.', ',')} €`;

const INITIAL_FORM = {
  name: '',
  email: '',
  tel: '',
  address: '',
  postalCode: '',
};

const VALIDATORS = {
  name: (v) =>
    v.trim().length >= 2
      ? ''
      : 'Escribe tu nombre completo para preparar el paquete.',
  email: (v) => {
    const trimmed = v.trim();
    if (!trimmed) return 'Necesitamos un correo electrónico para enviarte el resumen.';
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
      ? ''
      : 'Revisa el formato del correo electrónico (ej. nombre@correo.es).';
  },
  tel: (v) => {
    const digits = v.replace(/\D/g, '');
    if (!digits) return 'Indica un teléfono de contacto para la entrega.';
    return digits.length >= 9
      ? ''
      : 'El teléfono debe incluir al menos 9 dígitos para el repartidor.';
  },
  address: (v) =>
    v.trim().length >= 8
      ? ''
      : 'Escribe la dirección completa (calle, número, localidad y provincia).',
  postalCode: () => '',
};

export function CartDrawer() {
  const {
    items,
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
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    liveMessage,
  } = useCart();

  const dialogRef = useRef(null);
  const pointerDownOutsideRef = useRef(false);
  const step2HeadingRef = useRef(null);
  const confirmedHeadingRef = useRef(null);

  const [step, setStep] = useState('revisar');
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [completedOrder, setCompletedOrder] = useState(null);

  const drawerTitleId = useId();
  const wrapId = useId();
  const noteId = useId();
  const checkoutFormId = useId();

  const nameId = useId();
  const nameErrId = useId();
  const emailId = useId();
  const emailHintId = useId();
  const emailErrId = useId();
  const telId = useId();
  const telHintId = useId();
  const telErrId = useId();
  const addressId = useId();
  const addressHintId = useId();
  const addressErrId = useId();
  const postalId = useId();
  const postalHintId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isDrawerOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isDrawerOpen && dialog.open) {
      dialog.close();
    }
  }, [isDrawerOpen]);

  useEffect(() => {
    if (step === 'datos') {
      window.requestAnimationFrame(() => {
        step2HeadingRef.current?.focus();
      });
    } else if (step === 'confirmado') {
      window.requestAnimationFrame(() => {
        confirmedHeadingRef.current?.focus();
      });
    }
  }, [step]);

  const handleClose = () => {
    const dialog = dialogRef.current;
    if (dialog) dialog.returnValue = '';
    setIsDrawerOpen(false);
    if (step === 'confirmado') {
      setStep('revisar');
    }
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

  const handleFieldChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: VALIDATORS[field](value) }));
    }
  };

  const handleFieldBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: VALIDATORS[field](formData[field]) }));
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const fieldsOrder = [
      { key: 'name', id: nameId },
      { key: 'email', id: emailId },
      { key: 'tel', id: telId },
      { key: 'address', id: addressId },
    ];

    const nextErrors = {};
    const nextTouched = {};
    let firstInvalidId = null;

    for (const { key, id } of fieldsOrder) {
      nextTouched[key] = true;
      const err = VALIDATORS[key](formData[key]);
      nextErrors[key] = err;
      if (err && !firstInvalidId) {
        firstInvalidId = id;
      }
    }

    setTouched((prev) => ({ ...prev, ...nextTouched }));
    setErrors(nextErrors);

    if (firstInvalidId) {
      document.getElementById(firstInvalidId)?.focus();
      return;
    }

    const orderSnapshot = {
      reference: `VE-V2-${String(Date.now()).slice(-5)}`,
      customerName: formData.name.trim(),
      customerEmail: formData.email.trim(),
      customerAddress: formData.address.trim(),
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        format: item.format,
        quantity: item.quantity,
        lineTotal: item.lineTotal,
      })),
      conEstuche,
      dedicatoria: dedicatoria.trim(),
      shippingCost,
      grandTotal,
    };

    setCompletedOrder(orderSnapshot);
    clearCart();
    setFormData(INITIAL_FORM);
    setTouched({});
    setErrors({});
    setStep('confirmado');
  };

  const hasBox = items.some((item) => item.id === GIFT_BOX.id);
  const showGiftNoteField = conEstuche || hasBox;

  return (
    <dialog
      ref={dialogRef}
      className="drawer-dialog"
      closedby="any"
      aria-labelledby={drawerTitleId}
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
      <div className="dialog-header">
        <div>
          <span className="eyebrow">
            {step === 'datos'
              ? 'Envío desde Almería'
              : step === 'confirmado'
                ? 'Resumen guardado'
                : 'Despensa Venta Empedrada'}
          </span>
          <h2 id={drawerTitleId}>
            {step === 'confirmado'
              ? 'Pedido registrado'
              : `Tu cesta (${totalCount})`}
          </h2>
        </div>

        <button
          type="button"
          className="dialog-close-btn"
          onClick={handleClose}
          aria-label="Cerrar panel de la cesta"
        >
          <X size={20} aria-hidden="true" />
          <span>Cerrar</span>
        </button>
      </div>

      <div className="drawer-body">
        {isDrawerOpen && (
          <div className="visually-hidden" aria-live="polite" aria-atomic="true">
            {liveMessage}
          </div>
        )}

        <div className="drawer-service-banner" role="note">
          <Info size={20} aria-hidden="true" style={{ flexShrink: 0, marginBlockStart: '0.15rem' }} />
          <span>Revisa tu selección y consulta el envío antes de pagar.</span>
        </div>

        {step === 'confirmado' && completedOrder && (
          <div className="status-card">
            <div className="status-card-heading">
              <CheckCircle2 size={24} aria-hidden="true" />
              <h3 ref={confirmedHeadingRef} tabIndex={-1} style={{ color: 'var(--color-exito)' }}>
                Solicitud de pedido registrada
              </h3>
            </div>

            <p>
              Gracias, <strong>{completedOrder.customerName}</strong>. Hemos preparado la vista previa de tu pedido con referencia{' '}
              <strong>{completedOrder.reference}</strong>.
            </p>

            <ul className="clean-list cart-summary-list">
              {completedOrder.items.map((entry) => (
                <li key={entry.id} className="cart-summary-row">
                  <span>
                    {entry.quantity} × {entry.name} ({entry.format})
                  </span>
                  <strong>{formatEuro(entry.lineTotal)}</strong>
                </li>
              ))}
              {completedOrder.conEstuche && (
                <li className="cart-summary-row">
                  <span>Estuche de regalo y tarjeta impresa</span>
                  <strong>{formatEuro(GIFT_BOX.giftWrapPrice)}</strong>
                </li>
              )}
              <li className="cart-summary-row">
                <span>Envío protegido península</span>
                <strong>
                  {completedOrder.shippingCost === 0
                    ? 'Gratis'
                    : formatEuro(completedOrder.shippingCost)}
                </strong>
              </li>
              <li className="cart-summary-total">
                <span>Importe total</span>
                <span>{formatEuro(completedOrder.grandTotal)}</span>
              </li>
            </ul>

            {completedOrder.dedicatoria && (
              <div className="dedicatoria-preview">“{completedOrder.dedicatoria}”</div>
            )}

            <p className="text-muted" style={{ fontSize: '0.92rem' }}>
              Dirección indicada: {completedOrder.customerAddress} · Copia informativa demostrativa para{' '}
              <strong>{completedOrder.customerEmail}</strong> (este prototipo académico no procesa pagos reales).
            </p>
          </div>
        )}

        {step === 'revisar' && items.length === 0 && (
          <div className="empty-cart-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-olivo)' }}>
              <ShoppingBasket size={24} aria-hidden="true" />
              <h3>Tu cesta está vacía</h3>
            </div>
            <p className="text-muted">
              Aún no has añadido ningún producto de la finca. Puedes empezar por el Picual, la miel de romero o la almendra Marcona:
            </p>

            <div>
              <strong style={{ display: 'block', marginBlockEnd: '0.6rem', color: 'var(--color-olivo)' }}>
                Vuelve a tus favoritos
              </strong>
              <div className="quick-fav-grid">
                {PRODUCTS.map((prod) => (
                  <button
                    key={prod.id}
                    type="button"
                    className="btn-quiet"
                    style={{ justifyContent: 'space-between', inlineSize: '100%' }}
                    onClick={() => addItem(prod.id, 1)}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        className="dot-swatch"
                        style={{ backgroundColor: prod.accentColor }}
                        aria-hidden="true"
                      />
                      <span>
                        {prod.name} · {prod.format}
                      </span>
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-olivo)' }}>
                      <Plus size={16} aria-hidden="true" />
                      <span>{formatEuro(prod.price)}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => addItem(GIFT_BOX.id, 1, { conEstuche: true })}
            >
              <Gift size={18} aria-hidden="true" />
              <span>Elegir caja {GIFT_BOX.name} ({formatEuro(GIFT_BOX.price)})</span>
            </button>
          </div>
        )}

        {step === 'revisar' && items.length > 0 && (
          <>
            <div
              style={{
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radio-suave)',
                backgroundColor:
                  amountToFreeShipping === 0 ? 'var(--color-exito-fondo)' : 'var(--color-piedra)',
                color:
                  amountToFreeShipping === 0 ? 'var(--color-exito)' : 'var(--color-tinta)',
                fontSize: '0.95rem',
                fontWeight: 700,
              }}
            >
              {amountToFreeShipping === 0
                ? 'Envío peninsular gratuito incluido en tu pedido.'
                : `Te faltan ${formatEuro(amountToFreeShipping)} para envío gratuito en península (a partir de ${SHIPPING_CONFIG.freeThreshold} €).`}
            </div>

            <ul className="clean-list cart-item-list" aria-label="Productos seleccionados">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="cart-item-row"
                  style={{
                    viewTransitionName: `cart-item-${item.id}`,
                    '--item-accent': item.accentColor || '#293D32',
                  }}
                >
                  <span className="cart-item-accent" aria-hidden="true" />

                  <img
                    src={item.image}
                    alt=""
                    width="180"
                    height="220"
                    className="cart-item-thumb"
                    onError={(e) => {
                      if (item.fallbackImage) e.currentTarget.src = item.fallbackImage;
                    }}
                  />

                  <div className="cart-item-meta">
                    <div className="cart-item-header">
                      <div>
                        <strong style={{ color: 'var(--color-olivo)' }}>{item.name}</strong>
                        <div className="text-muted" style={{ fontSize: '0.9rem' }}>
                          {item.format} · {formatEuro(item.price)} / ud.
                        </div>
                      </div>
                      <strong style={{ color: 'var(--color-olivo)' }}>
                        {formatEuro(item.lineTotal)}
                      </strong>
                    </div>

                    <div className="cart-item-controls">
                      <div className="qty-stepper" aria-label={`Cantidad de ${item.name}`}>
                        <button
                          type="button"
                          className="qty-btn"
                          aria-label={`Reducir cantidad de ${item.name}`}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          −
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          aria-label={`Aumentar cantidad de ${item.name}`}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="cart-remove-btn"
                        aria-label={`Quitar ${item.name} de la cesta`}
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 size={16} aria-hidden="true" />
                        <span>Quitar</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-gift-panel">
              <label htmlFor={wrapId} className="checkbox-row">
                <input
                  id={wrapId}
                  type="checkbox"
                  checked={conEstuche}
                  onChange={(e) => setConEstuche(e.target.checked)}
                />
                <span>
                  Añadir estuche de regalo preparado y tarjeta impresa (+
                  {formatEuro(GIFT_BOX.giftWrapPrice)})
                </span>
              </label>

              {showGiftNoteField && (
                <div className="field-group" style={{ marginBlockEnd: 0 }}>
                  <label htmlFor={noteId} className="field-label">
                    Mensaje de dedicatoria (opcional)
                  </label>
                  <textarea
                    id={noteId}
                    className="field-textarea"
                    maxLength={220}
                    placeholder="Si es para regalar, escribe aquí unas palabras para quien abre la caja."
                    value={dedicatoria}
                    onChange={(e) => setDedicatoria(e.target.value)}
                  />
                </div>
              )}
            </div>
          </>
        )}

        {step === 'datos' && items.length > 0 && (
          <div>
            <button
              type="button"
              className="btn-quiet"
              onClick={() => setStep('revisar')}
              style={{ marginBlockEnd: '1rem' }}
            >
              <ArrowLeft size={17} aria-hidden="true" />
              <span>Volver a revisar tu cesta</span>
            </button>

            <h3 ref={step2HeadingRef} tabIndex={-1} style={{ marginBlockEnd: '0.35rem' }}>
              Paso 2 de 2: Datos para preparar el envío
            </h3>
            <p className="text-muted" style={{ fontSize: '0.94rem', marginBlockEnd: '1rem' }}>
              Sin necesidad de crear contraseña. Los campos marcados con asterisco (
              <span aria-hidden="true">*</span>) son obligatorios.
            </p>

            <form
              id={checkoutFormId}
              onSubmit={handleCheckoutSubmit}
              noValidate
              aria-label="Formulario de datos de envío"
            >
              <fieldset className="checkout-fieldset">
                <legend>Dirección y contacto de entrega</legend>

                <div className="field-group">
                  <label htmlFor={nameId} className="field-label">
                    Nombre completo <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id={nameId}
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleFieldChange('name')}
                    onBlur={handleFieldBlur('name')}
                    aria-invalid={touched.name && Boolean(errors.name) ? 'true' : 'false'}
                    aria-describedby={errors.name ? nameErrId : undefined}
                    className={`field-input ${touched.name && errors.name ? 'user-invalid-fallback' : ''}`}
                    placeholder="Ej.: Antonio Morales Ruiz"
                  />
                  {errors.name && (
                    <div id={nameErrId} className="field-error-msg" data-visible="true">
                      <AlertCircle size={17} aria-hidden="true" />
                      <span>Error: {errors.name}</span>
                    </div>
                  )}
                </div>

                <div className="field-group">
                  <label htmlFor={emailId} className="field-label">
                    Correo electrónico <span aria-hidden="true">*</span>
                  </label>
                  <span id={emailHintId} className="field-hint">
                    Para enviarte el detalle del lote y el aviso de salida de la finca.
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
                    value={formData.email}
                    onChange={handleFieldChange('email')}
                    onBlur={handleFieldBlur('email')}
                    aria-invalid={touched.email && Boolean(errors.email) ? 'true' : 'false'}
                    aria-describedby={errors.email ? `${emailHintId} ${emailErrId}` : emailHintId}
                    className={`field-input ${touched.email && errors.email ? 'user-invalid-fallback' : ''}`}
                    placeholder="nombre@correo.es"
                  />
                  {errors.email && (
                    <div id={emailErrId} className="field-error-msg" data-visible="true">
                      <AlertCircle size={17} aria-hidden="true" />
                      <span>Error: {errors.email}</span>
                    </div>
                  )}
                </div>

                <div className="field-group">
                  <label htmlFor={telId} className="field-label">
                    Teléfono de contacto <span aria-hidden="true">*</span>
                  </label>
                  <span id={telHintId} className="field-hint">
                    Solo para avisos de entrega o dudas sobre tu pedido.
                  </span>
                  <input
                    id={telId}
                    name="tel"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    value={formData.tel}
                    onChange={handleFieldChange('tel')}
                    onBlur={handleFieldBlur('tel')}
                    aria-invalid={touched.tel && Boolean(errors.tel) ? 'true' : 'false'}
                    aria-describedby={errors.tel ? `${telHintId} ${telErrId}` : telHintId}
                    className={`field-input ${touched.tel && errors.tel ? 'user-invalid-fallback' : ''}`}
                    placeholder="600 123 456"
                  />
                  {errors.tel && (
                    <div id={telErrId} className="field-error-msg" data-visible="true">
                      <AlertCircle size={17} aria-hidden="true" />
                      <span>Error: {errors.tel}</span>
                    </div>
                  )}
                </div>

                <div className="field-group">
                  <label htmlFor={addressId} className="field-label">
                    Dirección de entrega <span aria-hidden="true">*</span>
                  </label>
                  <span id={addressHintId} className="field-hint">
                    Calle, número, piso/puerta, localidad y provincia.
                  </span>
                  <textarea
                    id={addressId}
                    name="street-address"
                    autoComplete="street-address"
                    required
                    value={formData.address}
                    onChange={handleFieldChange('address')}
                    onBlur={handleFieldBlur('address')}
                    aria-invalid={touched.address && Boolean(errors.address) ? 'true' : 'false'}
                    aria-describedby={
                      errors.address ? `${addressHintId} ${addressErrId}` : addressHintId
                    }
                    className={`field-textarea ${touched.address && errors.address ? 'user-invalid-fallback' : ''}`}
                    placeholder="Calle Real 14, 2º B, 04002 Almería"
                  />
                  {errors.address && (
                    <div id={addressErrId} className="field-error-msg" data-visible="true">
                      <AlertCircle size={17} aria-hidden="true" />
                      <span>Error: {errors.address}</span>
                    </div>
                  )}
                </div>

                <div className="field-group" style={{ marginBlockEnd: 0 }}>
                  <label htmlFor={postalId} className="field-label">
                    Código postal (opcional)
                  </label>
                  <span id={postalHintId} className="field-hint">
                    Si no lo recuerdas ahora, podemos verificarlo por localidad.
                  </span>
                  <input
                    id={postalId}
                    name="postal-code"
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    maxLength={10}
                    value={formData.postalCode}
                    onChange={handleFieldChange('postalCode')}
                    aria-describedby={postalHintId}
                    className="field-input"
                    placeholder="Ej.: 04002"
                  />
                </div>
              </fieldset>

              <p className="text-muted mt-sm" style={{ fontSize: '0.88rem' }}>
                Demostración de flujo de tienda en React: al confirmar se genera un resumen de prueba sin cobro bancario.
              </p>
            </form>
          </div>
        )}
      </div>

      {step === 'revisar' && items.length > 0 && (
        <div className="drawer-footer">
          <div className="cart-summary-list">
            <div className="cart-summary-row">
              <span>Productos ({totalCount})</span>
              <span>{formatEuro(subtotal)}</span>
            </div>
            {giftWrapCost > 0 && (
              <div className="cart-summary-row">
                <span>Estuche preparado y tarjeta</span>
                <span>{formatEuro(giftWrapCost)}</span>
              </div>
            )}
            <div className="cart-summary-row">
              <span>Envío estimado ({SHIPPING_CONFIG.estimatedDays})</span>
              <span>{shippingCost === 0 ? 'Gratis' : formatEuro(shippingCost)}</span>
            </div>
            <div className="cart-summary-total">
              <span>Total estimado</span>
              <span>{formatEuro(grandTotal)}</span>
            </div>
          </div>

          <div className="cart-actions-stack">
            <button
              type="button"
              className="btn-primary"
              onClick={() => setStep('datos')}
            >
              <Package size={18} aria-hidden="true" />
              <span>Continuar con tus datos</span>
            </button>

            <button type="button" className="btn-quiet" onClick={clearCart}>
              Vaciar
            </button>
          </div>
        </div>
      )}

      {step === 'datos' && items.length > 0 && (
        <div className="drawer-footer">
          <div className="cart-summary-total" style={{ borderBlockStart: 0, paddingBlockStart: 0 }}>
            <span>Importe total (envío incl.)</span>
            <span>{formatEuro(grandTotal)}</span>
          </div>
          <button
            type="submit"
            form={checkoutFormId}
            className="btn-primary"
            style={{ inlineSize: '100%' }}
          >
            <CheckCircle2 size={18} aria-hidden="true" />
            <span>Confirmar pedido ({formatEuro(grandTotal)})</span>
          </button>
        </div>
      )}

      {step === 'confirmado' && (
        <div className="drawer-footer">
          <button
            type="button"
            className="btn-primary"
            style={{ inlineSize: '100%' }}
            onClick={handleClose}
          >
            Seguir explorando la despensa
          </button>
        </div>
      )}
    </dialog>
  );
}
