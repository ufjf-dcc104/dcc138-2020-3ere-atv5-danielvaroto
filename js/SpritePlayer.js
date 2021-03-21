import Sprite from "./Sprite.js";

export default class SpritePlayer extends Sprite {
  // desenhar(ctx) {
  //   this.cena.assets.ctx.fillStyle = this.color;
  //   ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
  //   ctx.strokeStyle = "blue";
  //   ctx.strokeRect(
  //     this.mx * this.cena.mapa.SIZE,
  //     this.my * this.cena.mapa.SIZE,
  //     this.cena.mapa.SIZE,
  //     this.cena.mapa.SIZE
  //   );
  // }

  controlar(dt) {
    if (this.cena.input.comandos.get("MOVE_ESQUERDA")) {
      this.vx = -50;
    } else if (this.cena.input.comandos.get("MOVE_DIREITA")) {
      this.vx = 50;
    } else {
      this.vx = 0;
    }

    if (this.cena.input.comandos.get("MOVE_CIMA")) {
      this.vy = -50;
    } else if (this.cena.input.comandos.get("MOVE_BAIXO")) {
      this.vy = 50;
    } else {
      this.vy = 0;
    }
  }
}
