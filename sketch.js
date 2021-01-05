//Create variables here
var dog,happyDog,database,foodS,foodStock;
var feed;
var addFood;
var fedTime;
var lastFed;
var foodObj;
var milk;

function preload()
{
  dogImg = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
  milkImg = loadImage("Milk.png")
	//load images here
}

function setup() {
  createCanvas(1000, 500);

  foodObj = new Food();

    
  database = firebase.database()
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  dog = createSprite(800,220,150,150)
  dog.addImage(dogImg)
  dog.scale = 0.15
  
  feed = createButton("Feed the dog");
  feed. position(700,95);
  feed.mousePressed(feedDog);
 
  addFood = createButton("Add food");
  addFood. position(800,95);
  addFood.mousePressed(addFoods)

  
  
  

  
}


function draw() {  
  background(46,139,87)

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });


  fill(255);
  textSize(20)
  if(lastFed = 12){
    text("Last Fed :" +lastFed%12 + "PM", 350, 30);
  }else if(lastFed == 0 ){
    text("Last Fed : 12 am", 350, 30);
  }else{
    text("Last Fed :" + lastFed + "AM",350,30)
  }

  foodObj.display();

  drawSprites();
  //add styles here
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.writeStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
   Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
  
}






