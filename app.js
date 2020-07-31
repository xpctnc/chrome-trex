
document.addEventListener('DOMContentLoaded', () => {

const container = document.querySelector('.container')
const dino = document.querySelector('.dino')

let isJumping = false
let isGameOver = false
let gravity = .9


	document.addEventListener('keyup', (e) => {
		if(e.keyCode === 32) {
			if(!isJumping) {
				isJumping = true
				jump()
			}
			
		}
	})

	let position = 0
	const jump = () => {
		let count = 0
		let timerId = setInterval(() => {

			

			//up
			position += 30
			count++
			position *= gravity
			console.log(position)
			dino.style.transform = `translateY(-${position}px)`

			//down
			if(count == 15) {
				clearInterval(timerId)
				let timerDown = setInterval(() => {
					if(count == 0) {
						clearInterval(timerDown)
						isJumping = false
						position = 0;
						dino.style.transform = `translateY(-${position}px)`

					}
					console.log(position)
					position -= 5
					count--
					position *= gravity

					dino.style.transform = `translateY(-${position}px)`
					
				},20)
				
			} 


		},20) 	
	}

	

	const generateObstacle = () => {

		let randomTime = Math.random() * 4000
		let obstaclePosition = 1000;
		
		let obstacle = document.createElement('div')
		if(!isGameOver){
			
			obstacle.classList.add('obstacle')
			container.appendChild(obstacle)
			obstacle.style.left = `${obstaclePosition}px`
		} 

		
		
		

		let timer = setInterval(() => {

			if(obstaclePosition > 0 && obstaclePosition < 50 && position < 50) {

					clearInterval(timer)
					isGameOver = true;
					while(container.firstChild) container.removeChild(container.lastChild)
					if(isGameOver) {
						alert("GameOver")
					}

					if(window.alert){
						isGameOver = false
						container.appendChild(dino)
					}
					
			}

			if(!isGameOver) {
				obstacle.style.left = `${obstaclePosition}px`
				obstaclePosition -= 10
			}
			

			
			
		},20)

		if(!isGameOver) setTimeout(generateObstacle, randomTime);

	}

	

	generateObstacle()
})



