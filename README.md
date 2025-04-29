# PIXI.js

## 시작하기

```bash
npx create-vite@latest
```

vite로 바닐라 자바스크립트 프로젝트를 만들고 거기에 아래 명령어로 pixi.js를 설치했다.

```bash
npm i pixi.js
```

## 기본 구조

```javascript
import * as PIXI from "pixi.js";

(async () => {
  const app = new PIXI.Application();

  # 초기화 함수
  await app.init({
    background: "royalblue",
    // 사이즈를 window 창에 맞춰준다.
    resizeTo: window,
  });

  # 아이디 설정
  # 다른 옵션도 들어갈 수 있는 것 같음
  app.canvas.id = "app-canvas";

  document.body.appendChild(app.canvas);
})();
```

기본적으로 모듈 PIXI에서 Application을 불러와서 app에 클래스를 생성한다.  
그리고 init을 통해 초기화할 수 있다. init은 비동기 함수로 await를 사용해야 하기 때문에 즉시 실행함수를 통해서 구현하는게 기본적인 구조가 된다.

id 등 캔버스에 관련된 옵션도 설정하고 body에 캔버스를 app.canvas를 통해 만들어진 캔버스를 전달해주면 기본 구조가 된다.

캔버스의 크기를 width 또는 height로 설정할 수 있는데, resizeTo에 window 값을 사용하면 인터넷 창 크기에 자동으로 맞춰준다.

## Asset을 통해 Sprite 만들기

```javascript
import { Assets, Sprite } from "pixi.js";

const texture = await Assets.load("https://pixijs.com/assets/bunny.png");
const bunny = new Sprite(texture);
app.stage.addChild(bunny);
// x,y 값을 pixel 값으로 줄 수도 있다.
//   bunny.x = 100;
//   bunny.y = 200;
// 스크린의 크기를 받아와서 가운데 위치시킬 수도 있다.
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;
// origin을 가운데로 설정
bunny.anchor.set(0.5);
// 만든 sprite의 크기를 크게 한다.
bunny.scale.set(3);
```

assets 등의 자료를 불러오려면 Assets을 불러와서 load를 사용하면 된다. (공식문서를 잠깐 읽어보니 같은 주소에 대해선 캐싱을 해주고, 뒤에 확장자가 없으면 다른걸 사용해야 하는 것 같다.)  
불러온 texture를 sprite 객체에 넣어주면 스프라이트가 만들어진다.(pixi.js에서 sprite는 2d그래픽 객체라고 생각하면 될 것 같다.)

## Graphics를 통해 도형 만들기

```js
import { Graphics } from "pixi.js";

const border = new Graphics();
border.rect(50, 200, 100, 100);
border.fill("orange");
app.stage.addChild(border);

const line = new Graphics();
line.moveTo(0, 100);
line.lineTo(app.screen.width, 100);
line.stroke({
  color: "#fff",
  width: 5,
});
app.stage.addChild(line);
```

기본적인 형태를 만든다음 app.stage.addChild를 통해서 만든 그래픽을 추가할 수 있다.

## 그래픽 해상도 설정 추가하기

좋은 디스플레이들은 해상도가 좋다. 기본적으로 이미지 최적화 할 때 2배 크기로 불러온다음 크기만 1/2로 줄여서 최적화를 한다. 캔버스에도 해상도를 설정할 수 있는 옵션이 있다.

```js
await app.init({
  background: "royalblue",
  resizeTo: window,
  // 해상도를 조절하는 옵션인데 window.devicePixelRatio을 주면 현재 창에서 가능한 해상도로 설정해준다.
  resolution: window.devicePixelRatio || 1,
  // 해상도가 커진만큼 크기도 2배가 되는데, 원래 있어야할 크기로 자동 조절 해준다.
  autoDensity: true,
});
```

window.devicePixelRatio을 맥북프로에서 사용해보니 2가 나오고 다른 모니터에서 사용해보니 1이 나왔다.

## 애니메이션 추가하기

app.ticker.add는 계속 반복해서 실행되는 함수인데 여기에서 애니메이션을 추가할 수 있다.

```js
app.ticker.add((delta) => {
  // deltaTime은 함수가 실행되는 간격, 디바이스마다 다름
  bunny.x += 2 * delta.deltaTime;
  bunny.rotation += 0.1 * delta.deltaTime;
  if (bunny.x > app.screen.width) {
    bunny.x = 0;
  }
});
```

기계마다 함수를 실행시킬 수 있는 속도가 다른데 그걸 deltaTime으로 보정해준다.(deltaTime은 실행 간격을 나타내는 값인데 빠르게 실행되면 상수값에 곱해서 값을 줄여주고, 느리게 실행되면 상수값에 곱해서 값을 늘려주면 사용자가 느껴지는 속도는 비슷해진다.)
