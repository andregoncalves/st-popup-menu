![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# st-popup-menu

st-popup-menu is a web component built with [Stencil](https://stenciljs.com/) to easily display a popup menu on hover (or click) another element.

## Demo

## Getting Started

To try this component:

```bash
git clone git@github.com:andregoncalves/st-popup-menu.git
cd st-popup-menu
git remote rm origin
```

and run:

```bash
npm install
npm start
```

## Using this component

### Script tag


- Put `<script src='https://unpkg.com/st-popup-menu@latest/dist/st-popup-menu.js'></script>` in the head of your index.html
- Then you can use the component

### Node Modules
- Run `npm install st-popup-menu --save`
- Put a script tag similar to this `<script src='node_modules/st-popup-menu/dist/st-popup-menu.js></script>` in the head of your index.html
- Then you can use the element `<st-popup-menu>` anywhere in your template, JSX, html etc

### In a stencil-starter app
- Run `npm install st-popup-menu --save`
- Add this import to your root component or root module: `import 'st-popup-menu'`;
- Then you can use the element `<st-popup-menu>` anywhere in your template, JSX, html etc

### In a React/Rollup/Webpack app
- Run `npm install st-popup-menu --save`
- Add this import to your root component or root module: `import { defineCustomElements } from 'st-popup-menu';`;
- Call `defineCustomElements(window);` in your js file

## Parameters

Attribute | Default | Description
------------ | ------------- | -------------
target | '' | A DOMString containing one selector to match an element
trigger | 'hover' | The trigger that causes popup to be shown either *hover* or *click*
delay | '500' | The delay (in ms) until the popup is hidden after mouse out.
backgroundColor | 'white' | Popup background color
borderColor | 'black' | Popup border color
borderWidth | '1px' | Popup border width

## Events

The st-popup-menu element emits a `show` and `hide` events whenever the popup is shown or hidden.

```js
element = document.querySelector('st-popup-menu');
element.addEventListener('show', (e) => {
  // Reference to popup html node
  console.log(e.detail);
});

element.addEventListener('hide', (e) => {
  // Reference to popup html node
  console.log(e.detail);
});
```


## Example usage

```html
<st-popup-menu target="img1" trigger="hover" delay="200">
  <div>Popup contents here</div>
</st-popup-menu>
```
