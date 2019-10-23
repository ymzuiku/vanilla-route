# @nuage/route

Vanilla route

## Install

```sh
$ npm install --save @nuage/route
```

## Use

```js
import nuageRoute from '@nuage/route';

const Route = nuageRoute.Route;

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