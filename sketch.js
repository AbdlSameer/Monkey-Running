var PLAY = 1;
var END = 0;
var gameState = PLAY;
var background1,background1Image
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var ground
var score = 0;
var survivalTime = 0;
var gameOverImg,restartImg

function preload(){
  
 background1Image = loadImage("background.jpg"); 
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImg = loadImage("gameover (1).png");
  restartImg = loadImage("restarts.png")

  gameSound = loadSound("monkey game sound (1).mp3");
 
}



function setup() {
  createCanvas(600,300);
 
  background1 = createSprite(400,100,1200,10);
  background1.addImage("background",background1Image);
  background1.velocityX = -(4 + 2* score/10);
   background1.scale = 1.1
  background1.x = background1.width/2; 

 
  
  monkey = createSprite(100,250,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400,290,1200,10);
  ground.velocityX = -(4 + 2* score/10);
  ground.x = ground.width/2; 
ground.visible = false;
  
  obstaclesGroup = createGroup();
  foodGroup = createGroup();

   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,200);
  restart.addImage("restart",restartImg);
  
 
  gameOver.scale = 2;
  restart.scale = 0.5;

  //monkey.debug = true;
  
  gameSound.play();
  
  
}


function draw() {

  
if(gameState===PLAY)
{
  restart.visible = false;
  gameOver.visible = false;   
  
  if (background1.x < 0){
      background1.x = background1.width/2;
    }
background1.velocityX = -(4 + 3* score/5);

  ground.velocityX = -(4 + 3* score/5);
survivalTime = survivalTime + Math.round(getFrameRate()/60);
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space") && monkey.y>= 254 )
  {
    monkey.velocityY = -15;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
 
  
  if(monkey.isTouching(foodGroup))
     {
     score = score+2;
       foodGroup.destroyEach();
     }
  
  if(monkey.isTouching(obstaclesGroup))
  {
   gameState = END; 
  }
}
  
  if(gameState===END)
  {
    restart.visible = true;
  gameOver.visible = true;
score = 0;
      
    
    background1.velocityX = 0;
   
   monkey.visible = false;
 
    foodGroup.destroyEach();
       obstaclesGroup.destroyEach();

    
    foodGroup.setVelocityXEach(0);
   obstaclesGroup.setVelocityXEach(0) 
   obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
    survivalTime = 0;
    
    if(mousePressedOver(restart)) 
     {
      reset();
     }

  }
 monkey.collide(ground);
  spawnObstacles();
  spawnfood();
  drawSprites();
stroke("black");
  textSize(20);
  fill("red");
  text("Survival Time:"+survivalTime,150,50);
text("Score: "+ score, 350,50); 


}

function reset()
{
  gameState = PLAY; 
  restart.visible = false;
  gameOver.visible = false
   monkey.visible = true;
  score = 0
  
ground.velocityX = -(4 + 3* score/5);
 //destroy the obstacles and clouds 
  obstaclesGroup.destroyEach();
  foodGroup.destroyEach();
  //change trex animation to running 
  
  servivalTime = 0;
}


function spawnfood(){
 if (frameCount % 80 === 0){
   banana = createSprite(700,165,10,40);
   banana.addImage("banana",bananaImage);
   banana.velocityX = -(6 + 3* score/10);
   
    //generate random obstacles
    banana.y = Math.round(random(120,200));
    
   
    //assign scale and lifetime to the obstacle           
    banana.scale = 0.1;
    banana.lifetime = 300;
   
   //add each obstacle to the group
    foodGroup.add(banana);
 }
}


function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(700,270,10,40);
   obstacle.addImage("stone",obstacleImage);
   obstacle.scale = 0.15;
   obstacle.velocityX = -(6 + 3* score/10) ;
   
    //generate random obstacles
    //var rand = Math.round(random(1,6));
    
   
   
    //assign scale and lifetime to the obstacle         
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}





