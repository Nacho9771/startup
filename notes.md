# CS 260 Notes

[My startup - EasyTrading](https://github.com/Nacho9771/startup.git)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 52.4.152.64
I had some struggle getting AWS set up and my server to connect to the internet, however after a lot of debugging and restepping through the instructions I found my problems. I initially set the public ID in the EC2 portal with the one before seting up the elastic IP. Additionally, I forgot to remove the semicolon when configuring HTTPS with the server, so that took a while to find. Eventually, everything functioned properly.

## Caddy

The instructions were correct, however there were issues in how I followed them. I got the issues fixed. [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

### HTML Intro

- HTML elements represented by tags, tags defined by "< >" and cloase with a "/"

- `<html>` is the top level container, `<head>` contains metadata like `<title>`, `<body>` contains page content, `<main>` is the main content area, and `<footer>` is the end of the page. 

- id and class provide additioonal information about an element (Ex. `<p id="hello" class="greeting">Hello world</p>`)

- Hyperlinks created with the `<a>` tag, and `href` specifies the destination (Ex. `<a href="https://byu.edu">Go to the Y</a>`)

`<!DOCTYPE html>`: Defines document type and version. Common elements include:
  `<h1>` to `<h9>`: Headings (h1 = largest).
  `<p>`: Paragraph.
  `<b>`: Bold text.
  `<table>`: Creates a table.
  `<ul>` / `<ol>`: Unordered/ordered list.
  `<li>`: List item.
  `<img>`: Displays images (src attribute specifies image path).
  `<form>`: Collects user input.
  `<input>`: User input field.
  `<video>` and `<audio>`: Embeds media.
  `<iframe>`: Embeds another webpage.

- Special Characters include:

```
  &	&amp;
  <98	&lt;
  >iu	&gt;
  "	&quot;
  '	&apos;
  ```

- Default file served when accessing a website should be index.html

### HTML Structure

Example Structure of HTML Document:

```html
<body>
  <p>Body</p>
  <header>
    <h1>Your Name</h1>
    <p>Header - <span>Span</span></p>
    <nav>
      <a href="https://www.byu.edu">BYU</a>
      <a href="https://www.familysearch.org">FamilySearch</a>
    </nav>
  </header>

  <main>
    <section>
      <p>Section</p>
      <ul>
        <li>Apples</li>
        <li>Bananas</li>
        <li>Oranges</li>
      </ul>
    </section>
    <section>
      <p>Section</p>
      <table>
        <tr>
          <th>Table</th><th>Table</th><th>Table</th>
        </tr>
        <tr>
          <td>table</td><td>table</td><td>table</td>
        </tr>
        <tr>
          <td>HTML</td><td>CSS</td><td>JavaScript</td>
        </tr>
      </table>
    </section>
    <aside>
      <p>Aside</p>
      <img src="https://example.com/image.jpg" width="200">
    </aside>
  </main>

  <footer>
    <div>Footer - <span>Span</span></div>
    <a href="https://github.com/yourusername">GitHub Repository</a>
  </footer>
</body>
```

### HTML Project

I learned a ton while I implemented all of the things in the course notes. I spent over 10 hours constructing my code over the past few days and I know how to properly format HTML code now!

## CSS

### CSS Intro

Associating the css code in an HTML document:

```css
p {
  font-family: sans-serif;
  font-size: 2em;
  color: navy;
  text-shadow: 3px 3px 1px #cccccc;
}
```

`<p style="color:green">CSS</p>`

```css
<head>
  <style>
    p {
      color: green;
    }
  </style>
</head>
<body>
  <p>CSS</p>
</body>
```

Outside of HTML:
`<link rel="stylesheet" href="styles.css" />`
(In styles.css)

```css
p {
  color: green;
}
```

Good ways to organize code in cascading style:

```html
<body>
  <p><span style="color:black">CSS</span></p>
</body>
```

```css
body {
  color: red;
}
p {
  color: green;
}
span {
  color: blue;
}
```

- Box model: CSS boxes include content, padding, border, and then margin.

### Selectors

- Here is some selector code to style documents. The first code block is an example of the HTML document and the following blocks are CSS addons.

```html
<body>
  <h1>Departments</h1>
  <p>welcome message</p>
  <section id="physics">
    <h2>Physics</h2>
    <p class="introduction">Introduction</p>
    <p>Text</p>
    <p class="summary">Summary</p>
  </section>
  <section id="chemistry">
    <h2>Chemistry</h2>
    <p class="introduction">Introduction</p>
    <p>Text</p>
    <p class="summary">Summary</p>
  </section>
</body>
```

```css
body {
  font-family: sans-serif;
}
h1 {
  border-bottom: thin black solid;
}
section {
  background: #eeeeee;
  padding: 0.25em;
  margin-bottom: 0.5em;
}
section h2 {
  color: #004400;
}
h2 ~ p {
  padding-left: 0.5em;
}
.summary { /* you can also add p.summary to select all paragraphs with a class of summary */
  font-weight: bold;
}
#physics {
  border-left: solid 1em purple;
}
p[class='summary'] {
  color: red;
}
section:hover {
  border-left: solid 1em purple;
}
```

### Various Declarations

| Property                 | Value                        | Example                      | Discussion                                                                |
|--------------------------|------------------------------|------------------------------|--------------------------------------------------------------------------|
| `background-color`        | color                        | red                          | Fills the background color.                                              |
| `border`                  | color, width, style          | #fad solid medium            | Sets the border using shorthand where any or all values can be provided. |
| `border-radius`           | unit                         | 50%                          | Defines the size of the border radius.                                    |
| `box-shadow`              | x-offset, y-offset, blur-radius, color | 2px 2px 2px gray            | Creates a shadow.                                                         |
| `columns`                 | number                       | 3                            | Defines the number of textual columns.                                    |
| `column-rule`             | color, width, style          | solid thin black             | Sets the border between columns using shorthand.                          |
| `color`                   | color                        | rgb(128, 0, 0)               | Sets the text color.                                                      |
| `cursor`                  | type                         | grab                         | Sets the cursor to display when hovering over the element.                |
| `display`                 | type                         | none                         | Defines how to display the element and its children.                      |
| `filter`                  | filter-function              | grayscale(30%)                | Applies a visual filter.                                                  |
| `float`                   | direction                    | right                        | Places the element to the left or right in the flow.                      |
| `flex`                    |                              |                              | Flex layout. Used for responsive design.                                  |
| `font`                    | family, size, style          | Arial 1.2em bold              | Defines the text font using shorthand.                                    |
| `grid`                    |                              |                              | Grid layout. Used for responsive design.                                  |
| `height`                  | unit                         | .25em                        | Sets the height of the box.                                               |
| `margin`                  | unit                         | 5px 5px 0 0                   | Sets the margin spacing.                                                  |
| `max-[width/height]`      | unit                         | 20%                          | Restricts the width or height to no more than the unit.                   |
| `min-[width/height]`      | unit                         | 10vh                         | Restricts the width or height to no less than the unit.                   |
| `opacity`                 | number                       | .9                           | Sets how opaque the element is.                                           |
| `overflow`                | [visible/hidden/scroll/auto] | scroll                       | Defines what happens when the content does not fit in its box.            |
| `position`                | [static/relative/absolute/sticky] | absolute                  | Defines how the element is positioned in the document.                    |
| `padding`                 | unit                         | 1em 2em                      | Sets the padding spacing.                                                 |
| `left`                    | unit                         | 10rem                        | The horizontal value of a positioned element.                             |
| `text-align`              | [start/end/center/justify]    | end                          | Defines how the text is aligned in the element.                           |
| `top`                     | unit                         | 50px                         | The vertical value of a positioned element.                               |
| `transform`               | transform-function           | rotate(0.5turn)               | Applies a transformation to the element.                                  |
| `width`                   | unit                         | 25vmin                        | Sets the width of the box.                                                |
| `z-index`                 | number                       | 100                          | Controls the positioning of the element on the z-axis.                    |

| Unit  | Description                                                     |
|-------|-----------------------------------------------------------------|
| `px`  | The number of pixels                                            |
| `pt`  | The number of points (1/72 of an inch)                          |
| `in`  | The number of inches                                            |
| `cm`  | The number of centimeters                                       |
| `%`   | A percentage of the parent element                              |
| `em`  | A multiplier of the width of the letter "m" in the parent's font|
| `rem` | A multiplier of the width of the letter "m" in the root's font  |
| `ex`  | A multiplier of the height of the element's font                |
| `vw`  | A percentage of the viewport's width                            |
| `vh`  | A percentage of the viewport's height                           |
| `vmin`| A percentage of the viewport's smaller dimension                |
| `vmax`| A percentage of the viewport's larger dimension                 |

### Fonts

this is how you import fonts:

```css
@font-face {
  font-family: 'Quicksand';
  src: url('https://cs260.click/fonts/quicksand.ttf');
}

p {
  font-family: Quicksand;
}

/* OR */

@import url('https://fonts.googleapis.com/css2?family=Rubik Microbe&display=swap');

p {
  font-family: 'Rubik Microbe';
}
```

### Animation

These are some ways to show animations:

```css
p {
  text-align: center;
  font-size: 20vh;

  animation-name: demo;
  animation-duration: 3s;
}

@keyframes demo {
  from {
    font-size: 0vh;
  }

  95% {
    font-size: 21vh;
  }

  to {
    font-size: 20vh;
  }
}
```

### Responsive Design 

Ways to format the design so it adapts with the page:

| Value   | Meaning                                                                                  |
|---------|------------------------------------------------------------------------------------------|
| `none`  | Don't display this element. The element still exists, but the browser will not render it. |
| `block` | Display this element with a width that fills its parent element. A `p` or `div` element has block display by default. |
| `inline` | Display this element with a width that is only as big as its content. A `b` or `span` element has inline display by default. |
| `flex`  | Display this element's children in a flexible orientation.                              |
| `grid`  | Display this element's children in a grid orientation.                                  |

```html
<div class="none">None</div>
<div class="block">Block</div>
<div class="inline">Inline1</div>
<div class="inline">Inline2</div>
<div class="flex">
  <div>FlexA</div>
  <div>FlexB</div>
  <div>FlexC</div>
  <div>FlexD</div>
</div>
<div class="grid">
  <div>GridA</div>
  <div>GridB</div>
  <div>GridC</div>
  <div>GridD</div>
</div>
```

```css
.none {
  display: none;
}

.block {
  display: block;
}

.inline {
  display: inline;
}

.flex {
  display: flex;
  flex-direction: row;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
```

```css
aside {
  float: right;
  padding: 3em;
  margin: 0.5em;
  border: black solid thin;
}
```

```css
@media (orientation: portrait) {
  div {
    transform: rotate(270deg);
  }
}
@media (orientation: portrait) {
  aside {
    display: none;
  }
}
```

Here is an example with a grid:

```html
<div class="container">
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>
</div>
```

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 300px;
  grid-gap: 1em;
}
```

here is some extra code for a movable box
```html
<body>
  <header>
    <h1>CSS flex &amp; media query</h1>
  </header>
  <main>
    <section>
      <h2>Controls</h2>
    </section>
    <section>
      <h2>Content</h2>
    </section>
  </main>
  <footer>
    <h2>Footer</h2>
  </footer>
</body>
```

```css
body {
  display: flex;
  flex-direction: column;
  margin: 0;
  height: 100vh;
}
header {
  flex: 0 80px;
  background: hsl(223, 57%, 38%);
}

footer {
  flex: 0 30px;
  background: hsl(180, 10%, 10%);
}

main {
  flex: 1;
  display: flex;
  flex-direction: row;
}
header {
  flex: 0 80px;
  background: hsl(223, 57%, 38%);
}

footer {
  flex: 0 30px;
  background: hsl(180, 10%, 10%);
}

main {
  flex: 1;
  display: flex;
  flex-direction: row;
}
```

This took a couple hours to get it how I wanted. It was important to make it responsive and Bootstrap helped with that. It looks great on all kinds of screen sizes.

Bootstrap seems a bit like magic. It styles things nicely, but is very opinionated. You either do, or you do not. There doesn't seem to be much in between.

I did like the navbar it made it super easy to build a responsive header.

```html
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img src="logo.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
            Calmer
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="play.html">Play</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="index.html">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
```

I also used SVG to make the icon and logo for the app. This turned out to be a piece of cake.

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#0066aa" rx="10" ry="10" />
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="72" font-family="Arial" fill="white">C</text>
</svg>
```

## React Part 1: Routing

### Lecture Notes

Three Ways to Include JavaScript:

1. **Script Block**  
   - JavaScript is written inside a `<script>` element within the HTML file.

2. **External Script**  
   - A separate JavaScript file is linked using the `src` attribute in a `<script>` tag.

3. **Inline Event Attribute**  
   - JavaScript is written directly inside an HTML attribute (e.g., `onclick`).

Here is some example code:

```html
<head>
  <!-- External JavaScript file -->
  <script src="index.js"></script>
</head>
<body>
  <button onclick="sayHello()">Say Hello</button>
  <button onclick="sayGoodbye()">Say Goodbye</button>

  <!-- Internal Script Block -->
  <script>
    function sayGoodbye() {
      alert("Goodbye");
    }
  </script>

  <!-- Inline Attribute Handler -->
  <script>
    let i = 1;
  </script>
  <button onclick="alert(`i = ${i++}`)">counter</button>
</body>

Debugging with node.js:
1. **Create a JavaScript File**  
   - Create `main.js` and add the following code:

   ```js
   let x = 1 + 1;
   console.log(x);

   function double(x) {
     return x * 2;
   }

   x = double(x);
   console.log(x);
   ```

Various steps:

- Press `F5` to start debugging.
- Select **Node.js** when prompted.
- Debug console shows `console.log` outputs.

- Click on the left of the line numbers to set a breakpoint.
- Press `F5` to restart debugging.
- Pause execution and inspect variables by:
  - Looking at the **variable window**.
  - Hovering over variables.

- `F10` – Step to the next line.
- `F11` – Step into a function.
- `F5` – Continue execution.
- `SHIFT-F5` – Stop debugging.

Automatically restarts node.js:
`node --watch main.js`

VS code configuration for watch:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "runtimeArgs": ["--watch"],
      "program": "${workspaceFolder}/main.js"
    }
  ]
}

```

### React

Heres are some examples of some react code. It basically combines javascript and HTML:

```JSX
const i = 3;
const list = (
  <ol class="big">
    <li>Item {i}</li>
    <li>Item {3 + i}</li>
  </ol>
);
```

this is what the preprocessor will create from that code:

```js
const i = 3;
const list = React.createElement('ol', { class: 'big' }, React.createElement('li', null, 'Item ', i), React.createElement('li', null, 'Item ', 3 + i));
```

Very cool

Ok, I've completed the simon-react-p1, and now I am starting to complete the ract part 1 deliverable for my startup. Below are some notes of what I learned while finishing the simon-react-p1:

- Debugging serious problems are hard. Very hard.
- Deploying simon-react to my directory looks like this:
./deployReact.sh -k "C:\Users\alright alright\Desktop\CS260\yellow.pem" -h lolwinning.click -s simon
- When there are problems with the json file, its usually absence of a comma
- when there are problems with the react page, and it shows up completely blank, its ok to continue because it will resolve itself apparently
- always import css files
- When there are issues within the file, make sure all of the files are saved after you have made adjustments
- If you are stuck, it's better to reload a previous commit and restart the current assignment
- I learned how to commit things, add things, push things, and delete directories using the console
- I learned a lot about navigating directories and sourcing files properly (I had some issues with the src)

### startup-react-p1-deliverable

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

### Functions

- Here are some examples of js code for functions:

```js
function hello(who) {
  return 'hello ' + who;
}

console.log(hello('world'));
// OUTPUT: hello world
```

```js
function hello(who) {
  who.count++;
  console.log('hello ' + who.name);
}

hello({ name: 'world', count: 0 });
// OUTPUT: hello world
```

```js
function labeler(value, title = 'title') {
  console.log(`${title}=${value}`);
}

labeler();
// OUTPUT: title=undefined

labeler('fish');
// OUTPUT: title=fish

labeler('fish', 'animal');
// OUTPUT: animal=fish
```

```js
// Function that takes a function as a parameter
function doMath(operation, a, b) {
  return operation(a, b);
}

// Anonymous function assigned to a variable
const add = function (a, b) {
  return a + b;
};

console.log(doMath(add, 5, 3));
// OUTPUT: 8

// Anonymous function assigned to a parameter
console.log(
  doMath(
    function (a, b) {
      return a - b;
    },
    5,
    3
  )
);
// OUTPUT: 2
```

- (Very nifty function trick):

```js
console.log(doMath((a, b) => a - b, 5, 3));
```

```js
// Anonymous declaration of the function that is later assigned to a variable
const add = function (a, b) {
  return a + b;
};

// Function that logs as a side effect of its execution
function labeler(label, value) {
  console.log(label + '=' + value);
}

// Function that takes a function as a parameter and then executes the function as a side effect
function addAndLabel(labeler, label, adder, a, b) {
  labeler(label, adder(a, b));
}

// Passing a function to a function
addAndLabel(labeler, 'a+b', add, 1, 3);
// OUTPUT: a+b=4

// Function that returns a function
function labelMaker(label) {
  return function (value) {
    console.log(label + '=' + value);
  };
}

// Assign a function from the return value of the function
const nameLabeler = labelMaker('name');

// Calling the returned function
nameLabeler('value');
// OUTPUT: name=value
```

```js
// Anonymous declaration of the function that is later assigned to a variable
const add = function (a, b) {
  return a + b;
};

// Function that logs as a side effect of its execution
function labeler(label, value) {
  console.log(label + '=' + value);
}

// Function that takes a function as a parameter and then executes the function as a side effect
function addAndLabel(labeler, label, adder, a, b) {
  labeler(label, adder(a, b));
}

// Passing a function to a function
addAndLabel(labeler, 'a+b', add, 1, 3);
// OUTPUT: a+b=4

// Function that returns a function
function labelMaker(label) {
  return function (value) {
    console.log(label + '=' + value);
  };
}

// Assign a function from the return value of the function
const nameLabeler = labelMaker('name');

// Calling the returned function
nameLabeler('value');
// OUTPUT: name=value
```

```js
function labeler(value) {
  function stringLabeler(value) {
    console.log('string=' + value);
  }
  function numberLabeler(value) {
    console.log('number=' + value);
  }

  if (typeof value == 'string') {
    stringLabeler(value);
  } else if (typeof value == 'number') {
    numberLabeler(value);
  }
}

labeler(5);
// OUTPUT: number=5

labeler('fish');
// OUTPUT: string=fish
```

### The arrow function

- Equivalent code:

```js
const a = [1, 2, 3, 4];

// standard function syntax
a.sort(function (v1, v2) {
  return v1 - v2;
});

// arrow function syntax
a.sort((v1, v2) => v1 - v2);
```

- return basically messes things up unless you have curly brackets

```js
() => 3;
// RETURNS: 3

() => {
  3;
};
// RETURNS: undefined

() => {
  return 3;
};
// RETURNS: 3
```

```js
function makeClosure(init) {
  let closureValue = init;
  return () => {
    return `closure ${++closureValue}`;
  };
}

const closure = makeClosure(0);

console.log(closure());
// OUTPUT: closure 1

console.log(closure());
// OUTPUT: closure 2
```

This is important code that you can use to keep track of balances and stuff

```js
function App() {
  const [count, setCount] = React.useState(0);

  function Increment() {
    setCount(count + 1);
  }

  function Decrement() {
    setCount(count - 1);
  }

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={Increment}>n++</button>
      <button onClick={Decrement}>n--</button>
    </div>
  );
}
/* Or you can just use this*/ 
function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>n++</button>
      <button onClick={() => setCount(count - 1)}>n--</button>
    </div>
  );
}

// may corrupt value
setCount(count + 1);

// safe
setCount((prevCount) => prevCount + 1);

// This is the updated code

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>n++</button>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>n--</button>
    </div>
  );

  // better formated edition

  function App() {
  const [count, setCount] = React.useState(0);

  function counterOpFactory(op) {
    return () => setCount((prevCount) => op(prevCount));
  }

  const incOp = counterOpFactory((c) => c + 1);
  const decOp = counterOpFactory((c) => c - 1);
  const tenXOp = counterOpFactory((c) => c * 10);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={incOp}>n++</button>
      <button onClick={decOp}>n--</button>
      <button onClick={tenXOp}>n*10</button>
    </div>
  );
}
}
```

- Very complex example (look at your own risk)

```js
window.addEventListener(
  'scroll',
  debounce(500, () => {
    console.log('Executed an expensive calculation');
  })
);

function debounce(windowMs, windowFunc) {
  let timeout;
  return function () {
    console.log('scroll event');
    clearTimeout(timeout);
    timeout = setTimeout(() => windowFunc(), windowMs);
  };
}
```

### Objects and Classes

```js
const obj = new Object({ a: 3 });
obj['b'] = 'fish';
obj.c = [1, 2, 3];
obj.hello = function () {
  console.log('hello');
};

console.log(obj);
// OUTPUT: {a: 3, b: 'fish', c: [1,2,3], hello: func}
```

```js

```

```js

```

```js

```

```js

```

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```

## Startup server

Ok I'm really bad at taking notes so I'm literally just going to copy paste the most important parts.

In the previous instruction you saw how to use Node.js to create a simple web server. This works great for little projects where you are trying to quickly serve up some web content, but to build a production-ready application you need a framework with a bit more functionality for easily implementing a full web service. This is where the Node package Express come in. Express provides support for:

1. Routing requests for service endpoints
2. Manipulating HTTP requests with JSON body content
3. Generating HTTP responses
4. Using middleware to add functionality

Everything in Express revolves around creating and using HTTP routing and middleware functions. You create an Express application by using NPM to install the Express package and then calling the express constructor to create the Express application and listen for HTTP requests on a desired port.

```cmd
➜ npm install express
```

```js
const express = require('express');
const app = express();

app.listen(8080);
```

With the app object you can now add HTTP routing and middleware functions to the application.

HTTP endpoints are implemented in Express by defining routes that call a function based upon an HTTP path. The Express app object supports all of the HTTP verbs as functions on the object. For example, if you want to have a route function that handles an HTTP GET request for the URL path /store/provo you would call the get method on the app.

```js
app.get('/store/provo', (req, res, next) => {
  res.send({ name: 'provo' });
});
```

The get function takes two parameters, a URL path matching pattern, and a callback function that is invoked when the pattern matches. The path matching parameter is used to match against the URL path of an incoming HTTP request.

The callback function has three parameters that represent the HTTP request object (req), the HTTP response object (res), and the next routing function that Express expects to be called if this routing function wants another function to generate a response.

The Express app compares the routing function patterns in the order that they are added to the Express app object. So if you have two routing functions with patterns that both match, the first one that was added will be called and given the next matching function in the next parameter.

In our example above we hard coded the store name to be provo. A real store endpoint would allow any store name to be provided as a parameter in the path. Express supports path parameters by prefixing the parameter name with a colon (:). Express creates a map of path parameters and populates it with the matching values found in the URL path. You then reference the parameters using the req.params object. Using this pattern you can rewrite our getStore endpoint as follows.

```js
app.get('/store/:storeName', (req, res, next) => {
  res.send({ name: req.params.storeName });
});
```

If we run our JavaScript using node we can see the result when we make an HTTP request using curl.

```cmd
➜ curl localhost:8080/store/orem
{"name":"orem"}
```

If you wanted an endpoint that used the POST or DELETE HTTP verb then you just use the post or delete function on the Express app object.

The route path can also include a limited wildcard syntax or even full regular expressions in path pattern. Here are a couple route functions using different pattern syntax.

```js
// Wildcard - matches /store/x and /star/y
app.put('/st*/:storeName', (req, res) => res.send({ update: req.params.storeName }));

// Pure regular expression
app.delete(/\/store\/(.+)/, (req, res) => res.send({ delete: req.params[0] }));
```

Notice that in these examples the next parameter was omitted. Since we are not calling next we do not need to include it as a parameter. However, if you do not call next then no following middleware functions will be invoked for the request.

The standard Mediator/Middleware design pattern has two pieces: a mediator and middleware. Middleware represents componentized pieces of functionality. The mediator loads the middleware components and determines their order of execution. When a request comes to the mediator it then passes the request around to the middleware components. Following this pattern, Express is the mediator, and middleware functions are the middleware components.

Express comes with a standard set of middleware functions. These provide functionality like routing, authentication, CORS, sessions, serving static web files, cookies, and logging. Some middleware functions are provided by default, and other ones must be installed using NPM before you can use them. You can also write your own middleware functions and use them with Express.

A middleware function looks very similar to a routing function. That is because routing functions are also middleware functions. The only difference is that routing functions are only called if the associated pattern matches. Middleware functions are always called for every HTTP request unless a preceding middleware function does not call next. A middleware function has the following pattern:

`function middlewareName(req, res, next)`

The middleware function parameters represent the HTTP request object (req), the HTTP response object (res), and the next middleware function to pass processing to. You should usually call the next function after completing processing so that the next middleware function can execute.

As an example of writing your own middleware, you can create a function that logs out the URL of the request and then passes on processing to the next middleware function.

```js
app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});
```

Remember that the order that you add your middleware to the Express app object controls the order that the middleware functions are called. Any middleware that does not call the next function after doing its processing, stops the middleware chain from continuing.

In addition to creating your own middleware functions, you can use a built-in middleware function. Here is an example of using the static middleware function. This middleware responds with static files, found in a given directory, that match the request URL.

`app.use(express.static('public'));`

Now if you create a subdirectory in your project directory and name it public you can serve up any static content that you would like. For example, you could create an index.html file that is the default content for your web service. Then when you call your web service without any path the index.html file will be returned.

You can also use third party middleware functions by using NPM to install the package and including the package in your JavaScript with the require function. The following uses the cookie-parser package to simplify the generation and access of cookies.

` ➜ npm install cookie-parser `

```js
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.post('/cookie/:name/:value', (req, res, next) => {
  res.cookie(req.params.name, req.params.value);
  res.send({ cookie: `${req.params.name}:${req.params.value}` });
});

