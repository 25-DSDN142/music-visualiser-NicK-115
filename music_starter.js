let introSize;
let introHeightBase = 160;

let floodHeight = 0;
let floodSub1Height = 0;
let floodSub2Height = 0;
let floodBarsX = 0;
let floodSub1BarsX = 0;
let floodSub2BarsX = 0;
let floodBarsY;
let floodBarsSubY;
let floodBarsBass;
let floodBarsOther;
let floodBarsDrums;

let introVisualizerX;
let introVisualizerTimes = [816,842,876, 900,930,960, 984,1020,1050, 1074,1104,1134, 1158,1194,1224, 1248,1278,1308, 1332,1368,1398, 1416,1452,1484];
let introVisualizerTypes = [];

let CoreVisualizerX;
let CoreVisualizerTimes = [4308,4320,4348,4368,4390,4408,4434,4452];
let CoreVisualizerTypes = [];


let visualBarsFlash2Red;
let visualBarsFlash2RedTransparent;
let visualBarsFlash2RedCore;
let visualBarsFlash2RedCoreTransparent;

let visualBarsFlash2Blue;
let visualBarsFlash2BlueTransparent;
let visualBarsFlash2BlueCore;
let visualBarsFlash2BlueCoreTransparent;

let vignette_fadeout_elapsed = 0;
let sirenRotation = 0;

let warningIntroAlpha = 0;
let warningHoriOffset = 0;
let warningRiseOffset = 0;
let warningColorRange;
let warningColor;

let BarBass;
let BarDrum;
let BarOther;
let BarVocal;
let bar_fadeout_elapsed = 0;

let coreSize;
let coreSize2;
let coreSizeBase = 0;
let coreY = 0;
let coreYStep = 0;

let chargeAlpha = 255;
let chargeSizeBase = 200;
let x;

let twinkleSize = 0;
let twinkleRotation = 0;

let balconyY = 0;
let bridgeY = 0;

function twinkle(x,y, spikeSizeX=40,spikeSizeY=40, centerThicknessX=10,centerThicknessY=10) {

  beginShape();
  vertex(x-centerThicknessX,y+centerThicknessY); //Spike Left
  vertex(x-spikeSizeX,y);

  vertex(x-centerThicknessX,y-centerThicknessY); //Spike Up
  vertex(x,y-spikeSizeY);

  vertex(x+centerThicknessX,y-centerThicknessY); //Spike Right
  vertex(x+spikeSizeX,y);

  vertex(x+centerThicknessX,y+centerThicknessY); //Spike Down
  vertex(x,y+spikeSizeY);

  endShape(CLOSE);

}

// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
   translate(width/2, height/2);
   background(20);
   textFont('Courier New'); // please use CSS safe fonts
   rectMode(CENTER);
   textAlign(CENTER);
   textSize(24);

   let warningCyan = color(100,200,255);
   let warningWhite = color(255,255);
   let warningRed = color(255,0,0,255);
   let warningCyanTransparent = color(100,200,255,0);
   let warningRedTransparent = color(255,0,0,0);

   if (counter == 0) {
      introHeightBase = 320;

      floodHeight = 0;
      floodSub1Height = -(height/10);
      floodSub2Height = -(height/25);
      floodBarsX = 0;
      floodBarsSub1X = 0;
      floodBarsSub2X = 0;
      floodBarsY = height/2;
      floodSubBarsY = (height/2)-(height/25);

      introVisualizerX = -width/4;
      CoreisualizerTypes = [];
      prepFadeout = 100;
      introBarValueMulti = 0;


      warningIntroAlpha = 0;
      warningHoriOffset = 0;
      warningRiseOffset = 0;
      vignette_fadeout_elapsed = 0;
      sirenRotation = 0;

      bar_fadeout_elapsed = 0;


      coreSizeBase = 0;
      coreY = 0;
      coreYStep = 0;

      chargeAlpha = 255;
      chargeSizeBase = 350;
      x = 0;

      twinkleSize = 0;
      twinkleRotation = 0;

      balconyY = height;
      bridgeY = height/3;

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

   //Intro Flood Effects 
   //Sub2
   if (counter > 460 && counter < 1860) {
      floodBarsDrums = map(drum, 0,100, floodHeight+floodSub2Height,(floodHeight+floodSub2Height)*1.25)
      floodBarsSub2X = width/2+((counter*2) % width*.72);
      fill(100,200,255,64);
      if (floodSub2Height < 120 && counter < 1512) {
         floodSub2Height+=10;
      } else if (floodSub2Height > -(height/3) && counter > 1512){
         floodSub2Height-=3;
      }

      for (let i = 0; i < 360; i++){
         rect(floodBarsSub2X,floodSubBarsY, (width/100)+4,floodBarsDrums+(sin(i*5)*height/25));
         floodBarsSub2X-=(width/100);
      }
   }
   //Sub1
   if (counter > 420 && counter < 1860) {
      floodBarsOther = map(other, 0,100, floodHeight+floodSub1Height,(floodHeight+floodSub1Height)*1.25)
      floodBarsSub1X = width/2+((counter*1) % width*.72);
      fill(100,200,255,128);
      if (floodSub1Height < 60 && counter < 1512) {
         floodSub1Height+=5;
      } else if (floodSub1Height > -(height/5) && counter > 1512){
         floodSub1Height-=1.5;
      }

      for (let i = 0; i < 360; i++){
         rect(floodBarsSub1X,floodSubBarsY, (width/100)+4,floodBarsOther+(sin(i*5)*height/25));
         floodBarsSub1X-=(width/100);
      }
   }

   //Siren Effect
   if (counter > 1860 && counter < 4313){
      if (counter < 3258 || counter > 3276){
         fill(255,0,0,128);
         translate(0,-height/1.5);
         rotate(sirenRotation);
         beginShape();
         vertex(width*2,height/2);
         vertex(-width*2,-height/2);
         vertex(-width*2,height/2);
         vertex(width*2,-height/2);
         endShape(CLOSE);
         rotate(-sirenRotation);
         translate(0,height/1.5);
      }
      sirenRotation+=2;
   }

 //Box to hide BG elements behind Bars Temporarily During RisingBlasts
   if (counter > 3096 && counter < 3258) {
      barsHide = map(counter, 3096,3258, 0,1);
      barsHideColor = lerpColor(color(20,0),color(20,255),barsHide);
      fill(barsHideColor);
      rect(0,0, width, height);
   }

   //Red Vignette Effects
   
   if (counter == 3258 || counter == 3270) {
      vignette_fadeout_elapsed = 0;
   }
   if (counter > 3258 && counter < 3271) {
      fill(160-(vignette_fadeout_elapsed),20,20);
      rect(0,0, width,height);
      fill(20,32);
      for (let i = 0; i < 12; i++){
         ellipse(0,0, (width*0.9)-(width*i*0.025),(height*0.9)-(height*i*0.025))
      }
      vignette_fadeout_elapsed += 3.5;
   } else if (counter > 3270 && counter < 3276) {
      fill(160-(vignette_fadeout_elapsed),20,20);
      rect(0,0, width,height);
      fill(20,32);
      for (let i = 0; i < 12; i++){
         ellipse(0,0, (width*0.9)-(width*i*0.025),(height*0.9)-(height*i*0.025))
      }
      vignette_fadeout_elapsed += 23;
   }

 //Box to hide BG elements behind Bars Temporarily During RisingBlasts
   if (counter > 3276 && counter < 3306) {
      FlashMap = map(counter, 3276,3306, 0.75,1);
      FlashColor = lerpColor(color(255,255),color(255,0),FlashMap);
      fill(FlashColor);
      rect(0,0, width, height);
   }

   //VisualBars
   //Intro
   if (counter > 816) {
      introVisualizerX = -width/4 + width/96;
      introVisualizerTypes = [drum*1.5,drum*1.25,drum*.75,drum*.25+other*.25, other*.75,other*1.25,other*1.25,other*.75,other*.25+bass*.25, bass*.75,bass*1.25,bass*1.5];
      for (let i = 0; i < 24; i++) {

         if (i > 11) {
            introArrayDecider = 23 - i;
         } else {
            introArrayDecider = i;
         }


         if (counter > 1860 && counter < 3096 && introBarValueMulti < 100) {
            introBarValueMulti += 0.5;
         } else if (counter > 3096 && counter < 3276 && introBarValueMulti > 0) {
            introBarValueMulti -= 0.025;
         } else if (counter > 3276 && introBarValueMulti < 100) {
            introBarValueMulti += 4;
         }
         introBarValue = introVisualizerTypes[introArrayDecider]/75*(height/5)

         if (counter > 4750) {
            fill(warningCyan);
         } else if (counter > 4470) {
            visualBarsBlueCoreElapsed = map(counter, 4470,4650, 0,1);
            visualBarsFlash2BlueCore = lerpColor(warningWhite,warningCyan, visualBarsBlueCoreElapsed);
            visualBarsFlash2BlueCoreTransparent = lerpColor(warningWhite,warningCyanTransparent, visualBarsBlueCoreElapsed);

            visualBarsBlueCoreSizeElapsed = map(counter, 4470,4538, 0,1);

            if (counter > 4470 && counter < 4751) {
               fill(visualBarsFlash2BlueCoreTransparent);
               rect(introVisualizerX,0, (width/96)+visualBarsBlueCoreSizeElapsed*width/250,(height/5)*(0.05)+introBarValue*(introBarValueMulti/100)+visualBarsBlueCoreSizeElapsed*width/250);
            }
            fill(visualBarsFlash2BlueCore);
         } else if (counter > 1686){
            fill(255,0,0);
         } else if (counter > 1512){
            visualBarsRedElapsed = map(counter, 1512,1572, 0,1);
            visualBarsFlash2Red = lerpColor(warningWhite,warningRed, visualBarsRedElapsed);
            visualBarsFlash2RedTransparent = lerpColor(warningWhite,warningRedTransparent, visualBarsRedElapsed);

            visualBarsRedSizeElapsed = map(counter, 1512,1528, 0,1);

            if (counter > 1512 && counter < 1687) {
               fill(visualBarsFlash2RedTransparent);
               rect(introVisualizerX,0, (width/96)+visualBarsRedSizeElapsed*width/250,(height/5)+visualBarsRedSizeElapsed*width/250);
            }
            fill(visualBarsFlash2Red);
         } else if (counter > introVisualizerTimes[i]) {
            visualBarsBlueElapsed = map(counter, introVisualizerTimes[i],introVisualizerTimes[i]+15, 0,1);
            visualBarsFlash2Blue = lerpColor(warningWhite,warningCyan, visualBarsBlueElapsed);
            
            visualBarsBlueSizeElapsed = map(counter, introVisualizerTimes[i],introVisualizerTimes[i]+45, 0,1); 
            visualBarsFlash2BlueTransparent = lerpColor(warningWhite,warningCyanTransparent, visualBarsBlueSizeElapsed);

            if (counter > introVisualizerTimes[i] && counter < introVisualizerTimes[i]+60) {
               fill(visualBarsFlash2BlueTransparent);
               rect(introVisualizerX,0, (width/96)+visualBarsBlueSizeElapsed*width/100,(height/5)+visualBarsBlueSizeElapsed*width/100);
            }
            fill(visualBarsFlash2Blue);

         } else {
            fill(0,0);
         }
      
         if (counter > 1818 && prepFadeout > 5) {
            prepFadeout-=0.25;
         }

         if (counter > 1860) {
            rect(introVisualizerX,0, (width/96),(height/5)*(prepFadeout/100)+introBarValue*(introBarValueMulti/100));
         } else {
            rect(introVisualizerX,0, (width/96),(height/5)*(prepFadeout/100));
         }
         introVisualizerX += width/48;

      }
   }
   //Nearing the Core
   if (counter > 4308) {
      CoreVisualizerX = -width/4 - width/96;
      coreVisualizerTypes = [drum*1.5,drum*1.25,drum*.75,drum*.25+vocal*.25, vocal*.75,vocal*1.25,vocal*1.25,vocal*.75];
      for (let i = 0; i < 8; i++) {
         coreBarValue = coreVisualizerTypes[i]/75*(height/5)

         if (counter > 4750) {
            fill(warningCyan);
         } else if (counter > 4470) {
            visualBarsBlueCoreElapsed = map(counter, 4470,4650, 0,1);
            visualBarsFlash2BlueCore = lerpColor(warningWhite,warningCyan, visualBarsBlueCoreElapsed);
            visualBarsFlash2BlueCoreTransparent = lerpColor(warningWhite,warningCyanTransparent, visualBarsBlueCoreElapsed);

            visualBarsBlueCoreSizeElapsed = map(counter, 4470,4538, 0,1);

            if (counter > 4470 && counter < 4751) {
               fill(visualBarsFlash2BlueCoreTransparent);
               rect(CoreVisualizerX,0, (width/96)+visualBarsBlueCoreSizeElapsed*width/250,(height/5)*(0.05)+coreBarValue+visualBarsBlueCoreSizeElapsed*width/250);
               rect(-CoreVisualizerX,0, (width/96)+visualBarsBlueCoreSizeElapsed*width/250,(height/5)*(0.05)+coreBarValue+visualBarsBlueCoreSizeElapsed*width/250);
            }
            fill(visualBarsFlash2BlueCore);
         } else if (counter > CoreVisualizerTimes[i]){
            visualBarsRedCoreElapsed = map(counter, CoreVisualizerTimes[i],CoreVisualizerTimes[i]+15, 0,1);
            visualBarsFlash2RedCore = lerpColor(warningWhite,warningRed, visualBarsRedCoreElapsed);
            
            visualBarsRedCoreSizeElapsed = map(counter, CoreVisualizerTimes[i],CoreVisualizerTimes[i]+45, 0,1); 
            visualBarsFlash2RedCoreTransparent = lerpColor(warningWhite,warningRedTransparent, visualBarsRedCoreElapsed);
            
            if (counter > CoreVisualizerTimes[i] && counter < CoreVisualizerTimes[i]+60) {
               fill(visualBarsFlash2RedCoreTransparent);
               rect(CoreVisualizerX,0, (width/96)+visualBarsRedCoreSizeElapsed*width/100,(height/5)*(0.05)+coreBarValue+visualBarsRedCoreSizeElapsed*width/100);
               rect(-CoreVisualizerX,0, (width/96)+visualBarsRedCoreSizeElapsed*width/100,(height/5)*(0.05)+coreBarValue+visualBarsRedCoreSizeElapsed*width/100);
            }
            fill(visualBarsFlash2RedCore);
         } else {
            fill(0,0);
         }

         rect(CoreVisualizerX,0, (width/96),(height/5)*(0.05)+coreBarValue);
         rect(-CoreVisualizerX,0, (width/96),(height/5)*(0.05)+coreBarValue);
         CoreVisualizerX -= width/48;
      }

      for (let j = 0; j < 4; j++) {
         if (counter > 4470) {
            visualBarsBlueCoreElapsed = map(counter, 4470,4650, 0,1);
            visualBarsFlash2BlueCore = lerpColor(warningWhite,warningCyan, visualBarsBlueCoreElapsed);
            visualBarsFlash2BlueCoreTransparent = lerpColor(warningWhite,warningCyanTransparent, visualBarsBlueCoreElapsed);

            visualBarsBlueCoreSizeElapsed = map(counter, 4470,4538, 0,1);

            if (counter > 4470 && counter < 4751) {
               fill(visualBarsFlash2BlueCoreTransparent);
               if (j == 0) {
                  rect(CoreVisualizerX,0, (width/96)+visualBarsBlueCoreSizeElapsed*width/250,(height/5)*(0.05)+(vocal*.25)/75*(height/5)+visualBarsBlueCoreSizeElapsed*width/250);
                  rect(-CoreVisualizerX,0, (width/96)+visualBarsBlueCoreSizeElapsed*width/250,(height/5)*(0.05)+(vocal*.25)/75*(height/5)+visualBarsBlueCoreSizeElapsed*width/250);
               } else {
                  rect(CoreVisualizerX,0, (width/96)+visualBarsBlueCoreSizeElapsed*width/250,(height/5)*(0.05)+visualBarsBlueCoreSizeElapsed*width/250);
                  rect(-CoreVisualizerX,0, (width/96)+visualBarsBlueCoreSizeElapsed*width/250,(height/5)*(0.05)+visualBarsBlueCoreSizeElapsed*width/250);
               }
            }
            fill(visualBarsFlash2BlueCore);
         }

         if (j == 0) {
            rect(CoreVisualizerX,0, (width/96),(height/5)*(0.05)+(vocal*.25)/75*(height/5));
            rect(-CoreVisualizerX,0, (width/96),(height/5)*(0.05)+(vocal*.25)/75*(height/5));
         } else {
            rect(CoreVisualizerX,0, (width/96),(height/5)*(0.05));
            rect(-CoreVisualizerX,0, (width/96),(height/5)*(0.05));
         }
         CoreVisualizerX -= width/48;
      }

   }

   //Box to hide Visualizer Bars Temporarily for Explosion
   if (counter > 6144) {
      barsHide = map(counter, 6144,6312, 0,1);
      barsHideColor = lerpColor(color(20,0),color(20,255),barsHide);
      fill(barsHideColor);
      rect(0,0, width, height);
   }

   //MainFlood (Moved Here for Layering Reasons)
   if (counter > 120 && counter < 5000) {
      floodBarsBass = map(bass, 0,100, floodHeight,floodHeight*1.25)
      floodBarsX = -width/2-((counter*3) % width*.72);
      if (counter > 1860){
         warningColorRange = map(drum, 0,100, 0,1);
         warningColor = lerpColor(warningCyan,warningWhite, warningColorRange);
         fill(warningColor);
      } else {
        fill(100,200,255);
      }
      if (floodHeight < 420 && counter < 1512) {
         floodHeight+=0.5;
      } else if (floodHeight > 160 && counter < 1860) {
         floodHeight-=0.5;
      } else if (counter > 4308) {
         floodBarsY+=0.5;
      }
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
      warningColor = lerpColor(warningCyan,warningWhite, warningColorRange);
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
         if (counter < 4308 && warningRiseOffset < height*7) {
            warningRiseOffset += height/20;
         }
         rect((-width/2)-warningHoriOffset+1131, -warningRiseOffset+(15*height/2), 176,height*2);
         rect((width/2)+warningHoriOffset-1131, -warningRiseOffset+(15*height/2), 176,height*2);
      }
      //Rising 08
      if (counter > 4308) {
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

   //Pre Explosion Twinkle FX
   if (counter > 6270 && counter < 6330) {

      twinkleGrow = map(counter, 6270,6300, 0,height/8);
      twinkleShrink = map(counter, 6300,6330, height/8,0);

      fill(100,200,255);

      if (counter < 6300) {twinkleSize = twinkleGrow;} else {twinkleSize = twinkleShrink;}
      rotate(twinkleRotation);
      twinkle(0,0,twinkleSize,twinkleSize,twinkleSize/4,twinkleSize/4);
      rotate(-twinkleRotation);
      twinkleRotation+=4;

   }

   //ExplosionPulseFX
   if (counter > 6330) {
      for (let i = 0; i < 20; i++) {
         BlastFXTime = map(counter, 6330+(i*5),6360+(i*5), 0,1);
         BlastFXColor = lerpColor(color(100,200,255,128), color(100,200,255,0), BlastFXTime);
         if (counter > 6330+(i*10)) {
            fill(BlastFXColor);
            circle(0,0, coreSizeBase+BlastFXTime*height);
         }
      }
   }

   //Post Explosion City Background

   //Blast Bars
   if (counter > 6330) {
      BarDrum = map(drum, 0,100, coreSizeBase*1.25,coreSizeBase*1.75);
      BarBass = map(bass, 0,100, coreSizeBase*1.25,coreSizeBase*1.75);
      BarOther = map(other, 0,100, coreSizeBase*1.25,coreSizeBase*1.75);
      if (counter > 6330 && counter < 7410 && bar_fadeout_elapsed < 100) {
      bar_fadeout_elapsed+=10;
      } else if (counter > 7410 && bar_fadeout_elapsed > 1) {
      bar_fadeout_elapsed--;
      }
      for (let i = 0; i < 120; i++) {
         fill(113,225,255);
         rect(0,0, 5,BarOther*(bar_fadeout_elapsed/100));
         rotate(3);
         rect(0,0, 5,BarDrum*(bar_fadeout_elapsed/100));
         rotate(3);                                                                                                 
         rect(0,0, 5,BarBass*(bar_fadeout_elapsed/100));
         rotate(3);
         rect(0,0, 5,BarDrum*(bar_fadeout_elapsed/100));
         rotate(3);
      }
   }


   //Main
   if (counter > 4470) {
      if (coreSizeBase < chargeSizeBase && counter < 6144) {
         coreSizeBase++;
      } else if (coreSizeBase > 28 && counter > 6144 && counter < 6330) {
         coreSizeBase-=7;
      } else if (counter == 6330) {
         coreSizeBase = 150;
      } else if (counter > 6330 && counter < 7410) {
         coreSizeBase+=0.5;
      } else if (counter > 8862) {
         coreSizeBase+=1.5;
      }

      coreSize = map(vocal, 0,100, coreSizeBase*1,coreSizeBase*1.25);
      fill(255);
      circle(0,0, coreSize);

      coreSize2 = map(vocal, 0,100, coreSizeBase*1.1,coreSizeBase*1.35);
      fill(100,200,255,128);
      circle(0,0, coreSize2);
   }

   //Post Explosion
   //Box to semi-obscure Core after the Explosion
   if (counter > 7380) {
      CoreMask = map(counter, 7380,7470, 0,1);
      CoreMaskColor = lerpColor(color(20,0),color(20,64),CoreMask);
      CoreMask2 = map(counter, 8778,8862, 1,0);
      CoreMaskColor2 = lerpColor(color(20,0),color(20,64),CoreMask2);
      if (counter > 8777) {fill(CoreMaskColor2);} else if (counter < 7470) {fill(CoreMaskColor);} else {fill(20,64)}
      rect(0,0, width, height);
   }   
   //Foreground
   //Bridge
   if (counter > 7380) {

      if (counter > 8184) {
         bridgeY = map(counter, 8184,8244, height/10,height/3);
         bridgeColorMap = map(counter, 8184,8244, 1,0);
         bridgeColor = lerpColor(color(128,0),color(128,255),bridgeColorMap);
      } else if (counter > 7470) {
         bridgeY = height/10;
         bridgeColor = color(128);
      } else {
         bridgeY = map(counter, 7380,7470, height/3,height/10);
         bridgeColorMap = map(counter, 7380,7470, 0,1);
         bridgeColor = lerpColor(color(128,0),color(128,255),bridgeColorMap);
      }

      fill(bridgeColor);
      rect(0,bridgeY, width,(height/20));
      rect(0,bridgeY+height/2+height/40, width/50,height);
      rect(width/5,bridgeY+height/2+height/40, width/50,height);
      rect(-width/5,bridgeY+height/2+height/40, width/50,height);
      rect(width/2.5,bridgeY+height/2+height/40, width/50,height);
      rect(-width/2.5,bridgeY+height/2+height/40, width/50,height);
   }
   //Balcony
   if (counter > 7380) {
      if (counter > 7470) {balconyY = height/2} else {balconyY = map(counter, 7380,7470, height,height/2);}
      fill(100,200,255,64);
      rect(0,balconyY, width,(height/1.5));
      fill(64);
      rect(0,balconyY, width,(height/3));
      rect(0,balconyY-height/3, width,(height/48));
      fill(0,50,0);
      rect(0,balconyY, width,(height/4));
   }







}