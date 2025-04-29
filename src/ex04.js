import "./style.css";

import { Application, Assets, Sprite } from "pixi.js";

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

  bunny.x = 0; //app.screen.width / 2;
  bunny.y = app.screen.height / 2;
  bunny.anchor.set(0.5);
  bunny.scale.set(2);

  app.ticker.add((delta) => {
    // deltaTime은 함수가 실행되는 간격, 디바이스마다 다름
    bunny.x += 2 * delta.deltaTime;
    bunny.rotation += 0.1 * delta.deltaTime;
    if (bunny.x > app.screen.width) {
      bunny.x = 0;
    }
  });
};
