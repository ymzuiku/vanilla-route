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
import Route from 'vanilla-route';

const Register = Route.Register;

function Home() {
  return document.createElement('div').textContext('Home Page');
}

function User() {
  return document.createElement('div').textContext('User Page');
}

const app = document.createElement('div');
app.append(Register({ path: '/home', component: Home }), Register({ path: '/user', component: User }));

document.body.append(app);
Route.init('/home');
```
