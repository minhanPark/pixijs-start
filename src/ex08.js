import "./style.css";

import {
  Application,
  AnimatedSprite,
  Assets,
  Texture,
  Rectangle,
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

  const texture = await Assets.load("/Attack.png");
  const frames = Array.from(
    { length: 5 },
    (_, i) =>
      new Texture({
        source: texture,
        frame: new Rectangle(i * 128, 0, 128, 128),
      })
  );
  const vampire = new AnimatedSprite(frames);

  app.stage.addChild(vampire);

  vampire.animationSpeed = 0.2;
  vampire.loop = false;

  vampire.eventMode = "static";
  vampire.cursor = "pointer";
  vampire.on("pointertap", () => {
    // 특정 프레임으로 이동하여 애니메이션 스프라이트 재생을 시작
    vampire.gotoAndPlay(0);
  });
  // 애니메이션 스프라이트 재생이 완료되면 호출할 지정함수
  vampire.onComplete = () => {
    // 애니메이션 스프라이트를 중지하고 특정 프레임으로 이동
    vampire.gotoAndStop(0);
  };
};
