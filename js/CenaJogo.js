import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import modeloMapa1 from "../maps/mapa1.js";
import SpritePlayer from "./SpritePlayer.js";
import SpriteEnemy from "./SpriteEnemy.js";

export default class CenaJogo extends Cena {
  quandoColidir(a, b) {
    this.assets.play("colisao");

    if (!this.aRemover.includes(a)) {
      this.aRemover.push(a);
    }
    if (!this.aRemover.includes(b)) {
      this.aRemover.push(b);
    }

    if (a.tags.has("pc") && b.tags.has("enemy")) {
      this.game.selecionaCena("fim");
    }
  }

  preparar() {
    super.preparar();

    const mapa1 = new Mapa(10, 14, 32, this.game.assets.img("tiles"));
    mapa1.carregaMapa(modeloMapa1);

    this.configuraMapa(mapa1);

    const pc = new SpritePlayer({
      x: 1 * 32 + 16,
      y: 3 * 32 + 16,
      color: "White",
      tags: ["pc"],
      cena: this,
    });
    this.adicionar(pc);

    function perseguePC() {
      this.vx = 25 * Math.sign(pc.x - this.x);
      this.vy = 25 * Math.sign(pc.y - this.y);
    }

    this.adicionar(
      new SpriteEnemy({
        x: 360,
        color: "Red",
        controlar: perseguePC,
        tags: ["enemy"],
        cena: this,
      })
    );
    this.adicionar(
      new SpriteEnemy({
        x: 115,
        y: 70,
        color: "Red",
        controlar: perseguePC,
        tags: ["enemy"],
        cena: this,
      })
    );
    this.adicionar(
      new SpriteEnemy({
        x: 115,
        y: 160,
        color: "Red",
        controlar: perseguePC,
        tags: ["enemy"],
        cena: this,
      })
    );
  }
}
