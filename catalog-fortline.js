(function () {
  const root = document.querySelector('#fortline-products');
  const input = document.querySelector('#fortline-search-input');
  const count = document.querySelector('#fortline-result-count');
  const preview = document.querySelector('#catalog-preview');
  const previewImage = document.querySelector('#catalog-preview-image');
  const previewTitle = document.querySelector('#catalog-preview-title');

  if (!root || !input || !Array.isArray(window.FORTLINE_CATALOG)) return;

  function escapeHTML(value) {
    return String(value).replace(/[&<>"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[character]);
  }

  function render(query = '') {
    const normalized = query.trim().toLocaleLowerCase('pt-BR');
    const products = window.FORTLINE_CATALOG.filter((product) => [product.name, product.description].join(' ').toLocaleLowerCase('pt-BR').includes(normalized));
    count.textContent = `${products.length} ${products.length === 1 ? 'produto encontrado' : 'produtos encontrados'}`;
    root.innerHTML = products.map((product, index) => `
      <article class="catalog-product-card">
        <div class="catalog-product-top"><span>${String(index + 1).padStart(2, '0')}</span><small>Fortline</small></div>
        <button class="catalog-product-image" type="button" data-preview-image="${product.image}" data-preview-title="Fortline ${escapeHTML(product.name)}" aria-label="Ampliar visual do produto ${escapeHTML(product.name)}">
          <img src="${product.image}" alt="Visual do produto Fortline ${escapeHTML(product.name)}" loading="lazy" />
          <span>Ampliar visual <b aria-hidden="true">↗</b></span>
        </button>
        <h3>${escapeHTML(product.name)}</h3>
        <p>${escapeHTML(product.description)}</p>
      </article>
    `).join('') || '<p class="catalog-empty">Nenhum produto encontrado. Tente buscar por outro termo.</p>';
  }

  input.addEventListener('input', () => render(input.value));
  root.addEventListener('click', (event) => {
    const button = event.target.closest('[data-preview-image]');
    if (!button || !preview || !previewImage || !previewTitle) return;
    previewImage.src = button.dataset.previewImage;
    previewImage.alt = button.dataset.previewTitle;
    previewTitle.textContent = button.dataset.previewTitle;
    preview.showModal();
  });
  preview?.querySelector('.catalog-preview-close')?.addEventListener('click', () => preview.close());
  preview?.addEventListener('click', (event) => { if (event.target === preview) preview.close(); });
  render();
}());
