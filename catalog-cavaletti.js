(function () {
  const root = document.querySelector('#cavaletti-products');
  const input = document.querySelector('#catalog-search-input');
  const count = document.querySelector('#catalog-result-count');
  const preview = document.querySelector('#catalog-preview');
  const previewImage = document.querySelector('#catalog-preview-image');
  const previewTitle = document.querySelector('#catalog-preview-title');

  if (!root || !input || !Array.isArray(window.CAVALLETTI_CATALOG)) return;

  const descriptions = {
    Connect: 'Linha modular para composições versáteis em ambientes de trabalho e convivência.',
    Duo: 'Soluções de assento para áreas coletivas, espera e ambientes corporativos.',
    Leef: 'Linha de design contemporâneo pensada para complementar espaços corporativos.',
    Stilo: 'Cadeiras com opções de revestimento, mecanismos e ajustes para diferentes rotinas.',
    Talk: 'Soluções para colaboração, salas de reunião e pontos de encontro.',
  };

  const usedCodes = new Set();
  const products = window.CAVALLETTI_CATALOG.map((product) => ({
    ...product,
    description: descriptions[product.name] || product.description,
    codes: product.codes.filter((code) => {
      if (usedCodes.has(code)) return false;
      usedCodes.add(code);
      return true;
    }),
  }));

  function escapeHTML(value) {
    return String(value).replace(/[&<>"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[character]);
  }

  function imageFor(name) {
    const special = { 'Vélo': 'assets/catalogo-cavaletti/vlo-1.jpg', Float: 'assets/catalogo-cavaletti/float-01.jpg' };
    if (special[name]) return special[name];
    const slug = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').replace(/[;\s]+/g, '-');
    return `assets/catalogo-cavaletti/${slug}-1.jpg`;
  }

  function imageForModel(product) {
    return product.code && product.code !== '3.000' && product.code !== '6.000'
      ? `assets/catalogo-cavaletti/modelos/${product.code}.jpg`
      : imageFor(product.name);
  }

  function render(query = '') {
    const normalized = query.trim().toLocaleLowerCase('pt-BR');
    const categories = products.map((product) => ({
      ...product,
      models: (product.codes.length ? product.codes : ['']).map((code) => ({ ...product, code }))
        .filter((model) => [model.name, model.description, model.code].join(' ').toLocaleLowerCase('pt-BR').includes(normalized)),
    })).filter((product) => product.models.length);
    const totalModels = categories.reduce((total, category) => total + category.models.length, 0);

    count.textContent = `${categories.length} ${categories.length === 1 ? 'categoria' : 'categorias'} · ${totalModels} ${totalModels === 1 ? 'modelo' : 'modelos'}`;
    root.innerHTML = categories.map((category, index) => `
      <details class="catalog-category" ${normalized ? 'open' : ''}>
        <summary>
          <span class="catalog-category-number">${String(index + 1).padStart(2, '0')}</span>
          <span class="catalog-category-copy"><small>Linha Cavaletti</small><strong>${escapeHTML(category.name)}</strong></span>
          <span class="catalog-category-total">${category.models.length} ${category.models.length === 1 ? 'modelo' : 'modelos'} <b aria-hidden="true">+</b></span>
        </summary>
        <div class="catalog-model-grid">
          ${category.models.map((product) => `
            <article class="catalog-product-card">
              <div class="catalog-product-top"><small>Cavaletti ${escapeHTML(product.name)}</small></div>
              <button class="catalog-product-image" type="button" data-preview-image="${imageForModel(product)}" data-preview-title="Cavaletti ${escapeHTML(product.name)}${product.code ? ` · ${escapeHTML(product.code)}` : ''}" aria-label="Ampliar visual do modelo ${escapeHTML(product.name)} ${escapeHTML(product.code)}">
                <img src="${imageForModel(product)}" alt="Visual do modelo Cavaletti ${escapeHTML(product.name)} ${escapeHTML(product.code)}" loading="lazy" />
                <span>Ampliar visual <b aria-hidden="true">↗</b></span>
              </button>
              <h3>${product.code ? escapeHTML(product.code) : escapeHTML(product.name)}</h3>
              <p>${escapeHTML(product.description)}</p>
            </article>
          `).join('')}
        </div>
      </details>
    `).join('') || '<p class="catalog-empty">Nenhuma categoria encontrada. Tente buscar pelo nome da linha ou código.</p>';
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
