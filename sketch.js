
var monkey , monkey_running
var ground, invisibleGround;
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
    createCanvas(400, 400);

monkey = createSprite(50,280,20,50);
  monkey.addAnimation("running", monkey_running);

  monkey.scale = 0.1;
  
  ground = createSprite(10,300,400,10);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,300,400,10);
  invisibleGround.visible = false;
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
  
  
    foodGroup = createGroup();
    obstacleGroup = createGroup();
  
    survivalTime = 0;

}


function draw() {
  background(180);
 
stroke("white");
  textSize(20);
fill("white");
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime =Math.ceil(frameCount/frameRate());
  text("Survival Time:"+ survivalTime,100,50);
  
     if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
     }
  
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  
    monkey.collide(invisibleGround);
  
  
  if(monkey.isTouching(obstacleGroup)){
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    monkey.x = 50;
     monkey.y = 270;
    
  }
  
  spawnBananas();
  
  rock();
  
  drawSprites();
 
}

function spawnBananas(){
    if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(124,180));
    banana.addImage(bananaImage);
    banana.scale = 0.06;
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    foodGroup.add(banana);
  }
}

function rock(){
  if (frameCount % 300 === 0){
var obstacle = createSprite(400,280,40,30) ;

    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1
    
    obstacleGroup.add(obstacle);
 }
}
