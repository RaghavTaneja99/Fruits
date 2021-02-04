//Game States
var PLAY=1;
var END=0;
var WIN=2;
var gameState=1;

var knife,fruits,f1,f2,f3,f4,f5,r,p
var point, knifeImage,back,ground,fruitGroup,monster,monsterGroup,m,over,g,h,k,j,s


function preload(){
  f1=loadImage("istockphoto-1133409245-1024x1024-removebg-preview.png")
  knifeImage = loadImage("knife.png");
  f2=loadImage("000320934-1-removebg-preview.png")
  back=loadImage("background.jpg")
  f3=loadImage("or.png")
  f4=loadImage("app.png")
  f5=loadImage("plum.png")
  m=loadImage("monster.png")
  g=loadImage("gameover.png")
  p=loadImage("points.png")
  h=loadSound("Fast-Knife-Sharpen-www.fesliyanstudios.com.mp3")
  k=loadSound("mixkit-failure-arcade-alert-notification-240.wav")

}



function setup() {
  createCanvas(windowWidth, windowHeight)
  ground=createSprite(300,300,10,10)
  ground.addImage(back)
  ground.scale=6
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=1.4
   over=createSprite(windowWidth/2,500,10,10)
   over.addImage(g)
   over.scale=4

 
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  //create fruit and monster Group variable here
  fruitGroup=createGroup()
  monsterGroup=createGroup()
}

function draw() {
  
  
  if(gameState===PLAY){
    
    //calling fruit and monster function
    
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if knife touching fruit
   
    // Go to end state if knife touching enemy
       Spawnfruits()
  Spawnmonster()
 
  if(knife.isTouching(fruitGroup)){
    fruitGroup.destroyEach()
    score=score+20
    points=createSprite(1500,2000,10,10)
    points.addImage(p)
    points.velocityY=-27
    points.scale=3
    h.play()
  }
   if(knife.isTouching(monsterGroup)){
 k.play()
   gameState=END
     
     
  }
  over.visible=false
     knife.visible=true
  }
   drawSprites();
  if(gameState===END){
    fruitGroup.setVelocityEach(0)
    monsterGroup.setVelocityEach(0)
 
   
  over.visible=true
   if(mousePressedOver(over)){
    gameState=PLAY
    score=0
  }
 }
   if(gameState===WIN){
   
     knife.visible=false
       fill("white")
       textSize(40)
       text("You have Win the Game",100,300)
     if(keyDown("space")){
   gameState=PLAY
   score=0
    
 }}
  if(score===1000){
    gameState=WIN
  }
      fill("#07f color")
  textSize(70);
  text("Score : "+ score,windowHeight/2,100);
}
function Spawnfruits(){
  if(frameCount%30===0){
  fruits=createSprite(Math.round(random(0,windowHeight)),Math.round(random(0,windowWidth)),10,10)
  fruits.velocityX=-(3+score/100)
    r=Math.round(random(1,5))
  if(r===1){
    fruits.addImage(f1)
    fruits.scale=1
  }
    if(r===2){
      fruits.addImage(f2)
      fruits.scale=0.6
    }
   if(r===3){
      fruits.addImage(f3)
     fruits.scale=0.6
    }
       
       if(r===4){
      fruits.addImage(f4)
     fruits.scale=0.6
    }
     if(r===5){
      fruits.addImage(f5)
     fruits.scale=0.6
    }
    fruits.lifetime=1000
    fruitGroup.add(fruits)
    //console.log(fruits.velocityX)
}

}
function Spawnmonster(){
  if(frameCount%15===0){
  monster=createSprite(Math.round(random(100,2000)),Math.round(random(100,2000)),10,10)
  monster.addImage(m)
  monster.scale=0.4
  monster.velocityX=-(3+score/50)
  monsterGroup.add(monster)
  monster.lifetime=100
  }
}
