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
        sprite.desenhar(this.ctx, this.dt);
        sprite.aplicaRestricoes();
      }
    }

    this.ctx.fillStyle = "yellow";
    this.ctx.textAlign = "left";
    this.ctx.fillText(`Pontos: ${this.game.getPoints()}`, 10, 20);
  }

  adicionar(sprite) {
    sprite.cena = this;
    this.sprites.push(sprite);
  }

  passo() {
    if (this.assets.acabou()) {
      for (const sprite of this.sprites) {
        sprite.passo(this.dt);
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
    if (a.tags.has("chest") && b.tags.has("pc")) {
      this.assets.play("level-up");

      this.game.selecionaCena("fim");
      this.game.cena.texto = `Muitos parabains! Pontos: ${this.game.getPoints()}`;
    }

    if (a.tags.has("gem") && b.tags.has("pc")) {
      this.assets.play("coin");

      this.aRemover.push(a);

      this.game.addPoint();
    }

    if (a.tags.has("pc") && b.tags.has("enemy")) {
      this.assets.play("gameover");

      this.game.selecionaCena("fim");
      this.game.cena.texto = "GAME OVER!";
    }

    if (a.tags.has("enemy") && b.tags.has("arrow") && b.vx !== 0) {
      this.assets.play("hurt");

      this.aRemover.push(a);
      this.aRemover.push(b);
    }

    if (a.tags.has("door") && b.tags.has("pc")) {
      this.assets.play("level-up");

      this.game.selecionaCena("cena2");
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
