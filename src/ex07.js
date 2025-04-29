import "./style.css";

import {
  Application,
  Assets,
  Sprite,
  BlurFilter,
  ColorMatrixFilter,
  DisplacementFilter,
  AlphaFilter,
  NoiseFilter,
} from "pixi.js";

export default async () => {
  const app = new Application();

  await app.init({
    background: "royalblue",
    resizeTo: window,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
  });

  app.canvas.id = "app-canvas";

  document.body.appendChild(app.canvas);

  const texture = await Assets.load("https://pixijs.com/assets/bunny.png");
  const bunny = new Sprite(texture);
  app.stage.addChild(bunny);

  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;
  bunny.anchor.set(0.5);
  bunny.scale.set(2);

  //   const bluFilter = new BlurFilter({strength: 5});
  //   bunny.filters = bluFilter;

  const colorMatrix = new ColorMatrixFilter();
  colorMatrix.hue(Math.random() * 360);

  const filterSpriteTexture = await Assets.load(
    "https://pixijs.com/assets/tutorials/fish-pond/displacement_map.png"
  );
  const filterSprite = new Sprite(filterSpriteTexture);

  const filters = [
    new BlurFilter({ strength: 5 }),
    colorMatrix,
    new DisplacementFilter(filterSprite),
    new AlphaFilter({ alpha: 0.3 }),
    new NoiseFilter({ noise: 0.5 }),
  ];

  bunny.filters = filters[2];
};
