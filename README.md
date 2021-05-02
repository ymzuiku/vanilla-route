# vanilla-route

一个极轻量的原生 js 路由，不需要顶层包裹，可以嵌入在局部元素中使用。

体积：gzip < 1kb.

## Install

yarn:

```sh
$ yarn add vanilla-route
```

## API

实力化一个路由对象，当 url 匹配时，会自动渲染

```jsx
import Route from "vanilla-route";

function Page() {
  const view = document.createElement("div");
  view.textContent = "hello";
  return view;
}
const ele = Route({ url: "/url", render: Page });
```

Route.push: 推进一个新页面

```jsx
import Route from "vanilla-route";

Route.push("/url");
```

Route.push 方法推进一个新页面, 并且传递和读取 url 参数

```jsx
Route.push("/url", { name: "hello" });

// url 参数和 Route.state 保持一致
console.log(Route.state);
```

ROute.replace 方法更新当前页面, replace 不会增加 history 的长度

```jsx
Route.replace("/url");
```

Route.back 方法返回上一个页面

```jsx
Route.back();
```

## 在原生 JS 中使用

```js
import Route from "./vanilla-route";

const Foo = () => {
  const ele = document.createElement("div");
  ele.textContent = "foo";
  return ele;
};

const Bar = () => {
  const ele = document.createElement("div");
  ele.textContent = "bar";
  return ele;
};

const buttons = () => {
  const ele = document.createElement("div");
  ["/foo", "/bar"].forEach((v) => {
    const btn = document.createElement("button");
    btn.textContent = "go " + v;
    btn.onclick = () => {
      Route.push(v);
    };
    ele.append(btn);
  });
  return ele;
};

const App = () => {
  const ele = document.createElement("div");
  ele.append(buttons());
  ele.append(Route({ url: "/foo", render: Foo }));
  ele.append(Route({ url: "/bar", render: Bar }));
  return ele;
};

document.body.append(App());
```

## 脱离 URL 的路由

url 可以是一个函数，若返回 true 就会渲染

```jsx
const ele = <Route url={() => user.isVip} render={VipPage} />;
```

## Keep page

去到下级页面后，往往会返回上级页面，我们可以把上级页面缓存起来(仅修改 display: none)，当 Route.back() 后，显示上一页数据，这样可以保留元素原有的状态，包括滚动情况，更贴近移动端体验，并且可以提高返回一页的性能，节约了重新渲染上一页的开销。

注意，当应用层级很深，并且 keep 的页面足够多（大于 10-20 层），页面保持的元素会过多，导致性能下降。

实现以上功能，我们只需要添加 keep 属性:

```jsx
const ele = <Route keep url={() => user.isVip} render={VipPage} />;
```

## Preload page

路由添加 preload 属性后会自动加载组件 chunk 代码。

```jsx
const ele = <Route preload url={() => user.isVip} render={VipPage} />;
```

默认 preload 的延迟加载为 50 ms，我们也可以主动设置一个延迟时间, 单位为 ms:

```jsx
const ele = <Route preload={1000} url={() => user.isVip} render={VipPage} />;
```

我们也可以根据代码逻辑事件主动 preload 某个 url：

```jsx
Route.preload("/the-page");
```

## 维持单一 History 长度

若需要维持单一 History 长度，`Route.onlyReplace = true` 可以把把所有 push 替换为 replace，并且兼容 back.

默认在 iOS 微信 中使用 replace 代替 push，可以保持更沉浸的体验.

```js
// 默认值：
Route.onlyReplace = isIOSWechat;
```

## 以上就是全部，保持简单
