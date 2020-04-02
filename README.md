# vanilla-route

Vanilla route

## Install

unpkg:

```html
<script src="https://unpkg.com/vanilla-route@0.2.0/umd/index.js"></script>
```

npm:

```sh
$ npm install --save vanilla-route
```

## Use

```js
import route from 'vanilla-route';


function Home() {
  return document.createElement('div').textContext('Home Page');
}

function User() {
  return document.createElement('div').textContext('User Page');
}

route.use('/', Home);
route.use('/user', User);
// 根据当前浏览器路由渲染一次路径
route.render();
document.body.append(route.target);

setTimeout(()=>{
  // 进行导航
  route.push('/user');
  route.pop();
  route.replace('/user');
}, 1000);

```
