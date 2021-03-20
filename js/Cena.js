/**
 * É responsável por desenhar elementos na tela em uma animação.
 */
export default class Cena {
  constructor(canvas = null, assets = null) {
    this.canvas = canvas;
    this.ctx = canvas?.getContext("2d");
    this.assets = assets;
    this.game = null;
  }

  desenhar() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.mapa?.desenhar(this.ctx);

    if (this.assets.acabou()) {
      for (let index = 0; index < this.sprites.length; index++) {
        const sprite = this.sprites[index];
        sprite.desenhar(this.ctx);
        sprite.aplicaRestricoes();
      }
    }

    this.ctx.fillStyle = "yellow";
    this.ctx.fillText(this.assets?.progresso(), 10, 20);
  }

  adicionar(sprite) {
    sprite.cena = this;
    this.sprites.push(sprite);
  }

  passo(dt) {
    if (this.assets.acabou()) {
      for (const sprite of this.sprites) {
        sprite.passo(dt);
      }
    }
  }

  quadro(t) {
    this.t0 = this.t0 ?? t;
    this.dt = (t - this.t0) / 1000;

    this.passo(this.dt);
    this.desenhar();

    this.checaColisao();
    this.removeSpritesARemover();

    if (this.rodando) {
      this.iniciar();
    }
    this.t0 = t;
  }

  iniciar() {
    this.rodando = true;
    this.idAnim = requestAnimationFrame((t) => this.quadro(t));
  }

  parar() {
    this.rodando = false;
    cancelAnimationFrame(this.idAnim);
    this.t0 = null;
    this.dt = 0;
  }

  checaColisao() {
    for (let a = 0; a < this.sprites.length; a++) {
      const spriteA = this.sprites[a];

      for (let b = a + 1; b < this.sprites.length; b++) {
        const spriteB = this.sprites[b];

        if (spriteA.colidiuCom(spriteB)) {
          this.quandoColidir(spriteA, spriteB);
        }
      }
    }
  }

  quandoColidir(a, b) {
    this.assets.play("colisao");

    if (!this.aRemover.includes(a)) {
      this.aRemover.push(a);
    }
    if (!this.aRemover.includes(b)) {
      this.aRemover.push(b);
    }
  }

  removeTodosSprites() {
    this.sprites = [];
    this.aRemover = [];
  }

  removeSpritesARemover() {
    for (const alvo of this.aRemover) {
      const idx = this.sprites.indexOf(alvo);
      if (idx >= 0) {
        this.sprites.splice(idx, 1);
      }
    }

    this.aRemover = [];
  }

  configuraMapa(mapa) {
    this.mapa = mapa;
    this.mapa.cena = this;
  }

  preparar() {
    this.sprites = [];
    this.aRemover = [];
    this.t0 = null;
    this.dt = 0;
    this.idAnim = null;
    this.mapa = null;
    this.rodando = false;
  }
}
