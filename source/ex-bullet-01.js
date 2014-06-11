// Copyright © 2014 John Watson
// Licensed under the terms of the MIT License


var bulletCount = 0;
var countIt= true;



var GameState = function(game) {
};

// Load images and sounds
GameState.prototype.preload = function() {
    this.game.load.image('bullet', '/assets/gfx/bullet.png');
};

// Setup the example
GameState.prototype.create = function() {
    // Set stage background color
    this.game.stage.backgroundColor = 0x4488cc;

    // Define constants
    this.SHOT_DELAY = 100; // milliseconds (10 bullets/second)
    this.BULLET_SPEED = 500; // pixels/second
    this.NUMBER_OF_BULLETS = 1;

    // Create an object representing our gun
    this.gun = this.game.add.sprite(50, this.game.height/2, 'bullet');

    // Set the pivot point to the center of the gun
    this.gun.anchor.setTo(0.5, 0.5);

    // Create an object pool of bullets
    this.bulletPool = this.game.add.group();
    for(var i = 0; i < this.NUMBER_OF_BULLETS; i++) {
        // Create each bullet and add it to the group.
        var bullet = this.game.add.sprite(0, 0, 'bullet');
        this.bulletPool.add(bullet);

        // Set its pivot point to the center of the bullet
        bullet.anchor.setTo(0.5, 0.5);

        // Enable physics on the bullet
        this.game.physics.enable(bullet, Phaser.Physics.ARCADE);

        // Set its initial state to "dead".
        bullet.kill();
    }

    // Show FPS
    this.game.time.advancedTiming = true;
    this.fpsText = this.game.add.text(
        20, 20, '', { font: '16px Arial', fill: '#ffffff' }
    );
};

GameState.prototype.shootBullet = function() {
    // Enforce a short delay between shots by recording
    // the time that each bullet is shot and testing if
    // the amount of time since the last shot is more than
    // the required delay.





    if (this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
    if (this.game.time.now - this.lastBulletShotAt < this.SHOT_DELAY) return;
    this.lastBulletShotAt = this.game.time.now;

    // Get a dead bullet from the pool
    var bullet = this.bulletPool.getFirstDead();

    // If there aren't any bullets available then don't shoot
    if (bullet === null || bullet === undefined) return;

    // Revive the bullet
    // This makes the bullet "alive"
    

    // Bullets should kill themselves when they leave the world.
    // Phaser takes care of this for me by setting this flag
    // but you can do it yourself by killing the bullet if
    // its x,y coordinates are outside of the world.
    bullet.checkWorldBounds = true;
    bullet.outOfBoundsKill = true;

    // Set the bullet position to the gun position.
    bullet.reset(this.gun.x, this.gun.y);

    // Shoot it

    bullet.body.velocity.x = this.BULLET_SPEED;
    bullet.body.velocity.y = 0;
};

// The update() method is called every frame
GameState.prototype.update = function() {
    if (this.game.time.fps !== 0) {
        this.fpsText.setText(this.game.time.fps + ' FPS');
    }

    // Shoot a bullet


    if (this.game.input.activePointer.isDown) {

        if(countIt == false){
            return;
        }


        if(bulletCount>= 5){
           $('#blah').html("Press the space bar to reload");
            return;
        }
      

        else{

             $('#blah').html("Playing bullets. Custom code from tutorial.");

            bulletCount = bulletCount+1;
             switch(bulletCount){

                case 2:
                     this.BULLET_SPEED = 5000;
                break;
                
                case 3:
                     this.BULLET_SPEED = 1000;

                break;
                 case 4:
                     this.BULLET_SPEED = 1500;
                break;

                default:

                    this.BULLET_SPEED = 500;
                break;

                
            }
            countIt=false;
            setTimeout(function(){
                countIt=true;
            },500)
        }

        this.shootBullet();

    }
};

var game = new Phaser.Game(_EXAMPLEWIDTH, _EXAMPLEHEIGHT, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);
