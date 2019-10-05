/*jshint esversion: 6 */
/*jshint -W030*/
class HUD {
   constructor(x, y) {
      this.x = x;
      this.y = y;
   }
   writeToDisplay(c) {
      c.font = "30px Comic Sans MS";
      c.fillStyle = "red";
      c.textAlign = "center";
      c.fillText("Statistics", this.x, this.y);
   }
}
class Player {
   constructor(x, y, r) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.velocity = {
         x: 5,
         y: 5
      };
      this.towers = [];
   }

   draw(c) {
      c.beginPath();
      c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
      c.fillStyle = "#fff";
      c.fill();
      c.closePath();
   }

   update(c) {
      if (this.x + this.r > c.canvas.width) {
         this.x = 0 + this.r;
      }
      if (this.x < 0 + this.r) {
         this.x = c.canvas.width - this.r;
      }
      if (this.y > c.canvas.height - this.r) {
         this.y = 0 + this.r;
      }
      if (this.y - this.r < 0) {
         this.y = c.canvas.height - this.r;
      }

      if (keys.ArrowUp) {
         this.y -= this.velocity.y;
      }
      if (keys.ArrowDown) {
         this.y += this.velocity.y;
      }
      if (keys.ArrowLeft) {
         this.x -= this.velocity.x;
      }
      if (keys.ArrowRight) {
         this.x += this.velocity.x;
      }
      this.draw(c);

   }
}
class Homebase {
   constructor(x, y, r, grow) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.grow = 0;
   }
   update(c) {
      this.collPlayerAndHomebase();
      this.draw(c);
      
   }
   draw(c) {
    
      c.beginPath();
      c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
      c.fillStyle = "black";
      c.fill();
      c.closePath();

   }
   collPlayerAndHomebase() {
      let dx = Math.abs(canv.playerMain.x - canv.homebase.x);
      let dy = Math.abs(canv.playerMain.y - canv.homebase.y);
      let distance = (dx * dx + dy * dy);
      let radii = (canv.playerMain.r+canv.homebase.r)*(canv.playerMain.r+canv.homebase.r);
      if (distance <= radii){
         this.r += 1;
      }
   }
}

/* Canvas*/
class PlayingField {
   constructor() {
      this.canvas = document.querySelector('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.cw = this.canvas.width = window.innerWidth;
      this.ch = this.canvas.height = window.innerHeight;
      this.r = 30;
      this.xPlayer = Math.floor(Math.random() * (this.cw + 2*this.r - 2*this.r + 1) + 2*this.r );
      this.yPlayer = Math.floor(Math.random() * (this.ch + 2*this.r - 2*this.r + 1) + 2*this.r );
      this.color = "black";
      this.playerMain = new Player(this.xPlayer, this.yPlayer, this.r);
      this.homebase = new Homebase(this.cw / 2, this.ch / 2, this.r, false);
      this.hud = new HUD(this.cw / 2, 50);
      this.ctx.fillStyle = "grey";
   }

   animate() {
      window.requestAnimationFrame(this.animate.bind(this));
      this.cw = this.canvas.width = window.innerWidth;
      this.ch = this.canvas.height = window.innerHeight;
      this.ctx.fillStyle = "grey";
      this.ctx.fillRect(0, 0, this.cw, this.ch);
      this.homebase.update(this.ctx);
      this.playerMain.update(this.ctx);
      this.hud.writeToDisplay(this.ctx);
      
   }
}

// util


let canv = new PlayingField();
canv.animate();