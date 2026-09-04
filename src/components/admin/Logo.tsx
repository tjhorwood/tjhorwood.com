import { Icon } from './Icon.tsx';

// Shown on the Payload login screen and account nav.
export function Logo() {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        gap: '0.75rem',
      }}
    >
      <span style={{ display: 'inline-flex', transform: 'scale(1.6)' }}>
        <Icon />
      </span>
      <span
        style={{
          fontSize: '1.1rem',
          fontWeight: 600,
          letterSpacing: '-0.02em',
        }}
      >
        Taylor Horwood
        <span style={{ opacity: 0.5 }}> · CMS</span>
      </span>
    </div>
  );
}
