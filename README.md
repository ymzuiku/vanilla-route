# vanilla-route

Vanilla route

## Install

unpkg:

```html
<script src="https://unpkg.com/vanilla-route@0.1.3/umd/index.js"></script>
```

npm:

```sh
$ npm install --save vanilla-route
```

## Use

```js
import vanillaRoute from 'vanilla-route';

const Route = vanillaRoute.Route;

function Home() {
  return document.createElement('div').textContext('Home Page');
}

function User() {
  return document.createElement('div').textContext('User Page');
}

const root = document.createElement('div');
route.append(Route({ path: '/home', component: Home }), Route({ path: '/user', component: User }));

document.body.append(root);
routeManage.init('/home');
```
