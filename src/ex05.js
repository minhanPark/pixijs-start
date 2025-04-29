import "./style.css";

import { Application, Assets, Graphics, Sprite, Container } from "pixi.js";

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

  const container = new Container();
  app.stage.addChild(container);

  const texture = await Assets.load("https://pixijs.com/assets/bunny.png");
  const bunny = new Sprite(texture);
  //app.stage.addChild(bunny);
  container.addChild(bunny);

  bunny.x = 100;
  bunny.y = 100;
  bunny.anchor.set(0.5);
  bunny.scale.set(2);

  const rect = new Graphics();
  rect.rect(0, 0, 50, 50);
  rect.fill();
  //app.stage.addChild(rect);
  container.addChild(rect);

  container.x = 200;
  container.y = 200;
  app.ticker.add((delta) => {
    container.rotation += 0.1 * delta.deltaTime;
  });
};
