//estado do jogo;
//gameState=0 aguardando começar o jogo;
//gameState=1 começando a primeira faze do jogo;
//gameState=2 começando a segunda faze do jogo;
//gameState=3 começando a terçeira faze do jogo;
//gameState=-1 gameOver;
//gameState=4 voçe ganha o jogo;

var bg,bgImg1,bgImg0,bgImg2,bgImg3;
var player, shooterImg, shooter_shooting;
var gameState=0
var score=0
var vidaimg1,vidaimg2,vidaimg3,vida,numvida
var zumbiImg1,zumbiImg2,zumbiGroup,zumbi2Group,zumbi3Group
var bala,balaImg,balaGroup
var contadorbala
var zumbi2,zumbi2img1,zumbi2img2
var zumbi3,zumbi3img1,zumbi3Img2

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg1 = loadImage("assets/bg.jpeg")
  bgImg0 = loadImage("assets/28.png")
  vidaimg1 = loadImage("assets/heart_1.png")
  vidaimg2 = loadImage("assets/heart_2.png")
  vidaimg3 = loadImage("assets/heart_3.png")
  zumbiImg1 = loadImage("assets/zombie.png")
  zumbiImg2 = loadImage("assets/zumbi.png")
  balaImg = loadImage("assets/bala.png")
  zumbi2Img1 = loadImage("assets/7.png")
  zumbi2Img2 = loadImage("assets/10.png")
  zumbi3Img1 = loadImage("assets/22.png")
  zumbi3Img2 = loadImage("assets/23.png")
  bgImg2 = loadImage("assets/27.png")
  bgImg3 = loadImage("assets/31.png")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
 /* bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1*/
  
  vida = createSprite(displayWidth-140,100)
  vida.addImage(vidaimg3)
  vida.scale=0.2
  numvidas=3

  contadorbala=100

//criando o sprite do jogador
  player = createSprite(displayWidth-1150, displayHeight-100, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.5
 
  player.debug = true
  //player.debug = false
  //player.Debug =false
  //Player.debug = true

  //player.Collider("rectagle",0,0,300,300)
  //player.setcollider("rectangle",0,0)
  player.setCollider("rectangle",0,0,300,300)
  //player.Setcollider("rectangle",0,0,300,300)

  zumbiGroup = new Group()
  zumbi2Group = new Group()
  zumbi3Group = new Group()
  balaGroup = new Group()

}

function draw() {
  background(0); 

  if(gameState==0){
   image(bgImg0,0,0,displayWidth,displayHeight)
 
   textSize(30)
   text("tecle enter para começar",displayWidth-1000,displayHeight/2+100)

   if(keyDown("enter")){
    gameState=1
   }
  }

  if(gameState==1){
    image(bgImg1,0,0,displayWidth,displayHeight)
    player.scale=0.3
    textSize(30)
    fill("red")
    text("pontuação:"+score,displayWidth-230,50)
    fill("red")
    text("muniçao:"+contadorbala,displayWidth-230,80)
    //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando touches (toques)
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }

  if(keyDown("DOWN_ARROW")||touches.length>0){
  player.y = player.y+30
  }

  if(keyDown("RIGHT_ARROW")||touches.length>0){
    player.x = player.x+30
    }

    if(keyDown("LEFT_ARROW")||touches.length>0){
      player.x = player.x-30
      }


//libere as balas e mude a imagem do personagem para a posição de tiro quando a tecla espaço for pressionada
  
if(keyWentDown("space")){
  if(contadorbala>0){
    player.addImage(shooter_shooting)
    bala=createSprite(player.x,player.y)
    bala.addImage(balaImg)
    bala.velocityX=10
    bala.scale=0.09
   balaGroup.add(bala)
   contadorbala-=1
  }else{
    text("consiga mais balas",displayWidth/2,displayHeight/2)
  }
}
  if(balaGroup.isTouching(zumbiGroup)) {
    for(var i=0;i<zumbiGroup.length;i++){
       if(zumbiGroup[i].isTouching(balaGroup)){
        var zposition=i
       }    
        score+=5
      } 
      for(var i=0;i<balaGroup.length;i++){
        if(balaGroup[i].isTouching(zumbiGroup)){
         var bposition=i
        }    
         
      }
      zumbiGroup[zposition].destroy()
      balaGroup[bposition].destroy()
    
  }

//player goes back to original standing image once we stop pressing the space bar
  else if(keyDown("space")){
  //player.addImage( shooter_shooting )
  //player.addImage()
  player.addImage(shooterImg)
  //player.addImage(shooter_1.png)
  }
  fase1()
  if(zumbiGroup.isTouching(player)){
  
   numvida-=1
   if(numvida>1){
    vida.addImage(vidaimg2)}
    if(numvida<1){
      vida.addImage(vidaimg1)
   }else{
    gameState=4
   }
  }
  
   if(score===200){
    gameState=2
    score=0
    contadorbala=70
    zumbiGroup.destroyEach()
    balaGroup.destroyEach()
   }

  } 

  

  if(gameState==2){
    image(bgImg2,0,0,displayWidth,displayHeight)
    player.scale=0.3
    textSize(30)
    fill("red")
    text("pontuação:"+score,displayWidth-230,50)
    fill("red")
    text("muniçao:"+contadorbala,displayWidth-230,80)
    
    
    //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando touches (toques)
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }

  if(keyDown("DOWN_ARROW")||touches.length>0){
  player.y = player.y+30
  }

  if(keyDown("RIGHT_ARROW")||touches.length>0){
    player.x = player.x+30
    }

    if(keyDown("LEFT_ARROW")||touches.length>0){
      player.x = player.x-30
      }


