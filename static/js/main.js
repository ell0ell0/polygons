var Polygon = function() {

	this.currentIteration = 0;

	// the colors, duke, the colors
	this.colors = [
		{ r: 67, g: 146, b: 42, a: 0.75 },
		{ r: 99, g: 102, b: 106, a: 0.75 },
		{ r: 208, g: 208, b: 206, a: 0.75 },
		{ r: 173, g: 220, b: 145, a: 0.75 },
		{ r: 219, g: 237, b: 212, a: 0.75 },
		{ r: 0, g: 153, b: 0, a: 0.75 }
	];

	// get context and set canvas width
	this.context = document.querySelector('canvas').getContext('2d');
	this.size = 300;

	// GRID SIZE
	this.oppositeLength = this.getOppositeLength(9, this.size) * -1;
	this.context.canvas.width = this.size;
	this.context.canvas.height = this.size;

	this.step = 2;
	this.yVals = [];

	this.numDivisions = Math.floor( this.size / (this.oppositeLength/this.step) );

	for (var i = 0; i < this.numDivisions; i++) {
		this.yVals[i] = i * this.oppositeLength/this.step;
	};

	// for (var i = 0; i < this.numDivisions; i++) {
	// 	this.context.save();
	// 	this.context.beginPath();
	// 	this.context.beginPath();
	// 	this.context.rect(0, this.yVals[i], 5, 5);
	// 	this.context.fillStyle = 'rgb(208,208,206)';
	// 	this.context.fill();
	// 	this.context.restore();
	// };
	// for (var i = 0; i < this.numDivisions; i++) {
	// 	this.context.save();
	// 	this.context.beginPath();
	// 	this.context.beginPath();
	// 	this.context.rect(this.size - 5, this.yVals[i], 5, 5);
	// 	this.context.fillStyle = 'rgb(208,208,206)';
	// 	this.context.fill();
	// 	this.context.restore();
	// };
};

/**
 *  Initialize this mother
 **/

Polygon.prototype.init = function(speed, iterations, alpha) {

	// ms between drawing
	this.speed = speed || 5;
	// number of times to draw
	this.iterations = iterations || 1;

	this.alpha = alpha || 0.75;

	var startX = Math.round( Math.random() * this.context.canvas.width ),
			startY = Math.round( Math.random() * this.context.canvas.height );

	this.loop();
};


/**
 *  The main loop
 **/

Polygon.prototype.loop = function() {

	var self = this;

	if (this.currentIteration <= this.iterations) {
		this.drawPolygon();
		this.currentIteration++;

		window.setTimeout(function(){
			self.loop();
		}, self.speed);
	}
};

/**
 *  Draws a polygon 
 **/

 Polygon.prototype.drawPolygon = function() {
	this.context.save();
	this.context.beginPath();

	var p1,p2,p3,p4;

	if(this.currentIteration % 2) {
		var topY = Math.round( this.map( Math.random(), 0, 1, this.step, this.numDivisions - this.step - this.step/2) );
		var bottomY = Math.round( this.map( Math.random(), 0, 1, topY + 1, this.numDivisions - this.step - 1 ) );

		p1 = { x: this.size, y: this.yVals[topY - this.step] };
		p2 = { x: 0, y: this.yVals[topY]};
		p3 = { x: 0, y: this.yVals[bottomY]};
		p4 = { x: this.size, y: this.yVals[bottomY + this.step] };
		this.context.fillStyle = "rgba(" + 173 + "," + 220 + "," + 145 + "," + this.alpha + ")";
	} else {
		var topY = Math.round( this.map( Math.random(), 0, 1, this.step, this.numDivisions - this.step - this.step/2) );
		var bottomY = Math.round( this.map( Math.random(), 0, 1, topY + 1, this.numDivisions - this.step - 1 ) );

		p1 = { x: 0, y: this.yVals[topY - this.step] };
		p2 = { x: this.size, y: this.yVals[topY]};
		p3 = { x: this.size, y: this.yVals[bottomY]};
		p4 = { x: 0, y: this.yVals[bottomY + this.step] };
		this.context.fillStyle = "rgba(" + 0 + "," + 153 + "," + 0 + "," + this.alpha + ")";
	}

	this.context.moveTo(p1.x, p1.y);
	this.context.lineTo(p2.x, p2.y);
	this.context.lineTo(p3.x, p3.y);
	this.context.lineTo(p4.x, p4.y);

	this.context.fill();
	this.context.closePath();
	this.context.restore();
 };

/**
 *  Utility function to check if point is on the canvas
 **/

Polygon.prototype.isOnCanvas = function(inputPosX, inputPosY) {

	return (inputPosX > 0 && inputPosX < this.context.canvas.width && inputPosY > 0 && inputPosY < this.context.canvas.height) ? true : false;
	
};

Polygon.prototype.getOppositeLength = function(angle, adjacent) {

	return (adjacent * Math.tan(angle))/3;

}

Polygon.prototype.map = function(value, inputMin, inputMax, outputMin, outputMax, clamp){
	var outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);
	if( clamp ){
		if(outputMax < outputMin){
			if( outVal < outputMax )outVal = outputMax;
			else if( outVal > outputMin )outVal = outputMin;
		}else{
			if( outVal > outputMax )outVal = outputMax;
			else if( outVal < outputMin )outVal = outputMin;
		}
	}
	return outVal;
}


/**
 *  When the DOM is ready...
 **/

$(function() {

	var POLYGONS = new Polygon();
	POLYGONS.init();

	$('#slider').on('change', function() {
		//console.log($('#slide').val());
		$('#ammount').text($('#slide').val());
		$('#ammount2').text($('#slide2').val());
			var POLYGONS = new Polygon();
			POLYGONS.init(5, $('#slide').val()-1, $('#slide2').val());
	});
	$('#slider2').on('change', function() {
		//console.log($('#slide').val());
		$('#ammount').text($('#slide').val());
		$('#ammount2').text($('#slide2').val());
			var POLYGONS = new Polygon();
			POLYGONS.init(5, $('#slide').val()-1, $('#slide2').val());
	});

});
