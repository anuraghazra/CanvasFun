let data = null;

fetch('./data.json')
  .then(res => res.json())
  .then(result => {
    data = result;
    loadCards();
  })

// NOTE
// i'm gonna parse the url so my websites json data is not effected;
function loadCards() {
  let fwc_cards = document.getElementById('data-container');
  let temp = data.map((i) => {
    return `
    <li class="cards__item">
    <div class="card__body">
      <div class="card__image">
        <img src="${i.img.replace('https:/anuraghazra.github.io/CanvasFun', '.')}" alt="">
      </div>
      <div class="card__content">
        <div class="card__title">${i.title}</div>
        <div class="card__links">
          <a class="card__btn" href="${i.demo}" target="_blank">
            <span>Live Demo</span>
          </a>
          <a class="card__btn" href="${i.src}"
            target="_blank">
            <span>Source Code</span>
          </a>
        </div>
      </div>
    </div>
  </li>
  `
  });
  fwc_cards.innerHTML = temp.join('');
}
