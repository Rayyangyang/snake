//初始化函数
var box = document.getElementsByClassName('box')[0];
var btn = document.getElementsByTagName('button')[0];
var score = document.getElementsByClassName('score')[0];
var replay = document.getElementsByClassName('replay')[0];
var lastScore = document.getElementsByClassName('lastScore')[0];
var timer = null;
init();
function init(){
	//获取地图属性
	this.mapW = parseInt(getComputedStyle(box,false).width);
	this.mapH = parseInt(getComputedStyle(box,false).height);
	// console.log(this.mapH);
	// 设置food的属性
	this.foodW = 20;
	this.foodH = 20;
	this.foodX;
	this.foodY;
	// 设置snake属性
	this.snakeW = 20;
	this.snakeH = 20;
	this.snakeBody = [[1,1,'body']]
	// 设置移动属性
	this.dir = 'right';
	this.left = false;
	this.right = false;
	this.top = true;
	this.down = true;
	this.grade = 0;
	this.key = true;
}
btn.onclick = startGame;
replay.onclick = startGame;
function startGame(){
	food();
	snake();
	// move();
	timer = setInterval(function(){
		move();
	},200)
	bindEvent();
	btn.style.display = 'none';
    score.style.display = 'none';	
}
function food(){
	var food = document.createElement('div');
	food.style.width = this.foodW + 'px';
	food.style.height = this.foodH + 'px';
	food.style.position = 'absolute';
	this.foodX = parseInt(Math.random()* this.mapW / 20);
	this.foodY = parseInt(Math.random()* this.mapH / 20);
	food.style.left = this.foodX * 20 + 'px';
	food.style.top = this.foodY*20 + 'px';
	food.setAttribute('class', 'food');
	box.appendChild(food);
}
function snake(){
	var len = this.snakeBody.length;
	for(var i = 0; i< len; i ++){
		var snake = document.createElement('div');
		snake.style.width = this.snakeW + 'px';
		snake.style.height = this.snakeH + 'px';
		snake.style.position = 'absolute';
		snake.style.left = this.snakeBody[i][0]*20 + 'px';
		snake.style.top = this.snakeBody[i][1]*20 + 'px';
		box.appendChild(snake).setAttribute('class', 'snake');
	}
}
function move(){
	for(var i = this.snakeBody.length - 1; i > 0 ; i --){
		this.snakeBody[i][0] = this.snakeBody[i - 1][0];
		this.snakeBody[i][1] = this.snakeBody[i - 1][1];
	}
	switch(this.dir){
		case 'right':
			this.snakeBody[0][0] += 1;
			break;
		case 'left' :
			this.snakeBody[0][0] -= 1;
			break;
		case 'top' : 
			this.snakeBody[0][1] -= 1;
			break;
		case 'down':
			this.snakeBody[0][1] += 1;
			break;
		default:
			break;
	}
	removeClass('snake');
	snake();
	if(this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY){
		this.endX = this.snakeBody[this.snakeBody.length - 1][0];
		this.endY = this.snakeBody[this.snakeBody.length - 1][1];
		switch(this.dir){
			case 'right':
				this.snakeBody.push([this.endX + 1 , this.endY, 'body']);
				break;
			case 'left':
				this.snakeBody.push([this.endX - 1, this.endY, 'body']);
				break;
			case 'top': 
				this.snakeBody.push([this.endX, this.endY - 1, 'body']);
				break;
			case 'down': 
				this.snakeBody.push([this.endX, this.endY + 1, 'body']);
				break;
		}
		removeClass('food');
		this.grade ++;
		food();
	}
	 // 判断撞到边界
	 if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH / this.snakeH) {
		this.reloadGame();
		console.log(11);
    }
    if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW / this.snakeW) {
		this.reloadGame();
		console.log(22)
    }
}
function setDirect(code){
	// console.log(code);
	switch(code){
		case 37:
			if(this.left){
				this.dir = 'left';
				this.left = false;
				this.right = false;
				this.top = true;
				this.down = true;
			};
			break;
		case 38:
			if(this.top){
				this.dir = 'top';
				this.left = true;
				this.right = true;
				this.top = false;
				this.down = false;
			};
			break;
		case 39:
			if(this.right){
				this.dir = 'right';
				this.left = false;
				this.right = false;
				this.top = true;
				this.down = true;
			};
			break;
		case 40:
			if(this.down){
				this.dir = 'down';
				this.left = true;
				this.right = true;
				this.top = false;
				this.down = false;
			};
			break;
		default:
			break;
	}
}
function bindEvent(){
	document.onkeydown = function(e){
		var code = e.keyCode;
		setDirect(code);
	}
}
function removeClass(className){
	var name = document.getElementsByClassName(className);
	while(name.length > 0){
		name[0].parentNode.removeChild(name[0]);
	}
}
function reloadGame(){
	removeClass('snake');
    removeClass('food');
    clearInterval(timer);
    this.dir = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
	this.down = true;
	this.snakeBody = [[1,1,'body']]
    score.style.display = 'block';
	lastScore.innerHTML = this.grade;
	this.grade = 0;
}