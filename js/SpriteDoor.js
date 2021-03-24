import Sprite from "./Sprite.js";

export default class SpriteDoor extends Sprite {
  desenhar(ctx, dt) {
    ctx.drawImage(
      this.cena.assets.img("door"),
      this.x - this.w / 2,
      this.y - this.h / 2
    );
  }
}
