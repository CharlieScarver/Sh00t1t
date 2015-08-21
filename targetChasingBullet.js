var Bullet = (function() {
    function Bullet(x, y) {
        this.position = new Vector2(x, y);
        
        this.width = 4;
        this.height = 4;
        
        this.hit = false;
        this.followMouse = false;
        
        
        this.velocityX = (this.position.x > target.center.x ? 
                            ( this.position.x - target.center.x) / 30 :
                            (target.center.x - this.position.x) / 30);
        this.velocityY = (this.position.y > target.center.y ? 
                            ( this.position.y - target.center.y) / 30 :
                            (target.center.y - this.position.y) / 30);
        
        /*
        this.velocityX = (this.position.x > input.mousePosition.x ? 
                            ( this.position.x - input.mousePosition.x) / 30 :
                            (input.mousePosition.x - this.position.x) / 30);
        this.velocityY = (this.position.y > input.mousePosition.y ? 
                            ( this.position.y - input.mousePosition.y) / 30 :
                            (input.mousePosition.y - this.position.y) / 30); 
        */

        this.boundingBox = new Rectangle (
            x + this.width,
            y + this.height,
            this.width,
            this.height
        );
    }

    Bullet.prototype.update = function() {
            
        // target.center.x = target.position.x + 8
        if(this.position.x < target.position.x + 8 - 10) {
            this.position.x += this.velocityX;
        } else if (this.position.x > target.position.x + 8 + 10) {
            this.position.x -= this.velocityX;
        } else {
            this.position.x = target.position.x + 8;
        }

        // target.center.y = target.position.y + 8
        if(this.position.y > target.position.y + 8 + 10) {
            this.position.y -= this.velocityY;
        } else if(this.position.y < target.position.y + 8 - 10) {
            this.position.y += this.velocityY;
        } else {
            this.position.y = target.position.y + 8;
        }
            
        
        /*   
        if(this.position.x < input.mousePosition.x - 10) {
            this.position.x += this.velocityX;
        } else if (this.position.x > input.mousePosition.x + 10) {
            this.position.x -= this.velocityX;
        } else {
            this.position.x = input.mousePosition.x;
        }

        if(this.position.y > input.mousePosition.y + 10) {
            this.position.y -= this.velocityY;
        } else if(this.position.y < input.mousePosition.y - 10) {
            this.position.y += this.velocityY;
        } else {
            this.position.y = input.mousePosition.y;
        }
        */
         
        // (this.position.x == input.mousePosition.x 
        //  && this.position.y == input.mousePosition.y)
        
        if((this.position.x == target.position.x + 8 
            && this.position.y == target.position.y + 8)) 
        {
            this.hit = true;
        }
        
        
       
    };


    Bullet.prototype.render = function(ctx) {
    	
        if(!this.hit) {
            ctx.fillStyle = "black";
        } else {
            ctx.fillStyle = "green";
        }
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        
    };

    return Bullet;
}());