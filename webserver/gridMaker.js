let height = Math.round(window.innerHeight / 64),
width = Math.round(window.innerWidth / 64),
windowCenter = [width/2, height/2]
const bgColorHue = Math.floor(Math.random() * 360),
bgColorSaturation = Math.floor(Math.random() * 50) + 50,
bgColorLight = Math.floor(Math.random() * 40) + 40,
gridColorSaturation = Math.floor(Math.random() * 50) + 50,
gridColorLight = Math.floor(Math.random() * 40) + 40
let gridColorHue = bgColorHue + 180
if (gridColorHue > 360) {gridColorHue -= 360}
let eleCount = 1
const body = document.querySelector('body'),
head = document.querySelector('head')

const animationStyles = document.createElement('style')
animationStyles.innerHTML = `
@keyframes background-transition {
  from {
    background-position: 0% 0%
  }
  to {
    background-position: 400% 0%
  }
}
`
head.appendChild(animationStyles)

body.setAttribute('style', `
animation: 6s infinite background-transition;
animation-timing-function: linear;
background-image: linear-gradient(90deg,
  hsl(${bgColorHue}, ${bgColorSaturation}%, ${bgColorLight}%),
  hsl(${bgColorHue}, ${bgColorSaturation}%, ${bgColorLight-20}%),
  hsl(${bgColorHue}, ${bgColorSaturation}%, ${bgColorLight}%),
  hsl(${bgColorHue}, ${bgColorSaturation}%, ${bgColorLight + 20}%),
  hsl(${bgColorHue}, ${bgColorSaturation}%, ${bgColorLight}%));
background-size: 400% 100%;
`)

const heroDiv = document.querySelector('.hero')
heroDiv.setAttribute('style', `grid-template-columns: repeat(${width}, 1fr); grid-template-rows: repeat(${height}, 1fr);`)
let grid = []
console.log(grid)
var columnStart = 1
var rowStart = 1

body.addEventListener('load', startup())

function startup() {
  for (let i=0; i < height; i ++) {
    let lineOfY = []
    for (let j=0; j < width; j ++) { lineOfY.push(false)}
    grid.push(lineOfY)
  }
  console.log('at the start', grid)

  while (columnStart <= width || rowStart <= height) {
    createEle()
  }
  
  
}

function createEle() {
  const gridEle = document.createElement('div')
  const oldGrid = grid
  var newGrid = oldGrid
  gridEle.className = 'grid-container'
  let ranWidth = Math.floor(Math.random() * 5) + 1,
  ranHeight =  Math.floor(Math.random() * 5) + 1

  checkStart()
  let eleWidth = shrinkWidth(ranWidth)
  let eleHeight = shrinkHeight(ranHeight)
  if (columnStart > width || rowStart > height) {return}

  if (columnStart + eleWidth > width + 1){
    while ((columnStart + eleWidth) > (width + 1)){
      eleWidth--
    }
  }
  let centerPoint = [columnStart + (eleWidth/2) -1, rowStart + (eleHeight/2) -1 ],
  boxX = -(centerPoint[0]-windowCenter[0]),
  boxY = -(centerPoint[1]-windowCenter[1])

  gridEle.setAttribute('style', `
    grid-column: ${columnStart} / ${columnStart + eleWidth};
    grid-row: ${rowStart} / ${rowStart + eleHeight};
    background-color: hsl(${gridColorHue}, ${gridColorSaturation}%, ${gridColorLight}%);
    box-shadow: inset ${boxX}px ${boxY}px white;
    
  `)
  /*
  background-image: conic-gradient(hsl(${gridColorHue}, ${gridColorSaturation}%, ${gridColorLight}%),
      hsl(${gridColorHue}, ${gridColorSaturation}%, ${gridColorLight + 30}%),
      hsl(${gridColorHue}, ${gridColorSaturation}%, ${gridColorLight}%),
      hsl(${gridColorHue}, ${gridColorSaturation}%, ${gridColorLight - 30}%),
      hsl(${gridColorHue}, ${gridColorSaturation}%, ${gridColorLight}%));
  */
  for(let i = rowStart; i < rowStart + eleHeight; i++){    
    for(let j = columnStart; j < columnStart+eleWidth; j++){
      newGrid[i-1][j-1] = true
    }
  }
  grid = newGrid
  console.log(`${eleCount}`)
  columnStart = columnStart + eleWidth
  heroDiv.appendChild(gridEle)
  eleCount++
}
function checkStart() {
  if (columnStart > width) {rowStart++; columnStart = 1}
  if (grid[rowStart-1][columnStart-1] == true) {columnStart++} else {return}
  if (columnStart <= width || rowStart <= height) {checkStart()}
}
function shrinkWidth(oldWidth) {
  let newWidth = 1
  for(let i=0; i < oldWidth; i++ ) {
    if (grid[rowStart-1][columnStart+i]) {return newWidth} else {newWidth++}
  }
  return oldWidth
}
function shrinkHeight(oldHeight){
  let newHeight = 1
  for (let i=0; i < oldHeight; i++) {
    if (rowStart + newHeight > height) {return newHeight} else {newHeight++}
  }
  return newHeight
}