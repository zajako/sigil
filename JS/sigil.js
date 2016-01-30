var _isDown, _spellForms, _r, _g, _rc, _cForm, _skiper, _castFinished;

function Sigil(){
    sigil = this;
    sigil.width = 800;
    sigil.height = 450;
    sigil.drawObjects = [];
    _spellForms = [];
    sigil.material = blood;
    _cForm = 0;
    _skiper = 0;
    _castFinished = false;

    sigil.init();
    // setInterval(function(){
    //     sigil.draw();
    // },5000);
}

Sigil.prototype.init = function() {
    sigil.initCanvas();
    sigil.initGUI();
    sigil.initDollar();
    sigil.draw();
};

Sigil.prototype.initGUI = function() {

    var bg = new cButton('./IMG/lowerscreen.png', 0, 0, 800, 450, false);
    sigil.drawObjects.push(bg);

    var btnDown = new cButton('./IMG/buttons/arrowDown.png', 675, 390, 51, 51, true);
    btnDown.addFunction("sigil.moveDown");
    sigil.drawObjects.push(btnDown);

    var btnUp = new cButton('./IMG/buttons/arrowUp.png', 675, 335, 51, 51, true);
    btnUp.addFunction("sigil.moveUp");
    sigil.drawObjects.push(btnUp);

    var btnLeft = new cButton('./IMG/buttons/arrowLeft.png', 620, 390, 51, 51, true);
    btnLeft.addFunction("sigil.moveLeft");
    sigil.drawObjects.push(btnLeft);

    var btnRight = new cButton('./IMG/buttons/arrowRight.png', 730, 390, 51, 51, true);
    btnRight.addFunction("sigil.moveRight");
    sigil.drawObjects.push(btnRight);

    var btnblood = new cButton('./IMG/buttons/bloodvial.png', 670, 20, 90, 80, true);
    btnblood.addFunction("sigil.selectBlood");
    sigil.drawObjects.push(btnblood);

    var btncharcoal = new cButton('./IMG/buttons/charcoal.png', 675, 110, 70, 48, true);
    btncharcoal.addFunction("sigil.selectCharcoal");
    sigil.drawObjects.push(btncharcoal);

    var btnmercury = new cButton('./IMG/buttons/mercuryvial.png', 670, 165, 90, 80, true);
    btnmercury.addFunction("sigil.selectMercury");
    sigil.drawObjects.push(btnmercury);

    var btngold = new cButton('./IMG/buttons/GoldPowderPile.png', 670, 245, 90, 80, true);
    btngold.addFunction("sigil.selectGold");
    sigil.drawObjects.push(btngold);


};

Sigil.prototype.initCanvas = function() {
    sigil.bottomScreen = document.createElement('canvas');
    sigil.bottomScreen.width  = sigil.width;
    sigil.bottomScreen.height = sigil.height;

    sigil.bottomScreen.addEventListener('click', function(e) {
        // console.log('click: ' + e.offsetX + '/' + e.offsetY);

        $.each(sigil.drawObjects, function( index, object )
        {
            if(object.checkClick(e.offsetX, e.offsetY))
            {
                // console.log("button pressed:"+object.image.src);
                object.pressButton();
            }

        });
    }, false);

    sigil.bottomCtx = sigil.bottomScreen.getContext('2d');
};

Sigil.prototype.draw = function()
{

    console.log("Drawing");
    sigil.bottomCtx.clearRect(0, 0, sigil.width, sigil.height);

    $.each(sigil.drawObjects, function( index, object )
    {
        if(object.image.rotate)
        {
            drawRotatedImage(object.image, object.x, object.y, object.image.rotate)
        }
        else
        {
            sigil.bottomCtx.drawImage(object.image, object.x, object.y, object.width, object.height);
        }
    });

    for(var i=0; i < _spellForms.length; i++)
    {
        var skipper = 0;
        var previous_point = {x: 0, y: 0};
        for(var i2=0; i2 < _spellForms[i].points.length; i2++)
        {
            var point = new spellPoint(_spellForms[i].material.image, _spellForms[i].points[i2].X, _spellForms[i].points[i2].Y, _spellForms[i].material.width, _spellForms[i].material.height, _spellForms[i].points[i2].R);
            // sigil.drawObjects.push(point);


            drawRotatedImage(point.image, point.x, point.y, point.image.rotate)
        }
    }

    

    
};

Sigil.prototype.moveUp = function()
{
    console.log("moving on up");
    myThreeCanvas.player.moveForward();
};

Sigil.prototype.moveDown = function()
{
    console.log("turn down to what");
    myThreeCanvas.player.moveBackward();
};

Sigil.prototype.moveLeft = function()
{
    console.log("to the left to the left");
    myThreeCanvas.player.turnLeft();
};

Sigil.prototype.moveRight = function()
{
    console.log("Right...");
    myThreeCanvas.player.turnRight();
};

Sigil.prototype.selectBlood = function()
{
    console.log("Blood Selected");
    sigil.material = blood;
};

Sigil.prototype.selectCharcoal = function()
{
    console.log("Charcoal Selected");
    sigil.material = charcoal;
};

Sigil.prototype.selectMercury = function()
{
    console.log("Mercury Selected");
    sigil.material = mercury;
};

Sigil.prototype.selectGold = function()
{
    console.log("Gold Selected");
    sigil.material = gold;
};

//Dollar Integration
Sigil.prototype.initDollar = function()
{
    _r = new DollarRecognizer();
    _rc = sigil.getCanvasRect(sigil.bottomScreen);
    _isDown = false;
    _points = [];
    $(sigil.bottomScreen).mousedown(function()
    {
        sigil.mouseDownEvent(event.pageX, event.pageY, event.offsetX, event.offsetY);
    });

    $(sigil.bottomScreen).mouseup(function()
    {
        sigil.mouseUpEvent(event.pageX, event.pageY);
    });

    $(sigil.bottomScreen).mousemove(function()
    {
        sigil.mouseMoveEvent(event.pageX, event.pageY);
    });
}

