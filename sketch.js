
let backgroundimage; //variable to establish background image
let tower;
let city; 
let sound = false;
let rustle;
let growing = false;
let resize= false; // second growing variable established 
let showText = true; // variable to control text display

let width = 1450; // Both properties establish the size of the overlay image 
let height = 790;


//Establishing the width and height of the city image
let w = 175;
let h = 150;

let leaves =[]; // an array that will hold our shapes
let numberOfLeaves = 1500; // how many shapes to draw
let mouseThreshold = 15; // how close can your mouse get to a shape before it moves
let moveDistance = 150; // how far shapes move away from your mouse
let animateDistance = 50; // how much each shape animates 

// create a "shape" class that holds all information about each shape
class Shape {
  constructor(){
  //the area in which the circles will appear
  this.x = random(700,1400); //A random x position for each circle
  this.y = random(50,400); //A random y position for each circle

 this.radius = random(5, 25);
 this.color = color(random(), random(200, 255,0), random(40, 255,200));
  }
// My first attempt at establishing the qualities of the leaves Tom helped me with this part where I then incrporated my own ideas into 
    //leaves[0] = genLeaves(800, 325,numberOfLeaves);
    //leaves[1] = genLeaves(700, 400,numberOfLeaves);
    //leaves[2] = genLeaves(950, 325,numberOfLeaves);
    //leaves[3] = genLeaves(1050, 400,numberOfLeaves)
    //leaves[4] = genLeaves(1100, 100,numberOfLeaves)

     //ellipse(leaf.x,leaf.y,leaf.w, leaf.h)
 
  // create a function that moves a shape away from your mouse
  updateShape() {
    let mouseDistance = int(dist(this.x, this.y, mouseX, mouseY)); // check the distance from your mouse to the shape
    if (mouseDistance <= mouseThreshold) { // if your mouse gets closer than the threshold...
      this.x += random(-moveDistance, moveDistance); // give the shape a new x position
      this.y += random(-moveDistance, moveDistance); // and a new y position
    }
  }

  // create a function to animate each shape
  animateShape(){
    this.x = lerp(this.x, random(this.x - animateDistance, this.x + animateDistance), 0.01);
    this.y = lerp(this.y, random(this.y - animateDistance, this.y + animateDistance), 0.01);
  }

  // create a function to draw each shape
    drawShape() {
    noStroke();  
    fill(this.color);
    ellipse(this.x, this.y, this.radius, this.radius);
  }
}
//Preload images and sound onto the screen due to file size
function preload() { 
  backgroundimage = loadImage('images/background.jpg');
  tower = loadImage('images/tower.JPEG');
  city = loadImage('images/city.jpeg');
  rustle = loadSound ('leaf-movement.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight); // create a canvas that fills the whole screen


for (let i = 0; i < numberOfLeaves; i++) {

    leaves.push(new Shape());
  }
}

function draw() {
image(backgroundimage,0,0,windowWidth, windowHeight);
//overlay image that will expand when mouse is clicked 
image(tower, 250, 32, width, height);

  // draw ellipse that follows mouse
  ellipse(mouseX, mouseY, 30, 30);


// Draw a phone on the screen 
stroke("black");
fill("grey");
rect (940, 100,200,350);

fill('black');
ellipse(1040,410,20,20);

text ("Press space to enlarge", 990, 350);
textSize(12);
noStroke(0);
strokeWeight(0);
fill('blue');


image(city, 956, 150, w, h);

// update shape positions based off of the mouse location
  // and draw them to the screen
for (let i = 0; i < leaves.length; i++) {
    leaves[i].updateShape();
    leaves[i].animateShape();
    leaves[i].drawShape();
  }
// when the user moves the leaves, the leaf sound will play 
// My previous code to draw a group of leaves this took a lot of trial and error to get working and understand
      //drawLeaves(leaves[0]);
      //drawLeaves(leaves[1]);
      //drawLeaves(leaves[2]);
      //drawLeaves(leaves[3]);
      //drawLeaves(leaves[4]);

// if the width and height of the image is less than the window width when the mouse is clicked then the image will
if (growing && width < windowWidth)
{width += 2;

if (growing && height < windowHeight){height +=2;
}
}
// A second condition which enlarges the' city image when the space key is pressed. The image will only enlarge till it reached 400 px
if (resize && w < 400)
{w += 2;

if (resize && h < 400){h +=2;
}
}

if (showText){
textSize(32);
noStroke();
fill('white');
strokeWeight(4)
text('"Click" with nature', windowWidth/2, 700);
}

// I tried to make the sound play when the mouse is within the space of the leaves
//although this does work, the sound overlays itself and makes a buxxing sound instead of a leaf rustle
// I referred to the coding train to help me figure out why this was happening and tried to use 'restart' playMode
// to fix the issue but it didn't work
// function plaYSound(){ } was also tested in order to try and separate the variables but it didn't work
// if I had more time I would have liked to fix this problem but as this is my first time coding, it just wasn't possible within the time frame 
 if (mouseX >700 && mouseX <1400 && mouseY >50 && mouseY <400){
  rustle.loop();
  rustle.play();
  sound = true;
}
else {
  rustle.stop();
  sound = false
}
}

//when the mouse is pressed the growing variable activates
function mousePressed(){
// the overlay image will grow when the mouse is pressed
growing = true;
// the text will disappear when the mouse is pressed 
showText =false;

}

function keyPressed(){
// means space key which will cause the city image to grow
if (key == ' ')
resize = true;
}

  // References

  //https://www.youtube.com/watch?v=fBqaA7zRO58 -- this video helped me understand arrays 
// I intended to use this in order to draw multiple circles on the screen 

//youtube.com/watch?v=40Me1-yAtTc&list=PLRqwX-V7Uu6aFcVjlDAkkGIixw70s7jpW&index=5
//I used this video by the coding train to try and understand why my sound was layering itself and how I could potentially fix the issue


//https://editor.p5js.org/chriswmartin/sketches/XAqi75tq8
// After using Toms example I understood that I wanted the leaves that I drew to repel the mouse.
//I used this code origionally to try and get the effect to work alongside Tom's code that I edited as I liked the co-ordinates of the leaves.
// However, although I found his code very helpful, I established where I could adapt the co-ordinates of where the circles would appear and edited this code so 
// that it would only cover my selected area. I then changed the colour to be more of a green-scale so that it would match the aestetic I was going for.

// Both codes taught me a lot about variables and how I can draw multiple shapes with ease.


//Images were all taken by me, but the sound was sourced from :https://sounddino.com/en/effects/leaves/

// Although my artwork is not exactly how I envisioned, I reflect how this is my first time doing something to this scale and at the end of the day I certaiinly learnt a lot which makes my artwork seem more worthwhile so overall I am happy with it.





