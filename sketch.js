const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Events = Matter.Events;


var dog,dog2;
var feed,add;
var foodObj;
var lastFed;
var Feedtime;
var lastfeed;
var database;
var addFood;
var position;
var gameState;

function preload()
{
   dogimg1 = loadImage("images/dogImg.png");
   dogimg2 = loadImage("images/dogImg1.png");
   sadDog=loadImage("images/Lazy.png");
   happyDog=loadImage("images/Happy.png");
   garden=loadImage("images/Garden.png");
   washroom=loadImage("images/Wash Room.png");
   bedroom=loadImage("images/Bed Room.png");
}

function setup() {
  createCanvas(1000, 500);
  engine = Engine.create();
  world = engine.world;
    
  database = firebase.database();
 
  foodObj = new Food();
  dog = createSprite(890,250,120,120);
  dog.addImage(dogimg1);
  dog.scale = 0.1;

  var foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  var fedTime=database.ref('FeedTime');
  fedTime.on("value",(data)=>{
    lastFed=data.val();
  });

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
  
  var dogo = database.ref("Food");
  dogo.on("value",readPosition);
  feed = createButton("FEED DOG");
  feed.position(800,60);
  feed.mousePressed(FeedDog);

  addFood = createButton("ADD FOOD");
  addFood.position(900,60);
  addFood.mousePressed(AddFood);
  Engine.run(engine);

  
  
}


function draw() {  
  rectMode(CENTER);
  background("lightgreen");

 
  
  textSize(25);
  fill(random(0, 255), random(0, 255), random(0, 255));
  text("FEED THE DRAGON MILK TO THE DOG BY PRESSING FEED DOG BUTTON",60,100); 
  textSize(20);

  currentTime=hour();
  if(currentTime==(lastFed+1)){
      update("Playing");
      foodObj.garden();
   }else if(currentTime==(lastFed+2)){
    update("Sleeping");
      foodObj.bedroom();
   }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
      foodObj.washroom();
   }else{
    update("Hungry")
    foodObj.display();
   }
   
   if(gameState!="Hungry"){
     feed.hide();
     addFood.hide();
     dog.remove();
   }else{
     console.log("hello in else");
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
   }
  drawSprites();
  //add styles here

}

function readPosition(data){
     position = data.val();
     foodObj.updateFoodStock(position);
}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function writePosition(x){
   if(x>0){
     x=x-1
   }else{
     x=0
   }
   database.ref('/').set({
       'Food':x
   })
}
function AddFood(){
  position++
  database.ref('/').update({
       Food:position
  })
}
function FeedDog(){
   dog.addImage(dogimg2);
   foodObj.updateFoodStock(foodObj.getFoodStock()-1);
   database.ref('/').update({
       Food:foodObj.getFoodStock(),
       Feedtime:hour()  
   })
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}


  



  
        
      
      