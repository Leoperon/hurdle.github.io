var horizon;
var obstacleSpeed;
var score;
var obstacles = [];
var den;
function setup() {

  createCanvas(600, 200);
  textAlign(CENTER);
  horizon = height - 40;
  score = 0;
  obstacleSpeed = 6;
  var size = 20;
  den = new Ball(size * 2, height - horizon, size);
  textSize(20);
}
function draw() {
  background(51);
  drawHUD();
  handleLevel(frameCount);
  den.update(horizon);
  handleObstacles();
}

function drawHUD() {
 stroke(255);
 strokeWeight(2);
 line(0, horizon, width, horizon);
 noStroke();
 text("Score: " + score, width / 2, 30);
 den.draw();
}
function handleObstacles() {

  for (var i = obstacles.length - 1; i >= 0; i--) {

		obstacles[i].update(obstacleSpeed);
		obstacles[i].draw();
        if (obstacles[i].hits(den)) 
			endGame();
        if (!obstacles[i].onScreen) 
           obstacles.splice(i, 1); 
  }
}
function handleLevel(n) {

  if (n % 30 === 0) { 
    var n = noise(n); 
    if (n > 0.5)
      newObstacle(n); 
      if (n % 120 === 0) 
	    obstacleSpeed *= 1.05; 
  }
  score++;
}
function newObstacle(n) {

	var col = color(random(255), random(255), random(255));
	var size = random(30) + 20;
    var obs = new Obstacle(width + size, size, horizon, col);
    obstacles.push(obs);
}

function keyPressed() {

	if ((keyCode === UP_ARROW || keyCode === 32) && den.onGround) 
		den.jump();
}
function endGame() {
  noLoop();
  noStroke();
  textSize(40);
  text("GAME OVER", width / 2, height / 2);
  textSize(20);
  text("Press f5 to restart", width / 2, height / 2 + 20);
}
