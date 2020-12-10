class Food {
    constructor(){
    this.foodStock=0;
    this.lastFed;
    this.image=loadImage('images/Milk.png');
    }
  
   updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }

   getFeedTime(lastFed){
    this.lastFed = lastFed;
   }
   deductFood(){
     if(this.foodStock>0){
      this.foodStock=this.foodStock-1;
     }
    }
  
    getFoodStock(){
      return this.foodStock;
    }
  
    display(){
      var x=80,y=100;
      fill(random(0, 255), random(0, 255), random(0, 255));
      textSize(20);
      if(lastFed>=12){
          text("LAST FEED: "+ lastFed%12 + " PM", 50,30);
      }else if(lastFed==0){
          text("LAST FEED : 12 AM",50,30);
      }else{
          text("LAST FEED: "+ lastFed + " AM", 50,30);
      }
     
      if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
          if(i%10==0){
            x=80;
            y=y+50;
          }
          image(this.image,x,y,50,50);
          x=x+30;
        }
      }
    }
    bedroom(){
      background(bedroom);
    }
    garden(){
      background(garden);
    }
    washroom(){
      background(washroom);
    }
    
  }