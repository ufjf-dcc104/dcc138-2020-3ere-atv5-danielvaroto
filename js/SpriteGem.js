import Sprite from "./Sprite.js";

export default class SpriteGem extends Sprite {
  desenhar(ctx, dt) {
    ctx.drawImage(
      this.cena.assets.img("gem"),
      this.x - this.w / 2,
      this.y - this.h / 2,
      this.w,
      this.h
    );
  }
}
