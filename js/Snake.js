(function($){
	var game = {};
	$(document).ready(function(){
		var snake = new game.createSnake('snakeArea',{interval:100, size:4});
	});
	document.onkeypress = function (event) {
		alert(event.keyCode);
	};
	
	game.createSnake = function(canvasId, config){
		var gameArea = document.getElementById(canvasId);
		var components = new game.components(gameArea,config);	
		game.initSnake(components);
		game.drawSnake(gameArea,components);
		game.generateFood(gameArea,components);
		setInterval(function(){
			game.moveSnake(gameArea,components);
		},components.settings.interval);
	};
	game.components = function(gameArea, config){
		this.width = gameArea.width;
		this.height = gameArea.height;
		this.direction = 'right';
		this.snakeColor = '#0A4252';
		this.foodColor = '#DF310A';
		this.snakePosi = [];
		this.score = 0;
		this.settings = {
				cellWidth : 10,
				interval : 1000,
				size : 5
		};
		if(typeof config == 'object'){
			for(var key in config){
				if(this.settings.hasOwnProperty(key)){
					this.settings[key] = config[key];
				}
			}
		}
	};
	game.initSnake = function(components){
		for(var i =components.settings.size-1; i>=0; i--){			
			components.snakePosi.push({X:i,Y:1});
		}
		
	};
	game.generateFood = function(gameArea,components){
		var ctx = gameArea.getContext('2d');
		ctx.fillStyle = components.foodColor;
		var maxX = (components.width/components.settings.cellWidth)-1;
		var maxY = (components.height/components.settings.cellWidth)-1;
		var flag=0;
		var foodXPosi=0,foodYPosi=0;
		while(flag==0){
			foodXPosi = Math.random()*(maxX-1)+1;
			foodYPosi = Math.random()*(maxY-1)+1;			
			for(var posi in components.snakePosi){
				var eachPosi = components.snakePosi[posi];
				if(eachPosi.X != foodXPosi || eachPosi.Y != foodYPosi){
					flag = 1;
				}
			}
		}
		ctx.fillRect(foodXPosi*10,foodYPosi*10,9,9);
		
	};
	game.drawSnake = function(gameArea,components){
		var ctx = gameArea.getContext('2d');
		ctx.fillStyle = components.snakeColor;
		for(var posi in components.snakePosi){
			var eachPosi = components.snakePosi[posi];
			ctx.fillRect(eachPosi.X*10,eachPosi.Y*10,9,9);
		}
	};
	game.moveSnake = function(gameArea,components){
		var ctx = gameArea.getContext('2d');
		var headX = components.snakePosi[0].X;
		var headY = components.snakePosi[0].Y;
		switch(components.direction){
			case 'right':
				headX++;
				break;
			case 'left':
				headX--;
				break;
			case 'up':
				headY--;
				break;
			case 'down':
				headY++;
				break;
		}
		ctx.clearRect(components.snakePosi[components.snakePosi.length-1].X*10, components.snakePosi[components.snakePosi.length-1].Y*10, 9, 9);
		components.snakePosi.pop();
		components.snakePosi.unshift({X:headX,Y:headY});
		game.drawSnake(gameArea,components);
	};
	
}(jQuery));
