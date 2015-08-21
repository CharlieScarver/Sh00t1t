var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var input = new Input();
attachListeners(input);

var ground = 460,
    player = new Player(100, ground),
    target= new Target(800, 100);
    bullets = new Array(),
    delIndexes = new Array(),
    canShoot = true,
    newAngle = 0,
    weaponAngle = 0;

var canSwitch = true;


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 2)) + min;
}

function update() {
    tick();
    render(ctx);
    requestAnimationFrame(update);
}

function tick() {
    //timeToGiftCreation = Math.floor(new Date().getTime() / 1000) % 60;
    delIndexes = new Array();
    
    if(input.up || input.w) {
        player.movement.up = true;
        player.movement.down = false;
        player.movement.idle = false;
    } else if(input.down || input.s) {
        player.movement.down = true;
        player.movement.up = false;
        player.movement.idle = false;
    } else {
        player.movement.up = false;
        player.movement.down = false;
    }
    
    if(input.left || input.a) {
        player.movement.left = true;
        player.movement.right = false;
        player.movement.idle = false;
    } else if(input.right || input.d) {
        player.movement.right = true;
        player.movement.left = false;
        player.movement.idle = false;
    } else {
        player.movement.left = false;
        player.movement.right = false;
    }
    
    
    if(input.space || input.mouseIsDown) {
        if(canShoot) {
            bullets.push(new Bullet(player.position.x + player.width /2, 
                        player.position.y + player.height /2, 
                        target.position.x + 8, 
                        target.position.y + 8));
        }
        canShoot = false;
    } else {
        canShoot = true;
    }
    
    if(input.m) {
        
        if(canSwitch) {
            bullets.forEach(function(bullet) { 
                bullet.followMouse = (bullet.followMouse ? false : true); 
            });
            canSwitch = false;
        } else {
            canSwitch = true;
        }
        
        
    }
    
    
    newAngle = angle(80, 50, input.mousePosition.x, input.mousePosition.y);
    weaponAngle = angle(player.position.x, 
                        player.position.y, 
                        target.position.x + 8, 
                        target.position.y + 8);
    
    
    
    if(target.health > 0) {
        target.update();
    }
    
    bullets.forEach(function(bullet) { 
        bullet.update(); 
        if(bullet.deleteMe) {
            delIndexes.push(bullets.indexOf(bullet));
        }
    });
    
    if(delIndexes.length > 0) {
        delIndexes.forEach(function(index){
            bullets.splice(index, 1);
        });
    }

    player.update();

    //console.log(bullets.length);

}

function render(ctx) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillRect(canvas.width - 1, 0, 1, canvas.height);
    ctx.fillRect(0, canvas.height - 1, canvas.width, 1);
    
    
    drawBoundingBoxes();
    
    bullets.forEach(function(bullet) { bullet.render(ctx); }); 
    
    
    //drawRotatedRect(80, 50, 100, 20, 45);
    ctx.fillStyle ="black";
    ctx.fillRect(80, 80, 90, 20);
        
    //-------------------------------------------------
    ctx.save();

    ctx.beginPath();
    // move the rotation point to the center of the rect
    ctx.translate(80 + 90 / 2, 80 + 20 / 2);
    // rotate the rect
    ctx.rotate(newAngle * Math.PI / 180);

    // draw the rect on the transformed context
    // Note: after transforming [0,0] is visually [x,y]
    //       so the rect needs to be offset accordingly when drawn
    ctx.rect(-90 / 2, -20 / 2, 90, 20);

    ctx.fillStyle = "gold";
    ctx.fill();

    // restore the context to its untranslated/unrotated state
    ctx.restore();
    //--------------------------------------------------
    
    ctx.save();

    ctx.beginPath();
    // move the rotation point to the center of the rect
    ctx.translate(player.position.x - (player.width / 2) + 90 / 2, player.position.y + (player.height / 4) + 20 / 2);
    // rotate the rect
    ctx.rotate(weaponAngle * Math.PI / 180);

    // draw the rect on the transformed context
    // Note: after transforming [0,0] is visually [x,y]
    //       so the rect needs to be offset accordingly when drawn
    ctx.fillStyle = "gold";
    ctx.fillRect(-24 / 2, -20 / 2, 55, 20);

    // restore the context to its untranslated/unrotated state
    ctx.restore();
    //--------------------------------------------------
    
    player.render(ctx);
    target.render(ctx);

}

function drawBoundingBoxes() {
    ctx.beginPath();
    ctx.strokeStyle = 'green';

    ctx.rect(player.boundingBox.x, player.boundingBox.y, player.boundingBox.width, player.boundingBox.height);
    ctx.rect(target.boundingBox.x, target.boundingBox.y, target.boundingBox.width, target.boundingBox.height);
    bullets.forEach(function(bullet) { 
        ctx.rect(bullet.boundingBox.x, bullet.boundingBox.y, bullet.boundingBox.width, bullet.boundingBox.height);
    });

    ctx.stroke();
}

function angle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}


update();
// cyberscater@gmail.com