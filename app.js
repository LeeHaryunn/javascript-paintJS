const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "black";
const CANVAS_SIZE = 700;

// css와 별개로 canvas element 영역을 지정해야함
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
// 펜의 default 값 지정 
ctx.fillStyle = "white";
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting() {
  painting = true;
}
function stopPainting() {
  painting = false;
}
function onMouseMove(event) { // 마우스가 캔버스 위에 올라가면 위치값을 받아옴(움직임 감지)
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  }else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}
function handleRangeChange(event) {
  const size = (event.target.value);
  ctx.lineWidth = size;
}
function handleModeClick() {
  if(filling === true) {
    filling = false;
    mode.innerText = "Fill";
  }else {
    filling = true;
    mode.innerText = "Paint";
  }
}
function handleCanvasClick() {
  if(filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}
function handleCM(event) {
  event.preventDefault(); // 우클릭방지
}
function handleSaveClick() {
  const image = canvas.toDataURL(); //toDataURL() default: png
  const link = document.createElement("a");
  link.href = image;
  link.download = "paintJS"; // 파일명
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}
Array.from(colors).forEach(color => 
  color.addEventListener("click", handleColorClick
));

if(range) {
  range.addEventListener("input", handleRangeChange);
}
if(mode) {
  mode.addEventListener("click", handleModeClick);
}
if(saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}