"use strict";
var canvas, ctx, reverse, limit, circleRadius, orbit1, orbit2, orbit3, buttonFill, button2Fill, button3Fill, orbit4, orbit5, colour, revx, revy, origX, origY;

function randomPosition() {return Math.floor(Math.random() * (limit + limit + 1) - limit);}

function init() {
    canvas = document.getElementById('Canvas');
    ctx = canvas.getContext('2d');
    ctx.canvas.width  =  window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    buttonFill = "black";
	button2Fill = "black";
	button3Fill = "black";
    origX  =  window.innerWidth;
    origY = window.innerHeight;
	
	console.log(origX + ", " + origY);

    revx = origX * 0.65;
    revy = origY;

    //circle properties
    reverse = false;
    limit = 250;
    circleRadius = 25;
    colour = "rgba(0,102,204,1)";
    orbit1 = randomPosition();
    orbit2 = randomPosition();
    orbit3 = randomPosition();
    orbit4 = randomPosition();
    orbit5 = randomPosition();
}
init();

function update() {ctx.scale(origX/ctx.canvas.width,origY/ctx.canvas.height);}

//circle class
var circle = function (color, r) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
};

var i = 0;

var redraw = function () {
    var state1 = ctx.save();

    //background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //draw  reverse button
    ctx.fillStyle=buttonFill;
    ctx.font = "30px Arial";
    //ctx.strokeRect(revx,revy - 30,120,30); //to see button bounds, for testing only
    ctx.fillText("Reverse", revx,revy);
	
	//draw + button
	ctx.fillStyle=button2Fill;
    ctx.font = "30px Arial";
    //ctx.strokeRect(revx + 140,revy - 30,40,30); //to see button bounds, for testing only
    ctx.fillText("+", revx + 150,revy);
	
	//draw - button
	ctx.fillStyle=button3Fill;
    ctx.font = "30px Arial";
    //ctx.strokeRect(revx + 180,revy - 30,40,30); //to see button bounds, for testing only
    ctx.fillText("-", revx + 195,revy);

    // center
    ctx.translate(window.innerWidth / 2, window.innerHeight / 2);
    
    //limit circle
    ctx.strokeStyle = "lightgrey";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(0, 0, limit, 0, 2 * Math.PI, true);
    ctx.stroke();

    
    
    //orbit
    ctx.rotate(i * Math.PI / 180);
    
    
    //draw circles
    ctx.save();
    ctx.translate(orbit1, limit - Math.abs(orbit1));
    circle(colour, circleRadius);
    ctx.restore();
    ctx.save();
    ctx.translate(orbit2, limit - Math.abs(orbit2));
    circle(colour, circleRadius);
    ctx.restore();
    ctx.save();
    ctx.translate(orbit3, limit - Math.abs(orbit3));
    circle(colour, circleRadius);
    ctx.restore();
    ctx.save();
    ctx.translate(orbit4, limit - Math.abs(orbit4));
    circle(colour, circleRadius);
    ctx.restore();
    ctx.translate(orbit5, limit - Math.abs(orbit5));
    circle(colour, circleRadius);
    ctx.restore(state1);
    
    if (reverse) {
        i -= 1;
    } else {
        i += 1;
    }
    
    window.requestAnimationFrame(redraw);
};

window.requestAnimationFrame(redraw);

canvas.addEventListener("mousemove", getMousePosition, false);
canvas.addEventListener("click", onclick, false);

function getMousePosition(e) {
    var parentPosition = getPosition(e.currentTarget);
    var xPosition = e.clientX - parentPosition.x;
    var yPosition = e.clientY - parentPosition.y;
    if (yPosition > (window.innerHeight) - 30 && xPosition > (canvas.width * 0.65) && yPosition < (canvas.height) + 30 && xPosition < (canvas.width * 0.65) +120) {
		console.log("inside button");
        buttonFill = "grey";
	} else if (yPosition > (window.innerHeight) - 30 && xPosition > (canvas.width * 0.65)+140 && yPosition < (canvas.height) + 30 && xPosition < (canvas.width * 0.65) +180) {
		button2Fill = "grey";
	} else if (yPosition > (window.innerHeight) - 30 && xPosition > (canvas.width * 0.65)+182 && yPosition < (canvas.height) + 30 && xPosition < (canvas.width * 0.65) +220) {
		button3Fill = "grey";
	} else {
        buttonFill = "black";
		button2Fill = "black";
		button3Fill = "black";
    }
}

function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;

    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

function onclick(e) { //make this better
    if (buttonFill === "grey") {
        console.log("click");
        reverse = !reverse;
    } else if (button2Fill === "grey") {
		circleRadius += 5;
	} else if (button3Fill === "grey") {
		circleRadius -= 5;
	} 
	

}