app.get('/cookie', (req, res, next) => {
  res.send({ cookie: req.cookies });
});
```

It is common for middleware functions to add fields and functions to the req and res objects so that other middleware can access the functionality they provide. You see this happening when the cookie-parser middleware adds the req.cookies object for reading cookies, and also adds the res.cookie function in order to make it easy to add a cookie to a response.

You can also add middleware for handling errors that occur. Error middleware looks similar to other middleware functions, but it takes an additional err parameter that contains the error.

`function errorMiddlewareName(err, req, res, next)`

If you wanted to add a simple error handler for anything that might go wrong while processing HTTP requests you could add the following.

```js
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});
```

We can test that our error middleware is getting used by adding a new endpoint that generates an error.

```js
app.get('/error', (req, res, next) => {
  throw new Error('Trouble in river city');
});
```

Now if we use curl to call our error endpoint we can see that the response comes from the error middleware.

```cmd
➜ curl localhost:8080/error
{"type":"Error","message":"Trouble in river city"}
```

Here is a full example of our web service built using Express.

```js
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// Third party middleware - Cookies
app.use(cookieParser());

app.post('/cookie/:name/:value', (req, res, next) => {
  res.cookie(req.params.name, req.params.value);
  res.send({ cookie: `${req.params.name}:${req.params.value}` });
});

