> 27 - Sep - 2022

## Fabric Js Learning...

### Tailwind setup

 * yarn add -D tailwindcss postcss autoprefixer
 * npx tailwindcss init -p
 * tailwind.config 

### Fabric Js 

 * yarn add fabric
 * yarn add react-hot-toast



## Features:-

* πΎ save data at local-storage + β¨ key operation
* π preventing app crash, when save data become undefined...
* π load data from local-storage...
* β single object delete operation + β¨ key operation
* β multiple object delete operation + β¨ key operation
* πΈ save as image, whole canvas drawing + β¨ key operation
* π° select all object that draw in canvas + β¨ key operation
* π canvas zoom functionality 
* β¨ "tab" key press event to navigate inside canvas object for selection... 
* β¨ Check that Caps Lock is on
* π±οΈ Get the mouse position
* π StickyNote demo testing add...


<br/>

```
Developers describe Fabric.js as "The easiest way to work with HTML5 canvas". 
It provides interactive object model on top of canvas element. 
Fabric also has SVG-to-canvas (and canvas-to-SVG) parser. 
Using Fabric.js, you can create and populate objects on canvas, objects like simple geometrical shapes.
```

```
Things to keep in mind:
When inspecting the canvas, itβs important to note that there are two layers that exist 
1) upper canvas & 
2) lower canvas

The upper canvas is utilized by the Fabric.js API for handling events, groupings, etc. 
while weβre actually working on the lower canvas layer & The lower canvas contains the id we defined
```


* `canvas.clear()` will clear all objects on canvas.
* `canvas.dispose()` will clear all objects on canvas & remove all listeners.

## File & Folder hierarchy

```
src
βββ assets
|   βββ Brush.jsx
|   βββ Circle.jsx
|   βββ Eraser.jsx
|   βββ index.js
|   βββ Rectangle.jsx
|   βββ Text.jsx
|   βββ Triangle.jsx
|
βββ components
|   βββ Canvas.jsx
|   βββ CanvasLine.jsx
|   βββ Row1.jsx
|   βββ Row2.jsx
|
βββ context
|   βββ CanvasContext.js
|
βββ drawingTools
|   βββ draw-i-Text.js
|   βββ drawCircle.js
|   βββ drawingBrush.js
|   βββ drawRectangle.js
|   βββ drawText.js
|   βββ drawTextBox.js
|   βββ drawTriangle.js
|
βββ features
|   βββ copyPasteSelect.js
|   βββ delete.js
|   βββ loadSVG.js
|   βββ mouseHover.js
|   βββ r&d.js
|   βββ save.js
|   βββ search.js
|   βββ utils.js
|   βββ zoom.js
|
βββ style
|   βββ index.css
|
βββ App.jsx
βββ index.js
```