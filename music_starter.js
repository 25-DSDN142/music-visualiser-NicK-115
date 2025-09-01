let introSize;
let introHeightBase = 160;

let floodHeight = 0;
let floodBarsX = 0;
let floodBarsY;
let floodBarsBass;
let floodBarsOther;

let vignette_fadeout_elapsed = 0;
let sirenrotation = 0;

let warningIntroAlpha = 0;
let warningHoriOffset = 0;
let warningRiseOffset = 0;
let warningColorRange;
let warningColor;

let BarBass;
let BarDrum;
let BarOther;
let BarVocal;
let bar_fadeout_elapsed = 100;

let coreSize;
let coreSize2;
let coreSizeBase = 0;

let chargeAlpha = 255;
let chargeSizeBase = 200;
let x;

// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
   translate(width/2, height/2);
   background(20)
   textFont('Verdana'); // please use CSS safe fonts
   rectMode(CENTER)
   textAlign(CENTER);
   textSize(24);

   let warningCyan = color(100,200,255);
   let warningRed = color(255);

   if (counter == 0) {
      introHeightBase = 320;

      floodHeight = 0;
      floodBarsX = 0;
      floodBarsY = height/2;

      warningIntroAlpha = 0;
      warningHoriOffset = 0;
      warningRiseOffset = 0;
      sirenrotation = 0;

      bar_fadeout_elapsed = 100;


      coreSizeBase = 0;

      chargeAlpha = 255;
      chargeSizeBase = 350;
      x = 0;
   }

