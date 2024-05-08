const svgns = 'http://www.w3.org/2000/svg'
const ballBox = document.querySelector('#backgroundBalls svg')
console.log(ballBox)

function createBalls () {
  const radius = 100
  let startingX = 1000-200
  let startingY = 1000-200
  for (let i = 0; i < 4; i++) {
    const ball = document.createElementNS(svgns, 'circle')
    ball.setAttribute('cx', `${startingX}`)
    ball.setAttribute('cy', `${startingY}`)
    ball.setAttribute('r', `${radius}`)
    ball.setAttribute('fill', 'url(#ballGradient)')
    ball.setAttribute('filter', 'url(#displacementFilter)')
    ballBox.appendChild(ball)
    startingX -= 150
  }
}
createBalls()