Sigil.prototype.mouseDownEvent = function(x, y, offX, offY)
{
    document.onselectstart = function() { return false; } // disable drag-select
    document.onmousedown = function() { return false; } // disable drag-select

    var isButton = false;
    $.each(sigil.drawObjects, function( index, object )
    {
        if(object.checkClick(offX, offY))
        {
            isButton = true;
        }
    });


    if(!isButton)
    {
        _isDown = true;
        x -= _rc.x;
        y -= _rc.y - sigil.getScrollY();

        // if(_spellForms.length >= 2)
        // {
        //     console.log("Spell Casted! ("+_spellForms[0].cast+", "+_spellForms[1].cast+", "+_spellForms[2].cast+")");
        //     _spellForms = [];
        // }

        _cForm = _spellForms.length;
        _spellForms[_cForm] = 1;
        _spellForms[_cForm] = new spellForm(sigil.material);
        _spellForms[_cForm].points[0] = new Point(x, y, 0);

        console.log("Recording unistroke...");
    }
}

Sigil.prototype.mouseMoveEvent = function(x, y)
{
    if (_isDown)
    {
        // _skiper++;
        // if(_skiper >= 2)
        // {
            x -= _rc.x;
            y -= _rc.y - sigil.getScrollY();
            if(sigil.material.rotate > 0)
                rotate = Math.floor((Math.random() * sigil.material.rotate) + 1);
            else
                rotate = 0;

            _spellForms[_cForm].points[_spellForms[_cForm].points.length] = new Point(x, y, rotate);
            sigil.draw();
            _skiper = 0;
        // }
    }
}

Sigil.prototype.getScrollY = function()
{
  var scrollY = 0;
  if (typeof(document.body.parentElement) != 'undefined')
  {
    scrollY = document.body.parentElement.scrollTop; // IE
  }
  else if (typeof(window.pageYOffset) != 'undefined')
  {
    scrollY = window.pageYOffset; // FF
  }

  return scrollY;
}

Sigil.prototype.mouseUpEvent = function(x, y)
{
    document.onselectstart = function() { return true; } // enable drag-select
    document.onmousedown = function() { return true; } // enable drag-select
    if(_isDown)
    {
        _isDown = false;
        if (_spellForms[_cForm].points.length >= 10)
        {
            var points = _spellForms[_cForm].points.slice();

            var result = _r.Recognize(points, true);

            console.log("Result: " + result.Name + " (" + round(result.Score,2) + ").");

            _spellForms[_cForm].setSpellCast(result.Name, _cForm);

            if(_cForm >= 2)
            {
                console.log("Spell Casted! ("+_spellForms[_cForm].cast+")");
                console.log("Spell Casted! ("+_spellForms[0].cast+", "+_spellForms[1].cast+", "+_spellForms[2].cast+")");

                sigil.castSpell();
            }
          
            // _spellForms[_cForm].points = _points.slice();
            sigil.draw();
        }
        else // fewer than 10 points were inputted
        {
            console.log("Too few points made. Please try again.");
        }
    }
}

Sigil.prototype.castSpell = function()
{
    
    var formsfinished = 0;

    for(var i=0; i < _spellForms.length; i++)
    {
        var dotsfinished = 0;

        for(var i2=0; i2 < _spellForms[i].points.length; i2++)
        {
            if(lerpVector2(_spellForms[i].points[i2], 400, 0))
            {
                dotsfinished += 1;
                console.log("dotsFinished = "+dotsfinished+"/"+_spellForms[i].points.length);
            }
        }
        if(dotsfinished >= _spellForms[i].points.length)
        {
            formsfinished += 1;
            console.log("formsFinished = "+formsfinished+"/"+_spellForms.length);
        }
    }

    if(formsfinished >= _spellForms.length)
    {
        _castFinished = true;
    }

    sigil.draw();

    if(_castFinished)
    {
        console.log("Cast Finished.");
        _spellForms = [];
        _cForm = 0;
        sigil.draw();
        _castFinished = false;

        myThreeCanvas.sendSpell(_spellForms[0].cast, _spellForms[1].cast, _spellForms[2].cast);
    }
    else
    {
        setTimeout(function(){
            sigil.castSpell();
        },50);
    }
}

function lerpVector2(current, desiredx, desiredy)
{
    xtrue = false;
    ytrue = false;
    
    var acceptableX = false;
    var acceptableY = false;

    if((current.X >= desiredx - 3) && (current.X <= desiredx + 3))
    {
        acceptableX = true;
    }
    else
    {
        current.X += (desiredx - current.X) * 0.3;
    }

    if((current.Y>= desiredy - 3) && (current.Y <= desiredy + 3))
    {
        acceptableY = true;
    }
    else
    {
        current.Y += (desiredy - current.Y) * 0.3;
    }
    
    if(acceptableX && acceptableY)
        return true;
    else
        return false;

}


Sigil.prototype.getCanvasRect = function(canvas)
{
  var w = canvas.width;
  var h = canvas.height;

  // var cx = canvas.offsetLeft;
  // var cy = canvas.offsetTop;
  cx = 5;
  cy = 455;
  console.log("Xoff"+cx+" Yoff:"+cy);

  while (canvas.offsetParent !== null)
  {
    canvas = canvas.offsetParent;
    cx += canvas.offsetLeft;
    cy += canvas.offsetTop;
  }
  return {x: cx, y: cy, width: w, height: h};
}
