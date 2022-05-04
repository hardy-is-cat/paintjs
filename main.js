// 요소들
const canvas = document.querySelector('#jsCanvas')
const ctx = canvas.getContext('2d')

// 캔버스 기본값
const INITIAL_COLOR = '#2c2c2c'
canvas.width = 600
canvas.height = 600
ctx.fillStyle = '#fff'
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.lineWidth = 5;
ctx.strokeStyle = INITIAL_COLOR
ctx.fillStyle = INITIAL_COLOR


// 마우스 이벤트에 따른 그리기 상태
// 기본값
let painting = false
let filling = false

function mouseMove(e) {
  const x = e.offsetX
  const y = e.offsetY
  if (painting) {
    ctx.lineTo(x, y)
    ctx.stroke()
  } else {
    ctx.moveTo(x, y)
    ctx.beginPath()
  }
}

function startPainting() {
  if (!filling) {
    painting = true
  }
}

function stopPainting() {
  painting = false
}

// 브러쉬 <-> 전체 칠하기 전환
const modeBtn = document.querySelector('#jsModeBtn')

function handleMode() {
  if (!filling) {
    modeBtn.textContent = '전체 칠하기'
    canvas.style.cursor = "url(./images/cursor-fill.png), auto"
    filling = true
  } else {
    modeBtn.textContent = '브러쉬'
    canvas.style.cursor = 'crosshair'
    filling = false
  }
}

// 전체 칠하기
function fillCanvas() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
}

modeBtn.addEventListener('click', handleMode)

// 우클릭 방지
function noRightClick(e) {
  e.preventDefault()
}

if (canvas) {
  canvas.addEventListener('mousemove', mouseMove)
  canvas.addEventListener('mousedown', startPainting)
  canvas.addEventListener('mouseup', stopPainting)
  canvas.addEventListener('mouseout', stopPainting)
  canvas.addEventListener('click', fillCanvas)
  canvas.addEventListener('contextmenu', noRightClick)
}

// 브러쉬 사이즈 변경
const brushRange = document.querySelector('#jsRange')

function handleRange(e) {
  const size = e.target.valueAsNumber
  ctx.lineWidth = size
}

brushRange.addEventListener('input', handleRange)

// 컬러휠 클릭시 컬러픽커 z-index 변경
const colorPicker = document.querySelector('#CP')
const colorPickerBg = document.querySelector('#CP__bg')

function displayCP() {
  colorPicker.style.zIndex = '1'
  colorPicker.click()
}

colorPickerBg.addEventListener('click', displayCP)

// 브러쉬 컬러 변경
// 기본 제공 색상에서 가져오기
const colors = document.querySelectorAll('.jsColor')

function handleColor(e) {
  const color = e.target.style.backgroundColor
  ctx.strokeStyle = color
  ctx.fillStyle = color
}

colors.forEach(color => 
  color.addEventListener('click', handleColor)  
)

// 컬러픽커에서 가져오기
function handleColorPicker(e) {
  const color = e.target.value
  ctx.strokeStyle = color
  ctx.fillStyle = color
}

colorPicker.addEventListener('input', handleColorPicker)

// 저장하기
const saveBtn = document.querySelector('#jsSave')

function saveCanvas() {
  const image = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.href = image
  link.download = 'myCanvas'
  link.click()
}

saveBtn.addEventListener('click', saveCanvas)

// 새로 만들기
const resetBtn = document.querySelector('#jsReset')

function resetCanvas() {
  window.location.reload()
}

resetBtn.addEventListener('click', resetCanvas)