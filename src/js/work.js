/*jshint esversion: 6 */
/*jshint -W030*/

class Player {
   constructor(x, y, r) {
      this.x = x,
         this.y = y,
         this.r = r,
         this.velocity = {
            x: 1,
            y: 1
         };
   }

   draw(c) {
      c.save();
      c.beginPath();
      c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
      c.fillStyle = "#fff";
      c.shadowColor = "#e3eaef";
      c.shadowBlur = 20;
      c.fill();
      c.closePath();
      c.restore();

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
   constructor(x, y) {
      this.x = x;
      this.y = y;
   }
   update(c) {
      this.draw(c);
   }
   draw(c) {
      c.save();
      c.beginPath();
      c.arc(this.x + 100, this.y + 100, 50, 0, Math.PI * 2, false);
      c.fillStyle = "black";
      c.shadowColor = "#e3eaef";
      c.shadowBlur = 20;
      c.fill();
      c.closePath();
      c.restore();
   }
}

/* Canvas*/
class PlayingField {
   constructor() {
      this.canvas = document.querySelector('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.cw = this.canvas.width = window.innerWidth;
      this.ch = this.canvas.height = window.innerHeight;
      this.r = Math.random() * 100;
      this.ufo = new Player(this.cw / 2, this.ch / 2, this.r);
      this.homebase = new Homebase(this.cw / 2 + 50, this.ch / 2 + 50);
      this.ctx.fillStyle = "grey";
   }

   animate() {
      window.requestAnimationFrame(this.animate.bind(this));
      this.cw = this.canvas.width = window.innerWidth;
      this.ch = this.canvas.height = window.innerHeight;
      this.ctx.fillStyle = "grey";
      this.ctx.fillRect(0, 0, this.cw, this.ch);
      this.homebase.update(this.ctx);
      this.ufo.update(this.ctx);
      console.log(this.ufo.x, this.ufo.r);
      collPlayerAndHomebase(this.ufo.x, this.ufo.y, this.homebase.x, this.homebase.y);
   }
}
//util
function collPlayerAndHomebase(xPlayer, yPlayer, xHomeBase, yHomeBase){
   
}

let canv = new PlayingField();
canv.animate();