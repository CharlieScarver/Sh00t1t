var Target = (function() {
    function Target(x, y) {
        this.position = new Vector2(x, y);
        this.futurePosition = new Vector2(x, y);
        
        this.width = 20;
        this.height = 20;
        this.center = new Vector2(this.position.x + 8, this.position.y + 8);
        this.health = 100;
        this.panicHealth = 15;
        this.bulletDetected = false;
        
        this.direction = Math.floor(Math.random() * 4 + 1);
        this.velocity = Math.floor(Math.random() * 5 + 9);
        this.ticksUntilNextChange = Math.floor(Math.random() * 15 + 5);
        this.ticksSinceLastChange = 0;

        this.boundingBox = new Rectangle (
            x + this.width,
            y + this.height,
            this.width,
            this.height
        );
        
        this.futureBox = new Rectangle (
            x + this.width,
            y + this.height,
            this.width,
            this.height
        );

    }

    Target.prototype.update = function() {
        
        if(this.position.y < 5) {
            this.direction = 3;
        } else if(this.position.x > 1095) { 
            this.direction = 4;
        } else if(this.position.y > 595) {
            this.direction = 1;
        } else if(this.position.x < 5) {
            this.direction = 2;
        } 
        
        switch(this.direction) {
            case 1:
                this.futurePosition.y -= this.velocity;
                break;
            case 2: 
                this.futurePosition.x += this.velocity;
                break;
            case 3:
                this.futurePosition.y += this.velocity;
                break;
            case 4:
                this.futurePosition.x -= this.velocity;
                break;
        }
        
        this.boundingBox.x = this.futurePosition.x;
        this.boundingBox.y = this.futurePosition.y;
        
        var that = this;
        bullets.forEach(function(bullet) {
            if(that.intersects(bullet)) {
                this.bulletDetected = true;
                if(this.direction > 2) {
                    this.direction += 2;
                } else {
                    this.direction -= 2;
                }
            }
        });
        
        if(this.ticksSinceLastChange == this.ticksUntilNextChange) {
            this.direction = Math.floor(Math.random() * 4 + 1);
            this.velocity = (this.health > this.panicHealth ? Math.floor(Math.random() * 5 + 9) : 15);
            this.ticksUntilNextChange = (this.health > this.panicHealth ?Math.floor(Math.random() * 15 + 5) : 7);
            this.ticksSinceLastChange = 0;
            
            //console.log(this.direction, this.velocity, this.ticksUntilNextChange);
        }
        
        this.ticksSinceLastChange++;
        
        
        if(this.bulletDetected) {
            this.boundingBox.x = this.position.x;
            this.boundingBox.y = this.position.y;
        } else {
            this.position = this.futurePosition;
        }
                          
        
    };


    Target.prototype.render = function(ctx) {
    	
        ctx.fillStyle ="red";
        ctx.fillRect(this.position.x, this.position.y, 20, 20);
        if(this.health > 0) {
            ctx.fillStyle ="white";
            ctx.fillRect(this.position.x + 5, this.position.y + 5, 10, 10);
        }
        if(this.health > this.panicHealth) {
            ctx.fillStyle ="black";
            ctx.fillRect(this.position.x + 8, this.position.y + 8, 4, 4);
        }
        
        
        ctx.fillStyle ="red";
        ctx.fillRect(1000, 20, 50, 10);
        ctx.fillStyle ="green";
        ctx.fillRect(1000, 20, this.health / 2, 10);
        
        
    };
        
        
    Target.prototype.intersects = function(object) {
		return object.boundingBox.intersects(this.boundingBox) || this.boundingBox.intersects(object.boundingBox);
	};

    return Target;
}());