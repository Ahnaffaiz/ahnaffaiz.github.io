/** Tiny DOM helpers shared by the shell modules. */

/** Builds an element tree from a template string. */
export function html(strings, ...values) {
  const markup = String.raw({ raw: strings }, ...values);
  const template = document.createElement('template');
  template.innerHTML = markup.trim();
  return template.content.children.length === 1
    ? template.content.firstElementChild
    : template.content;
}

/** Escapes interpolated text so content can never inject markup. */
export function esc(value) {
  return String(value).replace(
    /[&<>"']/g,
    (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch],
  );
}

export const icon = (name) => `<span class="material-symbols-rounded">${esc(name)}</span>`;
