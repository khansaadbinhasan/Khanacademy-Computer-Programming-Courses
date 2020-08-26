var sketchProc = function(processingInstance) 
{

    with (processingInstance) 
    {
    	//Added cannonBalls when beaver hits it game is over
		//Made a Cannon ball class and an object of it called ball

		size(400, 400); 
        frameRate(30);

		var Beaver = function(x, y) 
		{
			this.x = x;
			this.y = y;
			this.img = PImage("happy-hoppy.jpeg");
			this.sticks = 0;
		};

		Beaver.prototype.draw = function() 
		{
			fill(255, 0, 0);
			this.y = constrain(this.y, 0, height-50);
			image(this.img, this.x, this.y, 40, 40);
		};

		Beaver.prototype.hop = function() 
		{
			this.img = PImage("happy-hoppy.jpeg")
			// this.img = getImage("creatures/Hopper-Jumping");
			this.y -= 5;
		};

		Beaver.prototype.fall = function() 
		{
			this.img = PImage("happy-hoppy.jpeg")
			// this.img = getImage("creatures/Hopper-Happy");
			this.y += 5;
		};

		Beaver.prototype.checkForStickGrab = function(stick) 
		{
			if ((stick.x >= this.x && stick.x <= (this.x + 40)) &&
			    (stick.y >= this.y && stick.y <= (this.y + 40))) 
			{
			    stick.y = -400;
			    this.sticks++;
			}
		};


		Beaver.prototype.checkForCollision = function(balls)
		{
			if( balls.x >= this.x && balls.x <= this.x+5 && balls.y <= this.y+5 && balls.y >= this.y )
			{
			    return true;                
			}
		};

		var Stick = function(x, y) 
		{
			this.x = x;
			this.y = y;
		};

		Stick.prototype.draw = function() 
		{
			fill(89, 71, 0);
			rectMode(CENTER);
			rect(this.x, this.y, 5, 40);
		};

		var CannonBalls = function(x,y)
		{
			this.x = 0;
			this.y = random(400);
		};

		CannonBalls.prototype.draw = function(x,y) 
		{
			fill(255, 0, 0);
			this.y = y;
			this.x = x;
			ellipse(this.x,this.y,10,10);
		};

		var beaver = new Beaver(200, 300);
		var ball = new CannonBalls();
		var x = 0;
		var y = [];
		var flag = 0;
		var win=0;
		var lose = 0;

		for( var i = 0 ; i < 5 ; i++ )
		{
			y.push(random(400));
		}

		var sticks = [];

		for (var i = 0; i < 40; i++) 
		{  
			sticks.push(new Stick(i * 40 + 300, random(20, 260)));
		}

		var grassXs = [];

		for (var i = 0; i < 25; i++) 
		{ 
			grassXs.push(i*20);
		}

		draw = function() 
		{
			// static
			background(227, 254, 255);
			fill(130, 79, 43);
			rectMode(CORNER);
			rect(0, height*0.90, width, height*0.10);

			for (var i = 0; i < grassXs.length; i++) 
			{
			    image(PImage("happy-hoppy.jpeg");
			    // image(getImage("cute/GrassBlock"), grassXs[i], height*0.85, 20, 20);
			    grassXs[i] -= 1;

			    if (grassXs[i] <= -20) 
			    {
			        grassXs[i] = width;
			    }
			}

			for (var i = 0; i < sticks.length; i++) 
			{
			    sticks[i].draw();
			    beaver.checkForStickGrab(sticks[i]);
			    sticks[i].x -= 1;
			}

			textSize(18);
			text("Score: " + beaver.sticks, 20, 30);

			if (beaver.sticks/sticks.length >= 0.95 && lose === 0 ) 
			{
			    textSize(36);
			    text("YOU WIN!!!!", 100, 200);
			    win=1;
			}

			if (keyIsPressed && keyCode === 0) 
			{
			    beaver.hop();
			} 

			else 
			{
			    beaver.fall();
			}
			
			beaver.draw();

			if( x < 400 )
			{
			    
			   for( var i = 0 ; i < 5 ; i++)
			   {
			       // frameRate(1);
			        ball.draw(x,y[i]);
			
			        if(beaver.checkForCollision(ball) === true)
			        {
			            flag = 1;                                                    
			        }
			        
			        x++;
			   }
			}   

			if( x >= 400 )
			{
			    x = 0;
			    y = [];
			
			    for( var i = 0 ; i < 5 ; i++ )
			    {
			        y.push(random(400));
			    }

			}

			if( flag === 1 && win === 0 )
			{
			    color(255, 0, 89);
			    textSize(36);
			    text("GAME OVER" , 100,200);
			    lose = 1;
			}
		 
		};
	
	};

};

// Get the canvas that Processing-js will use
var canvas = document.getElementById("mycanvas"); 
// Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
var processingInstance = new Processing(canvas, sketchProc); 
