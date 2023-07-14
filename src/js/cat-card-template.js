export function createMarkup({ url, name, temperament }) {
  return `<article class="card">
    <div class="card-thumb">
      <img class="card-img" src="${url}" alt="${name}">
    </div>
    <div class="card-wrapper">
      <h2 class="card-title">${name}</h2>
      <p class="card-desc">${temperament}</p>
    </div>
  </article>`;
}
