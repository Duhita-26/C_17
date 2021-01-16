var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;
var player1, player2, player3;

var oppPink1Img, oppPink2Img;
var oppYellow1Img, oppYellow2Img;
var oppRed1Img, oppRed2Img;


var gameOverImg, cycleBell;

var END =0;
var PLAY =1; 
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  
pathImg = loadImage("images/Road.png");
  
mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
mainRacerImg2 = loadAnimation("images/mainPlayer3.png");
  
  
oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
oppPink2Img = loadAnimation("images/opponent3.png");
  
  
oppYellow1Img = 
loadAnimation("images/opponent4.png","images/opponent5.png");
oppYellow2Img = loadAnimation("images/opponent6.png");
  

oppRed1Img = 
loadAnimation("images/opponent7.png","images/opponent8.png");
oppRed2Img = loadAnimation("images/opponent9.png");
  
gameOverImg = loadImage("images/gameOver.png");
cycleBell=loadSound("sound/bell.mp3");
}

function setup(){
  
createCanvas(650,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
gameOver = createSprite(650, 150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;
  
PinkCG=new Group()
YellowCG=new Group()
RedCG=new Group()
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("DISTANCE : "+ distance,480, 35);
  
  if(gameState===PLAY){
  
    distance = distance + Math.round(getFrameRate()/50);
    path.velocityX = -(6 + 2*distance/150);
    
    mainCyclist.y = World.mouseY;
  
    edges= createEdgeSprites();
    mainCyclist .collide(edges);
  
    //code to reset the background
    if(path.x < 0 ){
    path.x = width/2;
    }
    
    //code to play cycle bell
    if (keyDown("space")){
    cycleBell.play()}
  
    //creating continus opponent player
    var select_oppPlayer = Math.round(random(1, 3));
    
    if(World.frameCount % 150 === 0) {
    if (select_oppPlayer ==  1) {
      pinkCyclist();
    } else if(select_oppPlayer == 2) {
      yellowCyclist();
    } else {
      redCyclist();
    } 
  }
    
  if(PinkCG.isTouching(mainCyclist)){
  gameState = END;
  Player1.velocityY = 0;
  Player1.addAnimation("opponentPlayer1", oppPink2Img)     }
      
    
  if(YellowCG.isTouching(mainCyclist)){
  gameState = END;
  Player2.velocityY = 0;
  Player2.addAnimation("opponentPlayer2", oppYellow2Img)   }
   
  if(RedCG.isTouching(mainCyclist)){
  gameState = END;
  Player3.velocityY = 0;
  Player3.addAnimation("opponentPlayer3", oppRed2Img)  }
    
  } else if (gameState === END){
    gameOver.visible = true;
    textSize(20);
    fill(255);
    text("PRESS UP ARROW TO RESTART THE GAME!", 200, 20);
    
    path.velocityX = 0;
    mainCyclist.velocityX = 0;
    
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
    
    PinkCG.setVelocityXEach(0)
    PinkCG.setLifetimeEach(-1);
    
    YellowCG.setVelocityXEach(0)
    YellowCG.setLifetimeEach(-1);
    
    RedCG.setVelocityXEach(0)
    RedCG.setLifetimeEach(-1);
    
    if(keyDown("UP_ARROW")){
      reset();
    }
  }
}

function pinkCyclist(){
Player1 = createSprite(1100, Math.round(random(50, 250), 10, 10));
Player1.scale = 0.06;
Player1.addAnimation("opponentPlayer1", oppPink1Img);
Player1.velocityX = -(6 + 2*distance/150);
Player1.setLifeTime = 170;
PinkCG.add(Player1);
}

function yellowCyclist(){
Player2 = createSprite(1100, Math.round(random(50, 250), 10, 10));
Player2.scale = 0.06;
Player2.addAnimation("opponentPlayer2", oppYellow1Img);
Player2.velocityX = -(6 + 2*distance/150);
Player2.setLifeTime = 170;
YellowCG.add(Player2);
}

function redCyclist(){
Player3 = createSprite(1100, Math.round(random(50, 250), 10, 10));
Player3.scale = 0.06;
Player3.addAnimation("opponentPlayer2", oppRed1Img);
Player3.velocityX = -(6 + 2*distance/150);
Player3.setLifeTime = 170;
RedCG.add(Player3);
}

function reset(){
gameState = PLAY;
gameOver.visible = false;
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
PinkCG.destroyEach();
YellowCG.destroyEach();
RedCG.destroyEach();
  
distance = 0;
}
