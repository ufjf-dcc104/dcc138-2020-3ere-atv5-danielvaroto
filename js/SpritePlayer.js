import Sprite from "./Sprite.js";
import SpriteArrow from "./SpriteArrow.js";

const poses = [
  { quadros: 7, velocidade: 3 }, // 0- Feitiço cima
  { quadros: 7, velocidade: 3 }, // 1- Feitiço esquerda
  { quadros: 7, velocidade: 3 }, // 2- Feitiço baixo
  { quadros: 7, velocidade: 3 }, // 3- Feitiço direita
  { quadros: 8, velocidade: 3 }, // 4- Ataque cima (sem sprite da arma)
  { quadros: 8, velocidade: 3 }, // 5- Ataque esquerda (sem sprite da arma)
  { quadros: 8, velocidade: 3 }, // 6- Ataque baixo (sem sprite da arma)
  { quadros: 8, velocidade: 3 }, // 7- Ataque direita (sem sprite da arma)
  { quadros: 9, velocidade: 20 }, // 8- Andar cima
  { quadros: 9, velocidade: 20 }, // 9- Andar esquerda
  { quadros: 9, velocidade: 20 }, // 10- Andar baixo
  { quadros: 9, velocidade: 20 }, // 11- Andar direita
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

export default class SpritePlayer extends Sprite {
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
      this.cena.assets.img("player"),
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
    if (this.executandoAcao) {
      this.vx = this.vy = 0;
    } else {
      if (this.cena.input.comandos.get("MOVE_CIMA")) {
        this.vy = -50;
      } else if (this.cena.input.comandos.get("MOVE_BAIXO")) {
        this.vy = 50;
      } else {
        this.vy = 0;
      }

      if (this.cena.input.comandos.get("MOVE_ESQUERDA")) {
        this.vx = -50;
      } else if (this.cena.input.comandos.get("MOVE_DIREITA")) {
        this.vx = 50;
      } else {
        this.vx = 0;
      }

      if (this.cena.input.comandos.get("BOW_SHOT")) {
        this.atirarComArco();
      }
    }
  }

  atirarComArco() {
    this.executandoAcao = true;
    this.quadro = 0;

    setTimeout(
      (assets) => {
        assets.play("bow-shot");
        this.criaFlecha();
      },
      300,
      this.cena.assets
    );

    // Verifica pose atual para escolher pose de tiro
    if (this.pose == 8) {
      this.pose = 16;
    } else if (this.pose == 10) {
      this.pose = 18;
    } else if (this.pose == 9) {
      this.pose = 17;
    } else if (this.pose == 11) {
      this.pose = 19;
    }
  }

  criaFlecha() {
    if (this.pose == 16) {
    } else if (this.pose == 18) {
    } else if (this.pose == 17) {
    } else if (this.pose == 19) {
      this.cena.adicionar(
        new SpriteArrow({
          x: this.x,
          y: this.y - 3,
          w: 18,
          h: 6,
          vx: 200,
          tags: ["arrow"],
          cena: this.cena,
        })
      );
    }
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
