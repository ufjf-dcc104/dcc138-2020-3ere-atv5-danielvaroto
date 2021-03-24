export default class Game {
  constructor(canvas, assets, input) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.assets = assets;
    this.input = input;
    this.cenas = new Map();
    this.cena = null;

    this.resetPoints();
  }

  adicionarCena(chave, cena) {
    this.cenas.set(chave, cena);
    cena.game = this;
    cena.canvas = this.canvas;
    cena.ctx = this.ctx;
    cena.assets = this.assets;
    cena.input = this.input;

    if (this.cena === null) {
      this.selecionaCena(chave);
    }
  }

  addPoint() {
    this.points++;
  }

  getPoints() {
    return this.points;
  }

  resetPoints() {
    this.points = 0;
  }

  selecionaCena(chave) {
    if (this.cenas.has(chave)) {
      this.parar();
      this.cena = this.cenas.get(chave);
      this.iniciar();
    }
  }

  iniciar() {
    this.cena?.preparar(this.texto);
    this.cena?.iniciar();
  }

  parar() {
    this.cena?.parar();
  }
}
