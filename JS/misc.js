function round(n, d) // round 'n' to 'd' decimals
{
  d = Math.pow(10, d);
  return Math.round(n * d) / d;
}

var TO_RADIANS = Math.PI/180; 
function drawRotatedImage(image, x, y, angle) { 
 
    // save the current co-ordinate system 
    // before we screw with it
    sigil.bottomCtx.save(); 
 
    // move to the middle of where we want to draw our image
    sigil.bottomCtx.translate(x, y);
 
    // rotate around that point, converting our 
    // angle from degrees to radians 
    sigil.bottomCtx.rotate(angle * TO_RADIANS);
 
    // draw it up and to the left by half the width
    // and height of the image 
    sigil.bottomCtx.drawImage(image, -(image.width/2), -(image.height/2));
 
    // and restore the co-ords to how they were when we began
    sigil.bottomCtx.restore(); 
}



function radiansToDegrees(radians){
    return 180 * radians / Math.PI;
}

function degreesToRadians(degrees){
    return degrees * (Math.PI / 180);
}

function lerpTowards(value, target, step){
    if(value < target){
        value += step;
    }
    else if(value > target){
        value -= step;
    }
    return value;
}