app.get('/cookie', (req, res, next) => {
  res.send({ cookie: req.cookies });
});

// Creating your own middleware - logging
app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});

// Built in middleware - Static file hosting
app.use(express.static('public'));

// Routing middleware

// Get store endpoint
app.get('/store/:storeName', (req, res) => {
  res.send({ name: req.params.storeName });
});

// Update store endpoint
app.put('/st*/:storeName', (req, res) => res.send({ update: req.params.storeName }));

// Delete store endpoint
app.delete(/\/store\/(.+)/, (req, res) => res.send({ delete: req.params[0] }));

// Error middleware
app.get('/error', (req, res, next) => {
  throw new Error('Trouble in river city');
});

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Listening to a network port
const port = 8080;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
```

Let's take a moment to talk about how you can debug a web service running with the Express package under Node.js. Using the code that you created above, set a breakpoint on the code inside the getStore endpoint callback and another breakpoint on the app.listen call. Start debugging by pressing F5. The debugger should stop on the listen call where you can inspect the app variable. Press F5 again to continue running. Now open up your browser and set the location to localhost:8080/store/provo. This should hit the breakpoint on the endpoint. Take some time to inspect the req object. You should be able to see what the HTTP method is, what parameters are provided, and what the path currently is. Press F5 to continue. Your browser should display the JSON object that you returned from your endpoint.

Make another request from our browser, but this time include some query parameters. Something like http://localhost:8080/store/orem?order=2. Requesting that URL should cause your breakpoint to hit again where you can see the URL changes reflected in the req object.

Now, instead of pressing F5 to continue, press F11 to step into the res.send function. This will take you out of your code and into the Express code that handles sending a response. Because you installed the Express package using NPM, all of Express's source code is sitting in the node_modules directory. You can also set breakpoints there, examine variables, and step into functions. Debugging into popular packages is a great way to learn how to code by seeing how really good programmers do things. Take some time to walk around Holowaychuk's code and see if you can understand what it is doing.