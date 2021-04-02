var balloon,balloonImage1,balloonImage2,position,balloonPosition,database;
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,300,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  balloonPosition=database.ref("balloon/height");
    balloonPosition.on("value",readPosition,showError);

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    changePosition(-4,0);
    if(balloon.scale>0.2){
      balloon.scale=balloon.scale-0.001;
      }
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    changePosition(4,0);
    if(balloon.scale>0.2){
    balloon.scale=balloon.scale-0.001;
    }
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    changePosition(0,-4);
    if(balloon.scale>0.2){
      balloon.scale=balloon.scale-0.001;
      }
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    changePosition(0,4);
    if(balloon.scale>0.2){
      balloon.scale=balloon.scale-0.001;
      }
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}


function changePosition(x,y){
  database.ref("balloon/height").set({
      'x': balloon.x+x,
      'y': balloon.y+y
  });
}

function readPosition(data){
 position=data.val();
 balloon.x=position.x;
 balloon.y=position.y;
}

function showError(){
  console.log("This is an Error");
}