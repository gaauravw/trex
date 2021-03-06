var trex,groung
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var count = 0
localStorage["HighestScore"] = 0;
function preload(){
  trex_animation = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  cloudImage= loadImage("cloud.png");
  obstacle1= loadImage("obstacle1.png");
  obstacle2= loadImage("obstacle2.png");
  obstacle3= loadImage("obstacle3.png");
  obstacle4= loadImage("obstacle4.png");
  obstacle5= loadImage("obstacle5.png");
  obstacle6= loadImage("obstacle6.png");
  gameOverimg= loadImage("gameOver.png");
  restartimg= loadImage("restart.png");
  trexcollidedimg= loadImage("trex_collided.png");
}

function setup() {
  createCanvas(600, 200);
   ObstaclesGroup = createGroup();
 CloudsGroup = createGroup();
 trex= createSprite(50,155,20,50); 
  trex.scale=0.5
  trex.addAnimation("trex",trex_animation);
  trex.addAnimation("collided", trexcollidedimg);
   ground = createSprite(200,180,400,20);
  ground.addImage(groundImage);
  invisibleGround = createSprite(200,185,400,5);
  invisibleGround.visible = false;
 gameOver = createSprite(300,100);
 restart = createSprite(300,140);
gameOver.addImage(gameOverimg);
gameOver.scale = 0.5;
restart.addImage(restartimg);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;
}

function draw() {
  background(300);
  text("Score: "+ count, 500, 50);
  if(gameState === PLAY){
  count = count + Math.round(getFrameRate()/60);

  if(keyDown("space")&& trex.y>=149){
      trex.velocityY = -12 ;
    }
  trex.velocityY = trex.velocityY + 0.8;
  trex.collide(invisibleGround);
  ground.velocityX = -6
  if (ground.x < 0){
      ground.x = ground.width/2;
    
    }
  spawnClouds();
  spawnObstacles();
    if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
    }
  }
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trexcollidedimg);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    
  }
  if(mousePressedOver(restart)) {
    reset();
  }
  
  drawSprites();
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 234;
     CloudsGroup.add(cloud);
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    ObstaclesGroup.add(obstacle);
  }
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  trex.changeAnimation("trex",trex_animation);
  
  if(localStorage["HighestScore"]<count){
    localStorage["HighestScore"] = count;
  }
  console.log(localStorage["HighestScore"]);
  
  count = 0;
  
}