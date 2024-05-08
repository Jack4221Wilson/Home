const svgns = 'http://www.w3.org/2000/svg'
const ballBox = document.querySelector('#backgroundBalls svg')

function createBalls () {
  const radius = 300
  let startingX = 1000-300
  let startingY = 1000-300
  for (let i = 0; i < 8; i++) {
    const ball = document.createElementNS(svgns, 'circle')
    ball.setAttribute('cx', `${startingX}`)
    ball.setAttribute('cy', `${startingY}`)
    ball.setAttribute('r', `${radius}`)
    ball.setAttribute('fill', 'url(#ballGradient)')
    ball.setAttribute('filter', 'url(#displacementFilter)')
    ballBox.appendChild(ball)
    startingX -= 50
    startingY -= 50
  }
}
createBalls()
const ballObj = {
  id: 0,
  ele: null,
  vector: [0,0],
  position: [0,0],
  radius: 100
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
console.log(ballList)

function moveBall (ball) {
  
  setInterval(function () {
    ball.position[0] += ball.vector[0]
    ball.position[1] += ball.vector[1]
    if (ball.position[0] < 300 || ball.position[0] > ballBox.clientWidth - 300) {ball.vector[0] = -ball.vector[0]}
    if (ball.position[1] < 300 || ball.position[1] > ballBox.clientHeight - 300) {ball.vector[1] = -ball.vector[1]}
    ball.ele.setAttribute('cx', `${ball.position[0]}`)
    ball.ele.setAttribute('cy', `${ball.position[1]}`)
  }, fps)
}
const fps = 1000/24
ballList.forEach((ball) => {
  moveBall(ball)
})

