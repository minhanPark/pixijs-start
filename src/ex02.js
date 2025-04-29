import "./style.css";

import { Application } from "pixi.js";

export default async () => {
  const app = new Application();

  await app.init({
    background: "royalblue",
    // width: 500,
    // height: 300,
    resizeTo: window,
  });

  app.canvas.id = "app-canvas";

  document.body.appendChild(app.canvas);
};
