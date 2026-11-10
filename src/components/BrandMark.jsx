/**
 * Logotipo tipográfico en dos líneas (Georgia) y símbolo del empedrado (3 piedras en perspectiva).
 */

export function EmpedradoSymbol({
  width = 76,
  decorative = true,
  inverted = false,
  label = 'Símbolo de tres piedras de Venta Empedrada',
}) {
  const height = Math.round(width * 0.44);
  const topFill = inverted ? '#354D3F' : 'var(--color-caliza-clara, #FAF8F3)';
  const leftFill = inverted ? '#1D2C24' : 'var(--color-piedra, #E6DFD1)';
  const frontFill = inverted ? '#293D32' : 'var(--color-caliza, #F4F0E7)';

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 180 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={decorative ? 'true' : undefined}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : label}
    >
      <g stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round">
        <polygon points="10,48 44,41 64,53 30,61" fill={topFill} />
        <polygon points="10,48 30,61 30,71 10,58" fill={leftFill} />
        <polygon points="30,61 64,53 64,63 30,71" fill={frontFill} />
      </g>

      <g stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round">
        <polygon points="64,32 96,25 116,37 84,45" fill={topFill} />
        <polygon points="64,32 84,45 84,54 64,41" fill={leftFill} />
        <polygon points="84,45 116,37 116,46 84,54" fill={frontFill} />
      </g>

      <g stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round">
        <polygon points="116,16 146,10 166,21 136,28" fill={topFill} />
        <polygon points="116,16 136,28 136,36 116,24" fill={leftFill} />
        <polygon points="136,28 166,21 166,29 136,36" fill={frontFill} />
      </g>
    </svg>
  );
}

export function BrandWordmark({ showDescriptor = true, compact = false, inverted = false }) {
  const lockupClass = [
    'brand-lockup',
    compact ? 'brand-lockup--compact' : '',
    inverted ? 'brand-lockup--inverted' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={lockupClass}>
      <EmpedradoSymbol width={compact ? 54 : 68} decorative inverted={inverted} />
      <span className="brand-lockup-text">
        <span className="brand-lockup-title">
          VENTA
          <br />
          EMPEDRADA
        </span>
        {showDescriptor && (
          <span className="brand-lockup-sub">Despensa de Finca · Almería</span>
        )}
      </span>
    </span>
  );
}

