const svgns = 'http://www.w3.org/2000/svg'
const ballBox = document.querySelector('#backgroundBalls svg')
const viewHeight = document.querySelector('body').clientHeight
const viewWidth = document.querySelector('body').clientWidth
let ballRadius = Math.ceil(parseInt(viewHeight) * 0.3)
if (viewWidth < viewHeight) {
    ballRadius = Math.ceil(parseInt(viewWidth) * 0.3)
}
console.log(ballRadius)

function createBalls () {
  let startingX = ballRadius
  let startingY = ballRadius
  for (let i = 0; i < 8; i++) {
    const ball = document.createElementNS(svgns, 'circle')
    ball.setAttribute('cx', `${startingX}`)
    ball.setAttribute('cy', `${startingY}`)
    ball.setAttribute('r', `${ballRadius}`)
    ball.setAttribute('fill', 'url(#ballGradient)')
    ball.setAttribute('filter', 'url(#displacementFilter)')
    ballBox.appendChild(ball)
    startingX += 1
    startingY += 1
  }
}
createBalls()
const ballObj = {
  id: 0,
  ele: null,
  vector: [0,0],
  position: [0,0],
  radius: ballRadius
}
let ballList = []
const ballEleList = document.querySelectorAll('circle')
ballEleList.forEach((ele, i) => {
  let ball = Object.create(ballObj)
  ball.id = i
  ball.ele = ele
  ball.vector = [Math.round(Math.random()*(10 - 1) + 1), Math.round(Math.random()*(10 - 1) + 1)]
  ball.position = [ball.ele.cx.baseVal.value, ball.ele.cy.baseVal.value]
  ballList.push(ball)
})

function moveBall (ball) {
  
  setInterval(function () {
    ball.position[0] += ball.vector[0]
    ball.position[1] += ball.vector[1]
    if (ball.position[0] < ballRadius || ball.position[0] > ballBox.clientWidth - ballRadius) {ball.vector[0] = -ball.vector[0]}
    if (ball.position[1] < ballRadius || ball.position[1] > ballBox.clientHeight - ballRadius) {ball.vector[1] = -ball.vector[1]}
    ball.ele.setAttribute('cx', `${ball.position[0]}`)
    ball.ele.setAttribute('cy', `${ball.position[1]}`)
  }, fps)
}
const fps = 1000/24
ballList.forEach((ball) => {
  moveBall(ball)
})

let navOpen = false
const navButton = document.querySelector('nav button')
const navEle = document.querySelector('nav')

function openCloseNav () {
    let direction = 1,
    rightValue = -22
    if (navOpen) { direction = -1; rightValue = 0}
    const distance = [1,1,2,3,4,4,3,2,1,1]
    distance.forEach((distance, i) => {
        rightValue += distance * direction
        moveNav(rightValue, i)
    })
    if (navOpen) {
        navOpen = false;
        navButton.innerHTML = `<
         <div class='backdrop'></div>`
        return}
    navOpen = true
    navButton.innerHTML = `>
     <div class='backdrop'></div>`
    return
}
function moveNav(value, delayCount) {
    setTimeout(() => {
        navEle.style = `right: ${value}vw;`
    }, fps * delayCount)
}
navButton.addEventListener('click', openCloseNav)
