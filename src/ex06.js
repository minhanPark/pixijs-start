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

  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;
  bunny.anchor.set(0.5);
  bunny.scale.set(2);

  bunny.eventMode = "static";
  bunny.cursor = "pointer";

  let scale = 2;
  bunny.on("pointertap", () => {
    bunny.scale.set(++scale);
  });
};
