/**
 * É responsável por modelar algo que se move na tela.
 */
export default class Sprite {
  constructor({
    x = 100,
    y = 100,
    w = 20,
    h = 20,
    color = "white",
    vx = 0,
    vy = 0,
    cena,
    tags = [],
    controlar,
    target,
  }) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.vx = vx;
    this.vy = vy;
    this.cena = cena;
    this.mx = 0;
    this.my = 0;
    this.target = target;

    this.tags = new Set();
    for (let index = 0; index < tags.length; index++) {
      this.tags.add(tags[index]);
    }

    if (controlar) {
      this.controlar = controlar;
    }

    this.quadro = 0;
    this.pose = 11;
    this.executandoAcao = false;
  }

  desenhar(ctx, dt) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    ctx.strokeStyle = "blue";
    ctx.strokeRect(
      this.mx * this.cena.mapa.SIZE,
      this.my * this.cena.mapa.SIZE,
      this.cena.mapa.SIZE,
      this.cena.mapa.SIZE
    );
  }

  controlar(dt) {}

  mover(dt) {
    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;
    this.mx = Math.floor(this.x / this.cena.mapa.SIZE);
    this.my = Math.floor(this.y / this.cena.mapa.SIZE);
  }

  passo(dt) {
    this.controlar(dt);
    this.mover(dt);
  }

  colidiuCom(outro) {
    return !(
      this.x - this.w / 2 > outro.x + outro.w / 2 ||
      this.x + this.w / 2 < outro.x - outro.w / 2 ||
      this.y - this.h / 2 > outro.y + outro.h / 2 ||
      this.y + this.h / 2 < outro.y - outro.h / 2
    );
  }

  aplicaRestricoes(dt) {
    this.aplicaRestricoesDireita(this.mx + 1, this.my - 1);
    this.aplicaRestricoesDireita(this.mx + 1, this.my);
    this.aplicaRestricoesDireita(this.mx + 1, this.my + 1);

    this.aplicaRestricoesEsquerda(this.mx - 1, this.my - 1);
    this.aplicaRestricoesEsquerda(this.mx - 1, this.my);
    this.aplicaRestricoesEsquerda(this.mx - 1, this.my + 1);

    this.aplicaRestricoesBaixo(this.mx - 1, this.my + 1);
    this.aplicaRestricoesBaixo(this.mx, this.my + 1);
    this.aplicaRestricoesBaixo(this.mx + 1, this.my + 1);

    this.aplicaRestricoesCima(this.mx - 1, this.my - 1);
    this.aplicaRestricoesCima(this.mx, this.my - 1);
    this.aplicaRestricoesCima(this.mx + 1, this.my - 1);
  }

  aplicaRestricoesDireita(pmx, pmy) {
    if (this.vx > 0) {
      const SIZE = this.cena.mapa.SIZE;
      if (this.cena.mapa.tileBloqueia(pmy, pmx)) {
        const tile = {
          x: pmx * SIZE + SIZE / 2,
          y: pmy * SIZE + SIZE / 2,
          w: SIZE,
          h: SIZE,
        };
        if (this.colidiuCom(tile)) {
          this.vx = 0;
          this.x = tile.x - tile.w / 2 - this.w / 2 - 1;
        }
      }
    }
  }

  aplicaRestricoesEsquerda(pmx, pmy) {
    if (this.vx < 0) {
      const SIZE = this.cena.mapa.SIZE;
      if (this.cena.mapa.tileBloqueia(pmy, pmx)) {
        const tile = {
          x: pmx * SIZE + SIZE / 2,
          y: pmy * SIZE + SIZE / 2,
          w: SIZE,
          h: SIZE,
        };
        if (this.colidiuCom(tile)) {
          this.vx = 0;
          this.x = tile.x + tile.w / 2 + this.w / 2 + 1;
        }
      }
    }
  }

  aplicaRestricoesBaixo(pmx, pmy) {
    if (this.vy > 0) {
      const SIZE = this.cena.mapa.SIZE;
      if (this.cena.mapa.tileBloqueia(pmy, pmx)) {
        const tile = {
          x: pmx * SIZE + SIZE / 2,
          y: pmy * SIZE + SIZE / 2,
          w: SIZE,
          h: SIZE,
        };
        if (this.colidiuCom(tile)) {
          this.vy = 0;
          this.y = tile.y - tile.h / 2 - this.h / 2 - 1;
        }
      }
    }
  }

  aplicaRestricoesCima(pmx, pmy) {
    if (this.vy < 0) {
      const SIZE = this.cena.mapa.SIZE;
      if (this.cena.mapa.tileBloqueia(pmy, pmx)) {
        const tile = {
          x: pmx * SIZE + SIZE / 2,
          y: pmy * SIZE + SIZE / 2,
          w: SIZE,
          h: SIZE,
        };
        if (this.colidiuCom(tile)) {
          this.vy = 0;
          this.y = tile.y + tile.h / 2 + this.h / 2 + 1;
        }
      }
    }
  }
}
