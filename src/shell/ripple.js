/** Material state layer: a ripple that grows from the press point.
 * Mirrors StateLayer.qml — 0.1 opacity, standard easing. */
export function initRipples(root = document) {
  root.addEventListener('pointerdown', (event) => {
    const host = event.target.closest('[data-ripple]');
    if (!host || event.button !== 0) return;

    const rect = host.getBoundingClientRect();
    const size = Math.hypot(rect.width, rect.height) * 1.3;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    Object.assign(ripple.style, {
      width: `${size}px`,
      height: `${size}px`,
      left: `${event.clientX - rect.left - size / 2}px`,
      top: `${event.clientY - rect.top - size / 2}px`,
    });

    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
    host.style.overflow = 'hidden';
    host.append(ripple);
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
  });
}
