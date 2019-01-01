let data = [
  {
    titile : '10PrintLine',
    demo : 'https://anuraghazra.github.io/CanvasFun/10PrintLine',
    src : 'https://github.com/anuraghazra/CanvasFun/tree/master/10PrintLine',
    img : './thumbnails/10printline_400x400-min.png',
  },
  {
    titile : 'ChaosGame',
    demo : 'https://anuraghazra.github.io/CanvasFun/ChaosGame',
    src : 'https://github.com/anuraghazra/CanvasFun/tree/master/ChaosGame',
    img : './thumbnails/chaosgame_400x400-min.png',
  },
  {
    titile : 'CirclePattern',
    demo : 'https://anuraghazra.github.io/CanvasFun/circlePattern',
    src : 'https://github.com/anuraghazra/CanvasFun/tree/master/circlePattern',
    img : './thumbnails/circlepattern-min.png',
  },
  {
    titile : 'Fireworks',
    demo : 'https://anuraghazra.github.io/CanvasFun/fireworks',
    src : 'https://github.com/anuraghazra/CanvasFun/tree/master/fireworks',
    img : './thumbnails/fireworks_400x400-min.png',
  },
  {
    titile : 'Evolution Aquerium',
    demo : 'https://anuraghazra.github.io/EvolutionAquerium/',
    src : 'https://github.com/anuraghazra/EvolutionAquerium/',
    img : './thumbnails/evolutionAquerium_400x400-min.png',
  },
  {
    titile : 'FractalTree',
    demo : 'https://anuraghazra.github.io/CanvasFun/fractalTree',
    src : 'https://github.com/anuraghazra/CanvasFun/tree/master/fractalTree',
    img : './thumbnails/frataltree_400x400-min.png',
  },
  {
    titile : 'Isometric3D',
    demo : 'https://anuraghazra.github.io/CanvasFun/isometric3D',
    src : 'https://github.com/anuraghazra/CanvasFun/tree/master/isometric3D',
    img : './thumbnails/isometric3d_400x400-min.png',
  },
  {
    titile : 'particleShift',
    demo : 'https://anuraghazra.github.io/CanvasFun/particleShift',
    src : 'https://github.com/anuraghazra/CanvasFun/tree/master/particleShift',
    img : './thumbnails/particleshift_400x400-min.png',
  },
  {
    titile : 'particleSystem',
    demo : 'https://anuraghazra.github.io/CanvasFun/particleSystem',
    src : 'https://github.com/anuraghazra/CanvasFun/tree/master/particleSystem',
    img : './thumbnails/particlesystem_400x400-min.png',
  },
  {
    titile : 'phyllotaxis',
    demo : 'https://anuraghazra.github.io/CanvasFun/phyllotaxis',
    src : 'https://github.com/anuraghazra/CanvasFun/tree/master/phyllotaxis',
    img : './thumbnails/phyllotaxis_400x400-min.gif',
  },
  {
    titile : 'smartRockets',
    demo : 'https://anuraghazra.github.io/CanvasFun/smartRockets',
    src : 'https://github.com/anuraghazra/CanvasFun/tree/master/smartRockets',
    img : './thumbnails/smartrockets400x400-min.png',
  },
  {
    titile : 'snowFlake',
    demo : 'https://anuraghazra.github.io/CanvasFun/snowFlake',
    src : 'https://github.com/anuraghazra/CanvasFun/tree/master/snowFlake',
    img : './thumbnails/snowflake_400x400-min.png',
  },
  {
    titile : 'KochStar',
    demo : 'https://anuraghazra.github.io/CanvasFun/KochStar',
    src : 'https://github.com/anuraghazra/CanvasFun/tree/master/KochStar',
    img : './thumbnails/kochStar_400x400-min.png',
  },
  {
    titile : 'TextParticles',
    demo : 'https://anuraghazra.github.io/CanvasFun/TextParticles',
    src : 'https://github.com/anuraghazra/CanvasFun/tree/master/TextParticles',
    img : './thumbnails/imageParticle_400x400-min.png',
  },
  {
    titile : '7SegmentDisplay',
    demo : 'https://anuraghazra.github.io/CanvasFun/sevenSegmentDisplay',
    src : 'https://github.com/anuraghazra/CanvasFun/tree/master/sevenSegmentDisplay',
    img : './thumbnails/7segment_400x400-min.png',  
  },
];

let fwc_cards = document.getElementById('data-container');
let temp = data.map((i) => {
  return `
  <li class="cards__item">
  <div class="card__body">
    <div class="card__image">
      <img src="${i.img}" alt="">
    </div>
    <div class="card__content">
      <div class="card__title">${i.titile}</div>
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