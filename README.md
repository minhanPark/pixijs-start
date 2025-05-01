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

## 그룹화 하기

Container를 통해서 그룹화 할 수 있다.

```js
import { Container } from "pixi.js";

// 컨테이너를 만들고 앱에 추가한다.
const container = new Container();
app.stage.addChild(container);

// app.stage에 추가하는 것이 아니라 컨테이너에 추가한다.
container.addChild(bunny);
container.addChild(rect);
```

컨테이너를 만들어서 만들어진 그래픽이나 스프라이트를 컨테이너에 추가하면 그룹화 할 수 있다.  
그룹화 후에는 컨테이너의 위치를 옮기거나 액션을 줄 수 있다.

## 인터랙션 추가하기

스프라이트와 인터랙션 하기 위해서는 스프라이트의 이벤트 모드를 바꿔줘야 한다.

```js
bunny.eventMode = "static";
bunny.cursor = "pointer";

let scale = 2;
bunny.on("pointertap", () => {
  bunny.scale.set(++scale);
});
```

이벤트 모드를 static 값으로 주면 **객체가 이벤트를 수신하며 이벤트가 해당 객체에서 멈춘다(이벤트 버블링 차단된다.) 클릭, 마우스 오버, 드래그와 같은 상호 작용을 처리할 때 사용하면 된다.**

기본값은 none으로 이벤트를 처리하지 않고, passive는 이벤트를 수신하는데 이벤트 버블링이 허용되서 부모까지 전달이 된다. dynamic은 이벤트를 수신하고, 버블링이 차단되는데 히트 영역이 동적으로 계산된다는데 이건 해봐야 알듯하다.

## 필터 사용하기

필터는 기본적으로 필터를 생성하고 스프라이트에 적용하면 된다.

```js
const bluFilter = new BlurFilter({ strength: 5 });
bunny.filters = bluFilter;
```

다 생성자 함수기 때문에 미리 생성하고 스프라이트의 filters 속성에 넣어주면 된다.

## 스프라이트에 애니메이션 주기

그냥 스프라이트도 있지만 애니메이션을 주려면 AnimatedSprite을 활용해야 하고 sprite sheet를 가지고 있어야한다. 즉 움직임이 연속되게 보일 여러장을 가지고 있어야한다.

```js
const texture = await Assets.load("/Attack.png");

const frames = Array.from(
  { length: 5 },
  (_, i) =>
    new Texture({
      source: texture,
      frame: new Rectangle(i * 128, 0, 128, 128),
    })
);
```

무료 sprite sheet를 가지고와서 프레임에 맞게 잘라주었다.

```js
const vampire = new AnimatedSprite(frames);
app.stage.addChild(vampire);
```

그리고 만들어진 프레임 배열을 AnimatedSprite에 넣어주면 된다. 그리고 app에 추가하자.

```js
// 속도 조절
vampire.animationSpeed = 0.2;
// 반복 중지
vampire.loop = false;
```

기본값이 빠른 속도로 반복되는 것이기 때문에 반복하지 않도록 하고 애니메이션 속도를 낮춰줬다.

```js
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
```

사용자의 인터랙션에 의해서 작동하게 하려면 위처럼 이벤트를 걸어주면 된다.

## 소리 추가하기

강의에서는 new Audio를 사용했는데 나한텐 소리가 안들려서 pixi/sound를 사용했다.

```bash
npm i @pixi/sound
```

위의 명령어로 설치하면 된다.

```js
import { sound } from "@pixi/sound";

sound.add("knife-slice", "/knife-slice.mp3");
```

위와 같은 형태로 소리를 추가할 수 있다.

```js
vampire.on("pointertap", () => {
  // 소리가 중복되서 나타나지 말고 멈췄다가 다시 시작하라는 의미로 넣음
  sound.stop("knife-slice");
  sound.play("knife-slice");
});
```

특정 행동을 할 때 넣으려면 stop과 play를 사용하면 된다.
