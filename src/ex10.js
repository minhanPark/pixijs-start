import "./style.css";

import {
  Application,
  AnimatedSprite,
  Assets,
  Texture,
  Rectangle,
  TilingSprite,
} from "pixi.js";
import { sound } from "@pixi/sound";

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

  const bgTexture = await Assets.load("/background.png");
  const bgSprite = new TilingSprite({
    texture: bgTexture,
    width: app.screen.width,
    height: app.screen.height,
  });
  app.stage.addChild(bgSprite);

  const texture = await Assets.load("/Attack.png");
  const frames = Array.from(
    { length: 5 },
    (_, i) =>
      new Texture({
        source: texture,
        frame: new Rectangle(i * 128, 0, 128, 128),
      })
  );
  sound.add("knife-slice", "/knife-slice.mp3");
  const vampire = new AnimatedSprite(frames);

  app.stage.addChild(vampire);

  vampire.animationSpeed = 0.2;
  vampire.loop = false;
  vampire.y = app.screen.height * 0.8;

  vampire.eventMode = "static";
  vampire.cursor = "pointer";
  vampire.on("pointertap", () => {
    // 특정 프레임으로 이동하여 애니메이션 스프라이트 재생을 시작
    vampire.gotoAndPlay(0);
    sound.stop("knife-slice");
    sound.play("knife-slice");
  });
  // 애니메이션 스프라이트 재생이 완료되면 호출할 지정함수
  vampire.onComplete = () => {
    // 애니메이션 스프라이트를 중지하고 특정 프레임으로 이동
    vampire.gotoAndStop(0);
  };

  function adjustTileScale() {
    // 배경 높이를 윈도우 높이만큼 줄 수 있게 스케일 구하는 공식
    const scale = window.innerHeight / bgTexture.height;
    bgSprite.tileScale.set(scale);

    //윈도우 사이즈가 바뀔 때 실행될 수 있게 width와 height를 설정
    bgSprite.width = window.innerWidth;
    bgSprite.height = window.innerHeight;

    vampire.y = app.screen.height * 0.95 - vampire.height;
  }
  adjustTileScale();

  window.addEventListener("resize", adjustTileScale);

  app.ticker.add((delta) => {
    // tilePosition.x를 사용하면 자연스럽게 타일의 위치가 밀린다.
    bgSprite.tilePosition.x -= 1 * delta.deltaTime;
  });
};
