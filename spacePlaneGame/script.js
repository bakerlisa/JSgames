//player	
var player = {
	left: 250,
	top: 550
};

var enemies = [
	{left:250, top:200},
	{left:300, top:250},
	{left:350, top:300},
	{left:400, top:350}
];

var missiles = [];

var worldDimensions = {
	height: 700,
	width: 800
}
document.getElementById('world').style.height = worldDimensions.height + "px";
document.getElementById('world').style.width = worldDimensions.width + "px";

function drawPlayer(){
	let content = '<div class="player" style="top:'+player.top+'px; left:'+player.left+'px;"></div>';
	document.getElementById('players').innerHTML = content;
}

function drawEnemenies(){
	content = "";
	for(var enm=0;enm<enemies.length;enm++){
		content += '<div class="enemy" style="top:'+enemies[enm].top+'px; left:'+enemies[enm].left+'px;"></div>';
		document.getElementById('enemines').innerHTML = content;
	}
}

function drawMissiles(){
	content = "";
	for(var mis=0;mis<missiles.length;mis++){
		content += '<div class="missile" style="top:'+missiles[mis].top+'px; left:'+missiles[mis].left+'px;"></div>';
	}
	document.getElementById('missiles').innerHTML = content;
}

function moveEnemies(){
	for(var enm=0;enm<enemies.length;enm++){
		if((enemies[enm].top + 5) > worldDimensions.height){
			enemies[enm].top = 0; 
			enemies[enm].left = randomIntFromInterval(50,(worldDimensions.width - 50)); 
		}else{
			enemies[enm].top = (enemies[enm].top + 1);
		}
	}	
}	

function moveMissiles(){
	for(var mis=0;mis<missiles.length;mis++){
		if((missiles[mis].top + 5) < 0){
			 missiles.splice(missiles[mis],1);
		}else{	
			missiles[mis].top = (missiles[mis].top - 4); 
		}
	}		
}

document.onkeydown = function(e){
	if(e.keyCode == 37) { // LEFT
		if((player.left - 10) > 0){	
			player.left = player.left  - 10;
		}
	}else if(e.keyCode == 39 && (player.left + 10 + 100) < worldDimensions.width){// RIGHT		
		player.left = player.left  + 10;
	}else if(e.keyCode == 38 && (player.top - 10) > ((worldDimensions.height / 3) * 2) - 50){// UP	
		player.top = player.top  - 10;
	}else if(e.keyCode == 40 && (player.top + 10 + 100) < worldDimensions.height){// DOWN
		player.top = player.top  + 10;
	}else if(e.keyCode == 32){// FIRE
		missiles.push({left: (player.left + 34), top: (player.top - 8)});
		drawMissiles();
	}
	drawPlayer();

}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function gameLoop(){
	console.log("game loop is running");
	drawPlayer();

	moveEnemies();
	drawEnemenies();

	moveMissiles();
	drawMissiles();

	setTimeout(gameLoop,10);
}
gameLoop();