//libere as balas e mude a imagem do personagem para a posição de tiro quando a tecla espaço for pressionada
  
if(keyWentDown("space")){
  if(contadorbala>0){
    player.addImage(shooter_shooting)
    bala=createSprite(player.x,player.y)
    bala.addImage(balaImg)
    bala.velocityX=10
    bala.scale=0.09
   balaGroup.add(bala)
   contadorbala-=1
  }else{
    text("consiga mais balas",displayWidth/2,displayHeight/2)
  }
}
  if(balaGroup.isTouching(zumbi2Group)) {
    for(var i=0;i<zumbi2Group.length;i++){
       if(zumbi2Group[i].isTouching(balaGroup)){
        var zposition=i
       }    
        score+=5
      } 
      for(var i=0;i<balaGroup.length;i++){
        if(balaGroup[i].isTouching(zumbi2Group)){
         var bposition=i
        }    
         
      }
      zumbi2Group[zposition].destroy()
      balaGroup[bposition].destroy()
    
  }

//player goes back to original standing image once we stop pressing the space bar
  else if(keyDown("space")){
  //player.addImage( shooter_shooting )
  //player.addImage()
  player.addImage(shooterImg)
  //player.addImage(shooter_1.png)
  }
  fase2()
  if(zumbi2Group.isTouching(player)){
  
   numvida-=1
   if(numvida>1){
    vida.addImage(vidaimg1)
   }else{
   gameState=4
   }
  }
  
  if(score===250){
    gameState=3
    score=0
    contadorbala=60
    zumbi2Group.destroyEach()
    balaGroup.destroyEach()
   }
  } 

  if(gameState==3){
    image(bgImg3,0,0,displayWidth,displayHeight)
    player.scale=0.3
    textSize(30)
    fill("red")
    text("pontuação:"+score,displayWidth-230,50)
    fill("red")
    text("muniçao:"+contadorbala,displayWidth-230,80)
    
    
    //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando touches (toques)
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30
  }

  if(keyDown("DOWN_ARROW")||touches.length>0){
  player.y = player.y+30
  }

  if(keyDown("RIGHT_ARROW")||touches.length>0){
    player.x = player.x+30
    }

    if(keyDown("LEFT_ARROW")||touches.length>0){
      player.x = player.x-30
      }


//libere as balas e mude a imagem do personagem para a posição de tiro quando a tecla espaço for pressionada
  
if(keyWentDown("space")){
  if(contadorbala>0){
    player.addImage(shooter_shooting)
    bala=createSprite(player.x,player.y)
    bala.addImage(balaImg)
    bala.velocityX=10
    bala.scale=0.09
   balaGroup.add(bala)
   contadorbala-=1
  }else{
    text("consiga mais balas",displayWidth/2,displayHeight/2)
  }
}
  if(balaGroup.isTouching(zumbi3Group)) {
    for(var i=0;i<zumbi3Group.length;i++){
       if(zumbi3Group[i].isTouching(balaGroup)){
        var zposition=i
       }    
        score+=5
      } 
      for(var i=0;i<balaGroup.length;i++){
        if(balaGroup[i].isTouching(zumbi3Group)){
         var bposition=i
        }    
         
      }
      zumbi3Group[zposition].destroy()
      balaGroup[bposition].destroy()
    
  }

//player goes back to original standing image once we stop pressing the space bar
  else if(keyDown("space")){
  //player.addImage( shooter_shooting )
  //player.addImage()
  player.addImage(shooterImg)
  //player.addImage(shooter_1.png)
  }
  fase3()
  if(zumbi3Group.isTouching(player)){
  
   numvida-=1
   if(numvida>1){
    vida.addImage(vidaimg1)
   }else{
   gameState=4
   }
  }
  
 

  } 

  if(gameState===4){
   zumbi2Group.destroyEach()
   zumbi3Group.destroyEach()
   zumbiGroup.destroyEach()
    player.destroy()
    textSize=20
    text("game over",windowWidth/2,windowHeight/2)
   
  }

drawSprites();

}
function fase1(){
 if(frameCount % 140==0){
tipozumbi=Math.round(random(1,2))
zumbi=createSprite(width-50,Math.round(random(height-500,height+50)))
zumbi.velocityX=-(2+score/5)

if(tipozumbi===1){
 zumbi.addImage(zumbiImg1)
 zumbi.scale=0.15
}else{
  zumbi.addImage(zumbiImg2)
  zumbi.scale=0.3
}

zumbiGroup.add(zumbi)
zumbi.lifeTime=200
 }
 }

 function fase2(){
  if(frameCount % 140==0){
 tipozumbi2=Math.round(random(1,2))
 zumbi2=createSprite(width-50,Math.round(random(height-100,height/2)))
 zumbi2.velocityX=-(2+score/5)
 
 if(tipozumbi2===1){
  zumbi2.addImage(zumbi2Img1)
  zumbi2.scale=0.3
 }else{
   zumbi2.addImage(zumbi2Img2)
   zumbi2.scale=0.3
 }
 
 zumbi2Group.add(zumbi2)
 zumbi2.lifeTime=200
  }
  }

  function fase3(){
    if(frameCount % 140==0){
   tipozumbi3=Math.round(random(1,2))
   zumbi3=createSprite(width-50,Math.round(random(height-100,height/2)))
   zumbi3.velocityX=-(2+score/5)
   
   if(tipozumbi3===1){
    zumbi3.addImage(zumbi3Img1)
    zumbi3.scale=0.3
   }else{
     zumbi3.addImage(zumbi3Img2)
     zumbi3.scale=0.3
   }
   
   zumbi3Group.add(zumbi3)
   zumbi3.lifeTime=200
    }
    }




