let introSize;
let introHeightBase = 320;


let warningColorRange;
let warningColor;

let coreSize;
let coreSize2;
let coreSizeBase = 0;

// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
   translate(width/2, height/2);
   background(20)
   textFont('Verdana'); // please use CSS safe fonts
   rectMode(CENTER)
   textAlign(CENTER);
   textSize(24);
  
   let bar_spacing = height / 10;
   let bar_height = width / 12;
   let bar_pos_x = width / 2;

   let warningCyan = color(100,200,255);
   let warningRed = color(255,0,0);

   if (counter == 0) {
      introHeightBase = 320;
      coreSizeBase = 0;
   }

// changes 
   /*if (counter > 0) {
      warningColorRange = map(drum, 0,100, 0,1);
      warningColor = lerpColor(warningCyan,warningRed, warningColorRange);
      fill(warningColor);
      circle(width / 2, height / 2, 350);
   }*/

   if (counter > 36 && counter < 600) {
      introSize = map(other, 0,100, 0,introHeightBase);
      noStroke();
      fill(100,200,255,64);
      rect(0,-height/2, width,introSize*2.5);
      rect(0,height/2, width,introSize*2.5);
      fill(100,200,255,128);
      rect(0,-height/2, width,introSize*2);
      rect(0,height/2, width,introSize*2);
      fill(100,200,255,172);
      rect(0,-height/2, width,introSize*1.5);
      rect(0,height/2, width,introSize*1.5);
      fill(100,200,255);
      rect(0,-height/2, width,introSize);
      rect(0,height/2, width,introSize);

      if (counter > 120 && introHeightBase > 0){
         introHeightBase-=4;
      }
   }

   if (counter > 600) {
      if (coreSizeBase < 350){
         coreSizeBase++;
      }

      coreSize = map(other, 0,100, coreSizeBase*1,coreSizeBase*1.25);
      fill(255);
      circle(0,0, coreSize);

      coreSize2 = map(other, 0,100, coreSizeBase*1.1,coreSizeBase*1.35);
      fill(100,200,255,128);
      circle(0,0, coreSize2);
   }

}