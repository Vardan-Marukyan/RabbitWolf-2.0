	let btnStart = document.querySelector("#button_strat")
	let board = document.querySelector(".board")
	let status = document.querySelector(".status")
	let boardDiv = document.querySelector(".boardDiv")
	let startAgain = document.querySelector("#startAgain")
	let h1 = document.querySelector("#h1")

	BOX_SIZE = 63
	FREE_CELL = 0
	RABBIT_CELL = 1
	WOLF_CELL = 2
	HOME_CELL = 3
	BAN_CELL = 4
	
	const gameimg = {
		[RABBIT_CELL] : {
			name: "rabbit",
			src: "img/rabbit.png"
		},

		[WOLF_CELL] : {
			name: "wolf",
			src: "img/gamewolf.png",
			wolfmove: [FREE_CELL, RABBIT_CELL]
		},
		[BAN_CELL]:{
			name: "ban",
			src: "img/ban.png"
		},
		[HOME_CELL]:{
			name: "home",
			src: "img/home.png"
		}
	}



	function getMatrix() {
		matrix = []
		for(i = 0; i<=getSelectValue() - 1; i++){
			matrix[i] = []
			for (j = 0; j<= getSelectValue() - 1; j++){
				matrix[i][j] = FREE_CELL
			}
		}
		return matrix
	}

	function getRandomNomber(){
		y = Math.floor(Math.random()*getSelectValue())
		x = Math.floor(Math.random()*getSelectValue())

		if(matrix[y][x] == FREE_CELL){
				const arrXY = [y,x]
				return arrXY
		}else{
			return getRandomNomber()
		}
	}


	function getRabbit(){
		yxRabbit = getRandomNomber()
		matrix[yxRabbit[0]][yxRabbit[1]] = RABBIT_CELL
	}

	function rabbitLeft(){
		if(event.code == "ArrowLeft"){
			XrabbitLeft = yxRabbit[1] - 1
			matrix[yxRabbit[0]][yxRabbit[1]] = FREE_CELL
			if (XrabbitLeft == -1){
				if(matrix[yxRabbit[0]][getSelectValue() - 1] != BAN_CELL){
					yxRabbit[1] = getSelectValue()-1
			}}
			else{
				if(matrix[yxRabbit[0]][XrabbitLeft] != BAN_CELL){
					yxRabbit[1] -= 1
				}}
			matrix[yxRabbit[0]][yxRabbit[1]] = RABBIT_CELL
	}}

	function rabbitRight(){
		if(event.code == "ArrowRight"){
			XrabbitRight = yxRabbit[1] + 1
			matrix[yxRabbit[0]][yxRabbit[1]] = FREE_CELL
			if (XrabbitRight == getSelectValue()){
				if(matrix[yxRabbit[0]][0] != BAN_CELL){
					yxRabbit[1] = 0
			}}
			else{
				if(matrix[yxRabbit[0]][`${yxRabbit[1] +1}`] != BAN_CELL){
					yxRabbit[1] += 1
				}}
				matrix[yxRabbit[0]][yxRabbit[1]] = RABBIT_CELL
		}}

	

	function rabbitUp(){
		if(event.code == "ArrowUp"){
			YrabbitUp = yxRabbit[0] - 1
			matrix[yxRabbit[0]][yxRabbit[1]] = FREE_CELL
			if(YrabbitUp != -1){
				if(matrix[`${yxRabbit[0] -1}`][yxRabbit[1]] != BAN_CELL){
					yxRabbit[0] -= 1
				}}
			else{
				if(matrix[getSelectValue() - 1][yxRabbit[1]] != BAN_CELL){
					yxRabbit[0] = getSelectValue() - 1
				}}
			matrix[yxRabbit[0]][yxRabbit[1]] = RABBIT_CELL
		}}

	function rabbitDown(){
		if(event.code == "ArrowDown"){
			YrabbitDown = yxRabbit[0] + 1
			matrix[yxRabbit[0]][yxRabbit[1]] = FREE_CELL
			if(YrabbitDown != getSelectValue()){
				if(matrix[YrabbitDown][yxRabbit[1]] != BAN_CELL){
					yxRabbit[0] += 1
				}}
			else{
				if(matrix[0][yxRabbit[1]] != BAN_CELL){
					yxRabbit[0] = 0
			}}
		matrix[yxRabbit[0]][yxRabbit[1]] = RABBIT_CELL
	}}

	function getHome(){
		yxHome = getRandomNomber()
		matrix[yxHome[0]][yxHome[1]] = HOME_CELL
	}

	function getWolf(){
		wolfArray = []
		wolfQuantity = Math.ceil( getSelectValue() * getSelectValue() / 100 * 10 )
		if(getSelectValue() >= 9){
			wolfQuantity = Math.ceil( getSelectValue() * getSelectValue() / 100 * 5 )
		}
		for(i = 0; i<= wolfQuantity - 1; i++){
			wolfArray[i] = []
			for(j = 0; j<= 0; j++){
				yxWolf = getRandomNomber()
				wolfArray[i][j] = yxWolf[0]
				wolfArray[i][j+1] = yxWolf[1]
			}
			matrix[yxWolf[0]][yxWolf[1]] = WOLF_CELL
		}
	}

	function wolfPlace(){
		wolfPlaceArray = []
		for(i = 0; i<wolfArray.length; i++){
			wolfPlaceArray[i] = []
			for(j = 0; j <= 0; j++){
				wolfPlaceArray[i][j] = wolfArray[i][0]
				wolfPlaceArray[i][j+1] = wolfArray[i][1]
			}
		}
		return wolfPlaceArray
	}

	function moveWolfUpDown(){
				if(yxRabbit[0] > wolfArray[i][0]){
					if(matrix[`${wolfArray[i][0] + 1}`][wolfArray[i][1]] == FREE_CELL || matrix[`${wolfArray[i][0] + 1}`][wolfArray[i][1]] == RABBIT_CELL){
						matrix[wolfArray[i][0]][wolfArray[i][1]] = FREE_CELL
						wolfArray[i][0] += 1
						matrix[wolfArray[i][0]][wolfArray[i][1]] = WOLF_CELL
					}}
				if(yxRabbit[0] < wolfArray[i][0]){
						if(matrix[`${wolfArray[i][0] - 1}`][wolfArray[i][1]] == FREE_CELL || matrix[`${wolfArray[i][0] - 1}`][wolfArray[i][1]] == RABBIT_CELL ){
							matrix[wolfArray[i][0]][wolfArray[i][1]] = FREE_CELL
							wolfArray[i][0] -= 1
							matrix[wolfArray[i][0]][wolfArray[i][1]] = WOLF_CELL
					}}
			}

	function moveWolfLeftRight(){
				if(yxRabbit[1] > wolfArray[i][1]){
					if(matrix[wolfArray[i][0]][`${wolfArray[i][1] + 1}`] == FREE_CELL || matrix[wolfArray[i][0]][`${wolfArray[i][1] + 1}`] == RABBIT_CELL){
						matrix[wolfArray[i][0]][wolfArray[i][1]] = FREE_CELL
						wolfArray[i][1] += 1
						matrix[wolfArray[i][0]][wolfArray[i][1]] = WOLF_CELL
					}}
				if(yxRabbit[1] < wolfArray[i][1]){
					if(matrix[wolfArray[i][0]][`${wolfArray[i][1] - 1}`] == FREE_CELL || matrix[wolfArray[i][0]][`${wolfArray[i][1] - 1}`] == RABBIT_CELL){
						matrix[wolfArray[i][0]][wolfArray[i][1]] = FREE_CELL
						wolfArray[i][1] -= 1
						matrix[wolfArray[i][0]][wolfArray[i][1]] = WOLF_CELL
					}}
			}

	function moveWolfRandom(){
		for(i = 0; i < wolfArray.length; i++){
			wolfMoveRandom = Math.floor(Math.random() * 2)
			if (wolfMoveRandom == 0){
				moveWolfUpDown()
				if(wolfPlaceArray[i][0] == wolfArray[i][0]){
					if(wolfPlaceArray[i][1] == wolfArray[i][1]){
						moveWolfLeftRight()
				}
			}
			}
			if(wolfMoveRandom ==  1){
				moveWolfLeftRight()
				if(wolfPlaceArray[i][0] == wolfArray[i][0]){
					if(wolfPlaceArray[i][1] == wolfArray[i][1]){
						moveWolfUpDown()
				}
			}
			}

		}

}

	function getBan(){
		BanQuantity = Math.ceil( getSelectValue() * getSelectValue() / 100 * 6)
		if(getSelectValue() == 10){
			BanQuantity = 4
		}
		for(i = 0; i < BanQuantity; i++){
			yxBan = getRandomNomber()
			matrix[yxBan[0]][yxBan[1]] = BAN_CELL
		}

	}

	function createDivMatrix(){
		board.innerHTML = ""
		boardNomber= 0
		for(i = 0; i<=getSelectValue() - 1; i++){
			for(j = 0; j <= getSelectValue() - 1; j++){
					createDiv = document.createElement("div")
					createDiv.id = `cell${boardNomber}`  
					board.appendChild(createDiv)
					boardNomber++
				}
			}
		}

	function getSelectValue(){
		getValue = document.querySelector("#play_select").value
		return getValue
	}

	function boxSize(){
		size = getSelectValue()
		boxWidth = size * BOX_SIZE
		board.style.width = boxWidth + "px"
	}

	function returnGameImg(){
		boardNomber= 0
		for(i = 0; i<=getSelectValue() - 1; i++){
			for(j = 0; j <= getSelectValue() - 1; j++){
					if(matrix[i][j] > 0){
						image = document.createElement("img")
						image.src = gameimg[matrix[i][j]].src
						image.name = gameimg[matrix[i][j]].name
						serchDiv = document.querySelector(`#cell${boardNomber}`)
						serchDiv.appendChild(image)
					}
					boardNomber++
				}
			}
	}

	function statusGame(){
		if(matrix[yxRabbit[0]][yxRabbit[1]] == matrix[yxHome[0]][yxHome[1]]){
			boardDiv.style.display = "none"
			status.style.display = "block"
			h1.innerHTML = "YOU WON"
		}
		for(i = 0; i<wolfArray.length; i++){
			if(matrix[wolfArray[i][0]][wolfArray[i][1]] == matrix[yxRabbit[0]][yxRabbit[1]] ){
				boardDiv.style.display = "none"
				status.style.display = "block"
			}
		}
	}

	function start(){
		getMatrix()
		getWolf()
		getBan()
		getHome()
		getRabbit()
		boxSize()
		createDivMatrix()
		returnGameImg()
	}
	
	document.addEventListener("keyup", function(event) {
		wolfPlace()
		rabbitRight()
		rabbitLeft()
		rabbitUp()
		rabbitDown()
		moveWolfRandom()
		createDivMatrix()
		returnGameImg()
		statusGame()
	})

	btnStart.addEventListener("click", function(){
		start()
	})

	startAgain.addEventListener("click", function(){
		boardDiv.style.display = "flex"
		status.style.display = "none"
		h1.innerHTML = "Game Over"
		start()
})