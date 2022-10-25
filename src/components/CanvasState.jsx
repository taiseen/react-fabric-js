import { Rectangle, Circle, Triangle, Brush, Eraser, Text } from './../assets';
import { useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric';


const CanvasState = () => {

  const fabricObj = useRef(null);
  const [canvas, setCanvas] = useState({});
  const [svgLoad, setSvgLoad] = useState([]);
  const [userInputText, setUserInputText] = useState('');
  const [textSearching, setTextSearching] = useState('');
  const [colorSelect, setColorSelect] = useState('blue');
  const [objectSelectForDelete, setObjectSelectForDelete] = useState(false);
  const colorList = ['red', 'green', 'blue', 'gray', 'tomato', 'orange']

  const posX = (canvas.width - 50) * Math.random();
  const posY = (canvas.height - 50) * Math.random();


  useEffect(() => {

    // 1st init fabric canvas object... 
    const initCanvas = new fabric.Canvas(fabricObj.current, {
      width: 1000,
      height: 650,
      backgroundColor: '#FEFEFE',
      // selection: false, // disables drag-to-select
      // defaultCursor:
    });

    setCanvas(initCanvas);

    // get old data from localStorage
    let oldSavedCanvasLocally = JSON.parse(localStorage.getItem('canvas'));

    if (oldSavedCanvasLocally) {
      // canvas initialized from save data that present at localStorage
      initCanvas.loadFromJSON(oldSavedCanvasLocally)
    } else {
      console.log('new fresh canvas start');
    }


    // these are mouse events...
    // mouseHoverIn(initCanvas);
    // mouseHoverOut(initCanvas);
    // objectSelected(initCanvas);


    initCanvas.on({
      'selection:created': objectSelected,
      'selection:updated': objectSelected,
    });


    initCanvas.on('mouse:down', () => {
      setObjectSelectForDelete(false)
      // console.log(objectSelectForDelete)
    });


    // only for zooming the canvas...
    initCanvas.on('mouse:wheel', (object) => {
      let delta = object.e.deltaY;
      let zoom = initCanvas.getZoom();
      zoom *= 0.999 ** delta;

      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;

      // top left ==> to ==> bottom right ==> zoom
      // initCanvas.setZoom(zoom); 

      // where the mouse point is present, at there zoom in OR zoom out by the help of mouse while scroll up & down
      initCanvas.zoomToPoint({ x: object.e.offsetX, y: object.e.offsetY }, zoom);

      object.e.preventDefault();
      object.e.stopPropagation();
    });


    return () => initCanvas.dispose();

  }, [fabricObj, setCanvas, objectSelectForDelete]);



  const mouseHoverIn = (initCanvas) => {
    initCanvas.on("mouse:over", (e) => {
      if (e.target) {
        e.target.set('fill', 'green');
        initCanvas.requestRenderAll();
        // objSelected = e.target
      }
    })
  }

  const mouseHoverOut = (initCanvas) => {
    initCanvas.on("mouse:out", (e) => {
      if (e.target) {
        e.target.set('fill', 'blue');
        initCanvas.requestRenderAll();
        // objSelected = e.target
      }
    })
  }

  const objectSelected = o => {

    // if value is undefined, exit form this function... 
    if (o?.e === undefined || o?.selected[0] === undefined) return;

    const selectedObj = o?.selected[0];
    selectedObj.set({
      borderColor: 'gray',
      hasControls: true,
      // fill: colorSelect,
    })

    console.log(selectedObj.type)

    return selectedObj;
    // if (selectedObj.type) {
    //   setObjectSelectForDelete(true)
    //   console.log('inside ==> ', objectSelectForDelete);
    //   console.log('=================================');
    // }


    // selectedObj.set('fill', colorSelect);
    // canvas?.renderAll();

    // console.log(e.target.fill)
    // console.log(e.e)
    // console.log(e.selected)

    // e.selected[0].fill = colorSelect;

    // if (selectedObject) {
    //   console.log(selectedObject);
    //   setObjectSelectForDelete(true);
    // } else {
    //   setObjectSelectForDelete(false);
    // }


  }


  // ⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜
  const drawRectangle = _ => {

    const rect = new fabric.Rect({
      id: 'rectangle',
      top: (canvas.height - 50) * Math.random(),
      left: (canvas.width - 50) * Math.random(),
      width: 50,
      height: 50,
      fill: colorSelect,
      objectCaching: false,
      padding: 10,
    });

    // Render Rectangle on Canvas
    canvas.add(rect);
  }


  // ⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪
  const drawCircle = _ => {

    const canvasCenter = canvas.getCenter();

    const circle = new fabric.Circle({
      id: 'circle',
      top: canvasCenter.top,
      left: canvasCenter.left,
      radius: 50,
      originX: 'center',
      originY: 'center',
      fill: colorSelect,
      objectCaching: false,
      padding: 10,
      cornerColor: colorSelect,
      cornerStyle: 'circle',
      cornerStrokeColor: colorSelect,
      borderDashArray: [5, 5],
      borderColor: '#000000',
      transparentCorners: true,
      lockRotation: true, // can not rotate 
      erasable: false, // can not erase it by erase tool-brush...


    });

    // Render Circle on Canvas
    canvas.add(circle);
  }


  // 🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺🔺
  const drawTriangle = _ => {

    const triangle = new fabric.Triangle({
      id: 'triangle',
      top: 150,
      left: 150,
      width: 100,
      height: 100,
      fill: colorSelect,
      objectCaching: false,
    });

    // Render Rectangle on Canvas
    canvas.add(triangle);
  }


  // 📝📝📝📝📝📝📝📝📝📝📝
  const drawText = () => {

    // Create a new Text instance

    // const text = new fabric.Text(userInputText, {
    //   id: 'text',
    //   top: 150,
    //   left: 150,
    //   fill: colorSelect
    // });

    // after click on icon, courser change... 
    // canvas.set({ hoverCursor: "text" })

    const text = new fabric.IText(userInputText,
      {
        editable: true,
        left: posX,
        top: posY,
        fill: colorSelect,
        fontFamily: 'Arial',
        fontSize: 50,
        // fontWeight: 'bold',
        // fontStyle: 'italic'
      }
    );

    // Render Text on Canvas
    canvas.add(text)

    // canvas.setActiveObject(text)
    // text.enterEditing()
    // text.hiddenTextarea.focus()
  }


  // print all object at Console
  const displayAllObj = _ => {

    canvas.getObjects().forEach(obj => {

      // console.log(obj.aCoords.tl,)
      console.log(obj);

      if (canvas.getActiveObject() === obj) {
        console.log('Selected Object ====> ', obj)
        // obj.hasBorders = false
        // obj.hasControls = false
        // obj.selectable = false
        // obj.lockRotation  = true
        // obj.lockScalingX = obj.lockScalingY = true;
        // obj.lockMovementX = true
        // obj.lockMovementY = true
        // obj.hoverCursor = 'pointer';
      }

    });
  }


  const drawing = _ => {

    // fabric.PencilBrush.prototype.globalCompositeOperation = "source-over";

    // SprayBrush
    // CircleBrush
    // PencilBrush
    // PatternBrush

    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.color = colorSelect;
    canvas.freeDrawingBrush.width = 5;
    canvas.isDrawingMode = true; // very very important...

    // canvas.on('mouse:move', (object) => {
    //   canvas.setCursor('grab');
    //   canvas.renderAll();
    //   const drawLine = new fabric.Point(object.e.movementX, object.e.movementY);
    //   canvas.relativePan(drawLine);
    // });

    canvas.on('mouse:up', () => canvas.isDrawingMode = false);
  }


  const eraseDrawing = _ => {
    console.log('eraseing,,,,')

    //  same as `PencilBrush`
    canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
    canvas.isDrawingMode = true;
    //  optional
    canvas.freeDrawingBrush.width = 10;

    //  undo erasing
    canvas.freeDrawingBrush.inverted = true;


    // = fabric.util.createClass(fabric.BaseBrush, {})

  }


  // canvas drawing - save as image & download it...
  const saveAsImg = _ => {

    const ext = "png";
    const base64 = canvas.toDataURL({
      format: ext,
      enableRetinaScaling: true
    });

    const link = document.createElement("a");
    link.href = base64;
    link.download = `${Date(Date.now()).slice(0, 24)}.${ext}`;
    link.click();
  }


  const saveCanvas = _ => {
    const json = canvas.toJSON();
    console.log(json)
    localStorage.setItem('canvas', JSON.stringify(json)); // save into local storage
  }


  // delete selected one...
  // 🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯
  const delete_single_selected_object = _ => {

    // loop through all objects, that present in canvas
    canvas.getObjects().forEach(obj => {
      // console.log(objectSelectForDelete);
      // if selected object is == equal to == this object ==> delete it from canvas...
      if (canvas.getActiveObject() === obj) {
        // setObjectSelectForDelete(true);
        canvas.remove(obj)
      }
    })
  }

  const delete_multiple_selected_object = multipleObject => {
    // loop through all objects, that present in canvas
    // & delete OR remove it from canvas... 
    multipleObject.forEach(obj => canvas.remove(obj))
  }


  // delete all...
  // 🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥
  const delete_all_object_from_canvas = _ => {
    canvas.getObjects().forEach(obj => canvas.remove(obj))

    // clear init canvas also...
    // canvas.clear();
  }


  // user search by typing at input field...
  const handleSearchText = e => {

    // async work | execute at background 
    setTextSearching(e.target.value)

    // sync work | execute it right now...
    if (Object.keys(canvas).length !== 0) {

      canvas.getObjects().forEach(obj => {

        if (obj?.text?.includes(textSearching)) {

          // change border color + control false...
          obj.set({
            borderColor: '#FF5F5F',
            hasControls: false
          })


          // select Fabric.js object programmatically
          canvas.setActiveObject(obj)

          // ?.text.replaceAll(textSearching, `<mark>${textSearching}</mark>`)
          console.log(obj?.text)
        }
      })
    }

  }

  const copy = _ => {
    let activeObj = canvas.getActiveObject();
    // console.log(activeObj)

    activeObj.clone(function (cloned) {
      canvas._clipboard = cloned;
      console.log(canvas)
    });

  }

  const past = _ => {
    let activeObj = canvas.getActiveObject();
    if (!activeObj) {
      return;
    }
    console.log(activeObj)
    console.log('past')
    // let pointerLeft = pointer.x;
    // let pointerTop = pointer.y;
  }

  const selectAll = _ => {
    let selectAllObject = canvas.getObjects()

    // deselect currently active or selected objects from the canvas.
    canvas.discardActiveObject();

    const selectedObjects = new fabric.ActiveSelection(selectAllObject, { canvas: canvas, });
    canvas.setActiveObject(selectedObjects);
    canvas.requestRenderAll();
  }



  useEffect(() => {

    // user keyboard, key pressing for object interaction...
    const handleKeyDownEvent = e => {

      // delete ==> key press
      if (e.key === 'Delete' || e.key === 'Backspace') {

        // just get selected object from canvas...
        const single_object_selected = canvas.getActiveObject();

        // for singe selected object delete operation
        if (single_object_selected) {
          delete_single_selected_object();
        }

        // for multiple selected object delete operation
        if (single_object_selected?._objects?.length) {
          delete_multiple_selected_object(single_object_selected?._objects)
        }

      }

      // ctrl + c ==> key press | for copy
      if (e.key === 'c') copy();

      // ctrl + v ==> key press | for past
      if (e.key === 'v') past();

      // ctrl + a ==> key press | for selecting all
      if (e.key === 'a') selectAll();

      // ctrl + s ==> key press | for save canvas as JSON format to load next time
      if (e.key === 's') saveCanvas();

      // ctrl + s ==> key press | for save as image formate
      if (e.key === 'i') saveAsImg();

    }


    window.addEventListener('keydown', handleKeyDownEvent);

    return () => {
      window.removeEventListener('keydown', handleKeyDownEvent);
    };
  }, [canvas])


  const loadSVG = e => {
    // setSvgLoad(e.target.files[0])
    const files = e.target.files
    const data = new FormData();
    data.append('svg', files[0])
    console.log(data)
    let img = 'http://fabricjs.com/assets/1.svg';
    console.log(img)

    fabric.loadSVGFromURL(img, function (objects, options) {
      var svgData = fabric.util.groupSVGElements(objects, options);

      svgData.top = 100;
      svgData.left = 250;
      // svgData.fill = 'red';

      canvas.add(svgData);
    });
  }


  return (
    <div>

      <div className='flex gap-4 items-center'>
        <Rectangle className='ml-1 cursor-pointer duration-200 hover:text-red-500' onClick={drawRectangle} />
        <Circle className='cursor-pointer duration-200 hover:text-red-500' onClick={drawCircle} />
        <Triangle className='cursor-pointer duration-200 hover:text-red-500' onClick={drawTriangle} />
        <Brush className='cursor-pointer duration-200 hover:text-red-500' onClick={drawing} />
        <Eraser className='cursor-pointer duration-200 hover:text-red-500' onClick={eraseDrawing} />
        <Text className='cursor-pointer duration-200 hover:text-red-500' onClick={drawText} />

        <input
          type="text"
          value={userInputText}
          placeholder='input text...'
          className='px-2 py-1 outline-none'
          onChange={e => setUserInputText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && [drawText(), setUserInputText('')]}
        />

        <div className='ml-auto space-x-4'>
          <input
            className='px-2 py-1 outline-none'
            placeholder='text searching by typing...'
            type="text"
            value={textSearching}
            onChange={handleSearchText}
            onKeyDown={e => e.key === 'Enter' && [drawText(), setTextSearching('')]}
          />

          <button className={`px-2 py-1 rounded-sm ${objectSelectForDelete ? 'bg-red-400 ' : 'bg-gray-400 '}`} onClick={() => delete_single_selected_object()}>Delete it</button>
          {/* <button className={`px-2 py-1 rounded-sm bg-red-400`} onClick={() => delete_selected_object()}>Delete it</button> */}
          <button className='px-2 py-1 bg-gray-500 hover:bg-red-500 duration-200 rounded-sm text-white' onClick={() => delete_all_object_from_canvas()}>Clear Canvas</button>
        </div>

      </div>


      <div className=' flex justify-between items-center'>
        <div className='flex items-center gap-4 my-2'>
          <div className='flex gap-2 my-2'>
            {
              colorList.map(color =>
                <div
                  key={color}
                  onClick={() => setColorSelect(color)}
                  style={{ backgroundColor: color }}
                  className='w-6 h-6 rounded-full cursor-pointer hover:opacity-60 duration-200'>
                </div>
              )
            }
          </div>

          <p onClick={displayAllObj} className='underline cursor-pointer'>show all at console</p>

        </div>

        <div className='flex gap-2'>
          <label
            htmlFor='svg'
            className='bg-gray-400 px-2 py-1 cursor-pointer duration-200 hover:text-gray-100'
          >SVG Upload
          </label>
          <input
            id='svg'
            type="file"
            onChange={loadSVG}
            style={{ display: 'none' }}
          />

          <p onClick={saveCanvas} className='bg-gray-400 px-2 py-1 cursor-pointer duration-200 hover:text-gray-100'>save canvas</p>
          <p onClick={saveAsImg} className='bg-gray-400 px-2 py-1 cursor-pointer duration-200 hover:text-gray-100'>save as img</p>
        </div>
      </div>


      <canvas id="canvas" ref={fabricObj} />

    </div>

  )
}

export default CanvasState