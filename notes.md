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

```
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

### HTML Input

This was easy. I was careful to use the correct structural elements such as header, footer, main, nav, and form. The links between the three views work great using the `a` element.

The part I didn't like was the duplication of the header and footer code. This is messy, but it will get cleaned up when I get to React.

## CSS

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
