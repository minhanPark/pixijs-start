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
