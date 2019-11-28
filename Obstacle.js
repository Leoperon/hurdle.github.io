function Obstacle(x, size, horizon, color) {

  this.x = x;
  this.y = horizon - size;
  this.size = size;
  this.color = color;
  this.onScreen = true;
}
Obstacle.prototype.update = function(speed) {

	this.onScreen = (this.x > -this.size);
	this.x -= speed;
};

Obstacle.prototype.draw = function() {

	fill(this.color);
	stroke(255);
	strokeWeight(2);
	rect(this.x, this.y, this.size, this.size);
};
Obstacle.prototype.hits = function(dino) {

	var halfSize = this.size / 2;
	var minimumDistance = halfSize + (dino.radius); 
	var xCenter = this.x + halfSize;
	var yCenter = this.y + halfSize;
    var distance = dist(xCenter, yCenter, dino.x, dino.y); 
    return (distance < minimumDistance); 
};
