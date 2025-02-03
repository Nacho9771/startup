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
  <	&lt;
  >	&gt;
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

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

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
