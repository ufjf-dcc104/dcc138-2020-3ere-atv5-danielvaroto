import Sprite from "./Sprite.js";

const poses = [
  { quadros: 7, velocidade: 3 }, // 0- Feitiço cima
  { quadros: 7, velocidade: 3 }, // 1- Feitiço esquerda
  { quadros: 7, velocidade: 3 }, // 2- Feitiço baixo
  { quadros: 7, velocidade: 3 }, // 3- Feitiço direita
  { quadros: 8, velocidade: 3 }, // 4- Ataque cima (sem sprite da arma)
  { quadros: 8, velocidade: 3 }, // 5- Ataque esquerda (sem sprite da arma)
  { quadros: 8, velocidade: 3 }, // 6- Ataque baixo (sem sprite da arma)
  { quadros: 8, velocidade: 3 }, // 7- Ataque direita (sem sprite da arma)
  { quadros: 9, velocidade: 15 }, // 8- Andar cima
  { quadros: 9, velocidade: 15 }, // 9- Andar esquerda
  { quadros: 9, velocidade: 15 }, // 10- Andar baixo
  { quadros: 9, velocidade: 15 }, // 11- Andar direita
  { quadros: 6, velocidade: 10 }, // 12- Ataque cima (sem sprite da arma)
  { quadros: 6, velocidade: 10 }, // 13- Ataque esquerda (sem sprite da arma)
  { quadros: 6, velocidade: 10 }, // 14- Ataque baixo (sem sprite da arma)
  { quadros: 6, velocidade: 10 }, // 15- Ataque direita (sem sprite da arma)
  { quadros: 13, velocidade: 30 }, // 16- Arco cima
  { quadros: 13, velocidade: 30 }, // 17- Arco esquerda
  { quadros: 13, velocidade: 30 }, // 18- Arco baixo
  { quadros: 13, velocidade: 30 }, // 19- Arco direita
  { quadros: 6, velocidade: 3 }, // 20- Ferida
];

export default class SpriteEnemy extends Sprite {
  desenhar(ctx, dt) {
    let acabouQuadros = this.quadro > poses[this.pose].quadros - 1.1;
    let personagemParado = this.vx === 0 && this.vy === 0;

    if (acabouQuadros) {
      this.executandoAcao = false;
    }

    this.definirPose();

    this.quadro =
      acabouQuadros || (!this.executandoAcao && personagemParado)
        ? 0
        : this.quadro + poses[this.pose].velocidade * dt;

    ctx.drawImage(
      this.cena.assets.img("enemy"),
      // sx, sy, sw, sh
      Math.floor(this.quadro) * 64,
      this.pose * 64,
      64,
      64,
      // dx, dy, dw, dh
      this.x - this.w / 2 - 4,
      this.y - this.h / 2 - 7,
      this.w + 8,
      this.h + 8
    ); // desenha imagem um pouco maior para preencher a width e height
  }

  controlar(dt) {
    this.vx = 25 * Math.sign(this.target.x - this.x);
    this.vy = 25 * Math.sign(this.target.y - this.y);
  }

  definirPose() {
    if (!this.executandoAcao) {
      if (this.vx < 0) {
        this.pose = 9; // 9- Andar esquerda
      } else if (this.vx > 0) {
        this.pose = 11; // 11- Andar direita
      } else if (this.vy < 0) {
        this.pose = 8; // 8- Andar cima
      } else if (this.vy > 0) {
        this.pose = 10; // 10- Andar baixo
      }
    }
  }
}
