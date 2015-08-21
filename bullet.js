var Bullet = (function() {
    function Bullet(x, y, dirX, dirY) {
        this.position = new Vector2(x, y);
        
        this.width = 4;
        this.height = 4;
        
        this.directionPoint = new Vector2(dirX, dirY);
        this.movement = {
            left: false,
            right: false,
            down: false,
            up: false
        };
        
        if(this.position.x < this.directionPoint.x) {
           this.movement.right = true;
        } else if (this.position.x > this.directionPoint.x) {
            this.movement.left = true;
        } 
    
        if(this.position.y > this.directionPoint.y) {
            this.movement.up = true;
        } else if(this.position.y < this.directionPoint.y) {
            this.movement.down = true;
        } 
        
        this.velocityX = (this.movement.left ? 
                            ( this.position.x - this.directionPoint.x) / 30 :
                            (this.directionPoint.x - this.position.x) / 30);
        this.velocityY = (this.movement.up ? 
                            ( this.position.y - this.directionPoint.y) / 30 :
                            (this.directionPoint.y - this.position.y) / 30);
        
        this.bonusVelocity = 0;
        
        this.velocityX += this.bonusVelocity;
        this.velocityY += this.bonusVelocity;
        
        this.hit = false;
        this.deleteMe = false;

        this.boundingBox = new Rectangle (
            x + this.width,
            y + this.height,
            this.width,
            this.height
        );

    }

    Bullet.prototype.update = function() {
                     
        if(this.movement.up) {this.position.y -= this.velocityY;}
        else {this.position.y += this.velocityY;}
        
        if(this.movement.right) {this.position.x += this.velocityX;} 
        else {this.position.x -= this.velocityX;}
        
        if(this.position.x < 0 || this.position.x > 1100
        || this.position.y < 0 || this.position.y > 600)
        {
            this.deleteMe = true;
            
        }
        
        if(this.intersects(target)) { 
            
            this.deleteMe = true;
            if(target.health > 0) {
                target.health -= 1;
            }
            console.log("drun" + target.health); 
            
        }
        
        this.boundingBox.x = this.position.x;
        this.boundingBox.y = this.position.y;
        
    };


    Bullet.prototype.render = function(ctx) {
    	
        if(!this.hit) {
            ctx.fillStyle = "black";
        } else {
            ctx.fillStyle = "green";
        }
        
        if(!this.deleteMe) {
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    };
    
    Bullet.prototype.intersects = function (object) {
		return object.boundingBox.intersects(this.boundingBox) || this.boundingBox.intersects(object.boundingBox);
	};

    return Bullet;
}());