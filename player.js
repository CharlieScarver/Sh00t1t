var Player = (function() {
    function Player(x, y) {
        this.position = new Vector2(x,y);
        this.movement = {
            left: false,
            right: false,
            down: false,
            up: false,
            idle: true
        };
        
        this.width = 40;
        this.height = 40;
        
        this.velocityX = 8;
        this.velocityY = 6;

        this.boundingBox = new Rectangle (
            x + this.width,
            y + this.height,
            this.width,
            this.height
        );

    }

    Player.prototype.update = function() {
        
        if(player.movement.up) {
            player.position.y -= player.velocityY;
        }
        if(player.movement.down) {
            player.position.y += player.velocityY;
        }
        if(player.movement.left) {
            player.position.x -= player.velocityX;
        }
        if(player.movement.right) {
            player.position.x += player.velocityX;
        }
        
        
        this.boundingBox.x = this.position.x;
        this.boundingBox.y = this.position.y;
       
    };


    Player.prototype.render = function(ctx) {
    	
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        
    };

    Player.prototype.intersects = function (object) {
		return object.boundingBox.intersects(this.boundingBox) || this.boundingBox.intersects(object.boundingBox);
	};

	Player.prototype.intersectsRight = function (object) {
    	var playerFutureBox = new Rectangle(
    		this.boundingBox.x + this.velocityX + 1,
    		this.boundingBox.y,
    		this.boundingBox.width,
    		this.boundingBox.height
    	);

		return object.boundingBox.intersects(playerFutureBox) || playerFutureBox.intersects(object.boundingBox);
	};

	Player.prototype.intersectsLeft = function (object) {
    	var playerFutureBox = new Rectangle(
    		this.boundingBox.x - this.velocityX - 1,
    		this.boundingBox.y,
    		this.boundingBox.width,
    		this.boundingBox.height
    	);

		return object.boundingBox.intersects(playerFutureBox) || playerFutureBox.intersects(object.boundingBox);
	};

    return Player;
}());