// changes 


   //Intro
   if (counter > 36 && counter < 600) {
      introSize = map(vocal, 0,100, 0,introHeightBase);
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
         introHeightBase-=8;
      }
   }

   //Red Vignette Effects
   if (counter == 3258 || counter == 3270) {
      vignette_fadeout_elapsed = 0;
   }
   if (counter > 3258 && counter < 3270) {
      fill(160-(vignette_fadeout_elapsed),20,20);
      rect(0,0, width,height);
      fill(20,32);
      for (let i = 0; i < 12; i++){
         ellipse(0,0, (width*0.9)-(width*i*0.025),(height*0.9)-(height*i*0.025))
      }
      vignette_fadeout_elapsed += 3.5;
   } else if (counter > 3270 && vignette_fadeout_elapsed < 140) {
      fill(160-(vignette_fadeout_elapsed),20,20);
      rect(0,0, width,height);
      fill(20,32);
      for (let i = 0; i < 12; i++){
         ellipse(0,0, (width*0.9)-(width*i*0.025),(height*0.9)-(height*i*0.025))
      }
      vignette_fadeout_elapsed += 3.5;
   }

   //Siren Effect
   if (counter > 1860 && counter < 4313){
      fill(255,0,0,128);
      translate(0,-height/1.5);
      rotate(sirenrotation);
      beginShape();
      vertex(width*2,height/2);
      vertex(-width*2,-height/2);
      vertex(-width*2,height/2);
      vertex(width*2,-height/2);
      endShape(CLOSE);
      rotate(-sirenrotation);
      translate(0,height/1.5);
      sirenrotation+=2;
   }

   //Intro Flood Effects (Bass?)
   if (counter > 120 && counter < 5000) {
      floodBarsBass = map(bass, 0,100, floodHeight,floodHeight*1.25)
      floodBarsX = -width/2-((counter*3) % width*.72);
      if (counter > 1860){
         warningColorRange = map(drum, 0,100, 0,1);
         warningColor = lerpColor(warningCyan,warningRed, warningColorRange);
         fill(warningColor);
      } else {
        fill(100,200,255);
      }
      if (floodHeight < 420 && counter < 1500) {
         floodHeight+=0.5;
      } else if (floodHeight > 160 && counter < 1860) {
         floodHeight-=0.5;
      } else if (counter > 4302) {
         floodBarsY+=0.5;
      }

      //rect(0,height/2, width, floodHeight);
      for (let i = 0; i < 360; i++){
         rect(floodBarsX,floodBarsY, (width/100)+4,floodBarsBass+(sin(i*5)*height/25));
         floodBarsX+=(width/100);
      }
   }

   //Rising Blasts
   //Phase One
   if (counter > 1860 && counter < 5000) {
      warningHoriOffset+=0.5;
      warningColorRange = map(drum, 0,100, 0,1);
      warningColor = lerpColor(warningCyan,warningRed, warningColorRange);
      fill(warningColor);
      //Rising 01
      if (counter < 2208 && warningRiseOffset < height) {
            warningRiseOffset += height/20;
         }
      rect((-width/2)-warningHoriOffset, -warningRiseOffset+(3*height/2), 348,height*2);
      rect((width/2)+warningHoriOffset, -warningRiseOffset+(3*height/2), 348,height*2);
      //Rising 02
      if (counter > 2208) {
         if (counter < 2556 && warningRiseOffset < height*2) {
            warningRiseOffset += height/20;
         }
         rect((-width/2)-warningHoriOffset+261, -warningRiseOffset+(5*height/2), 176,height*2);
         rect((width/2)+warningHoriOffset-261, -warningRiseOffset+(5*height/2), 176,height*2);
      }
      //Rising 03
      if (counter > 2556) {
         if (counter < 2904 && warningRiseOffset < height*3) {
            warningRiseOffset += height/20;
         }
         rect((-width/2)-warningHoriOffset+435, -warningRiseOffset+(7*height/2), 176,height*2);
         rect((width/2)+warningHoriOffset-435, -warningRiseOffset+(7*height/2), 176,height*2);
      }
      //Rising 04
      if (counter > 2904) {
         if (warningRiseOffset < height*4) {
            warningRiseOffset += height/20;
         }
         rect((-width/2)-warningHoriOffset+609, -warningRiseOffset+(9*height/2), 176,height*2);
         rect((width/2)+warningHoriOffset-609, -warningRiseOffset+(9*height/2), 176,height*2);
      }
      //Phase Two
      /*if (counter > 3258 && counter < 3276) {
         warningHoriOffset-=0.5;
      }*/
      //Rising 05
      if (counter > 3276 && counter < 3600 && warningRiseOffset < height*5) {
            warningRiseOffset += height/20;
         }
      rect((-width/2)-warningHoriOffset+609, -warningRiseOffset+(11*height/2), 348*1.5,height*2);
      rect((width/2)+warningHoriOffset-609, -warningRiseOffset+(11*height/2), 348*1.5,height*2);
      //Rising 06
      if (counter > 3600) {
         if (counter < 3954 && warningRiseOffset < height*6) {
            warningRiseOffset += height/20;
         }
         rect((-width/2)-warningHoriOffset+957, -warningRiseOffset+(13*height/2), 176,height*2);
         rect((width/2)+warningHoriOffset-957, -warningRiseOffset+(13*height/2), 176,height*2);
      }
      //Rising 07
      if (counter > 3954) {
         if (counter < 4302 && warningRiseOffset < height*7) {
            warningRiseOffset += height/20;
         }
         rect((-width/2)-warningHoriOffset+1131, -warningRiseOffset+(15*height/2), 176,height*2);
         rect((width/2)+warningHoriOffset-1131, -warningRiseOffset+(15*height/2), 176,height*2);
      }
      //Rising 08
      if (counter > 4302) {
         if (warningRiseOffset < height*8) {
            warningRiseOffset += height/20;
         }
         rect((-width/2)-warningHoriOffset+1305, -warningRiseOffset+(17*height/2), 176,height*2);
         rect((width/2)+warningHoriOffset-1305, -warningRiseOffset+(17*height/2), 176,height*2);
      }
   }



   //The Core

   //Charge
   if (counter > 5700) {
      if (chargeAlpha > 0) {
         x+=4;
         chargeAlpha-=5;
         chargeSizeBase+=2;
      }
      fill(255,chargeAlpha);
      circle(0,0, chargeSizeBase+(x*2));

      fill(255,chargeAlpha);
      circle(0,0, chargeSizeBase+(x/1.5));
   }

   //Blast Bars
   if (counter > 6330) {
      BarVocal = map(vocal, 0,100, coreSizeBase*1.25,coreSizeBase*1.75);
      BarDrum = map(drum, 0,100, coreSizeBase*1.25,coreSizeBase*1.75);
      BarBass = map(bass, 0,100, coreSizeBase*1.25,coreSizeBase*1.75);
      BarOther = map(other, 0,100, coreSizeBase*1.25,coreSizeBase*1.75);
      if (counter > 7410 && bar_fadeout_elapsed > 1) {
      bar_fadeout_elapsed -=1;
      }
      for (let i = 0; i < 120; i++) {
         fill(113,225,255);
         rect(0,0, 5,BarVocal*(bar_fadeout_elapsed/100));
         rotate(3);
         rect(0,0, 5,BarDrum*(bar_fadeout_elapsed/100));
         rotate(3);                                                                                                 
         rect(0,0, 5,BarBass*(bar_fadeout_elapsed/100));
         rotate(3);
         rect(0,0, 5,BarOther*(bar_fadeout_elapsed/100));
         rotate(3);
      }
   }


   //Main
   if (counter > 4470) {
      if (coreSizeBase < chargeSizeBase && counter < 6144) {
         coreSizeBase++;
      } else if (coreSizeBase > 28 && counter > 6144 && counter < 6330) {
         coreSizeBase-=14;
      } else if (counter == 6330) {
         coreSizeBase = 250;
      } else if (counter > 6330 && counter < 7410) {
         coreSizeBase+=0.5;
      }

      if (counter <= 6330) {
         coreSize = map(vocal, 0,100, coreSizeBase*1,coreSizeBase*1.25);
         fill(255);
         circle(0,0, coreSize);

         coreSize2 = map(vocal, 0,100, coreSizeBase*1.1,coreSizeBase*1.35);
         fill(100,200,255,128);
         circle(0,0, coreSize2);
      } else {
         fill(255);
         circle(0,0, coreSizeBase);
         fill(100,200,255,128);
         circle(0,0, coreSizeBase*1.1);
      }
   }

}