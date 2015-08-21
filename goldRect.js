var GoldRect = (function() {
    function Bullet(x, y) {
        this.position = new Vector2(x, y);
        GoldRect
        this.width = 4;
        this.height = 4;
        
        this.velocityX = (this.position.x > 800 ? ( this.position.x - 800) / 30 : (800 - this.position.x) / 30);
        this.velocityY = (this.position.y > 100 ? ( this.position.y - 100) / 30 : (100 - this.position.y) / 30);

        this.boundingBox = new Rectangle (
            x + this.width / 2,
            y + this.height / 2,
            this.width / 4,
            this.height / 2
        );

    }

    GoldRect.prototype.update = function() {
        
    };


    GoldRect.prototype.render = function(ctx) {
    	
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        
    };

    return GoldRect;
}());