var ball;
var database,position,ballpositionREF,airballoonimage
function preload(){
airballoonimage=loadImage("airballoon.png")
}
function setup(){
    database=firebase.database()
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    ball.addImage(airballoonimage)
    ball.scale=0.7
    ballpositionREF = database.ref("ball/position")
    ballpositionREF.on("value",readposition)
}

function draw(){
    background("lightblue");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref("ball/position").set({
        x:position.x+x,
        y:position.y+y
    })
    
}
function readposition(data){
    position=data.val()
    ball.x= position.x
    ball.y= position.y
}