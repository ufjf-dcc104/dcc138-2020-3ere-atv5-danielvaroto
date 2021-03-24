import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import modeloMapa1 from "../maps/mapa1.js";
import modeloMapa2 from "../maps/mapa2.js";
import SpritePlayer from "./SpritePlayer.js";
import SpriteEnemy from "./SpriteEnemy.js";
import SpriteDoor from "./SpriteDoor.js";

export default class CenaMapa1 extends Cena {
  quandoColidir(a, b) {
    const colidiuPCPorta = (a, b) => a.tags.has("pc") && b.tags.has("door");
    if (colidiuPCPorta(a, b) || colidiuPCPorta(b, a)) {
      this.assets.play("level-up");

      this.game.selecionaCena("cena2");
    }

    const colidiuPCEnemy = (a, b) => a.tags.has("pc") && b.tags.has("enemy");
    if (colidiuPCEnemy(a, b) || colidiuPCEnemy(b, a)) {
      this.assets.play("gameover");

      this.game.selecionaCena("fim");
    }
  }

  preparar() {
    super.preparar();

    const mapa1 = new Mapa(10, 14, 32, this.game.assets.img("tiles"));
    mapa1.carregaMapa(modeloMapa1);

    this.configuraMapa(mapa1);

    const door = new SpriteDoor({
      x: 9 * 32 + 16,
      y: 3 * 32 + 16,
      w: 32,
      h: 32,
      tags: ["door"],
      cena: this,
    });
    this.adicionar(door);

    const pc = new SpritePlayer({
      x: 1 * 32 + 16,
      y: 3 * 32 + 16,
      w: 24,
      h: 24,
      tags: ["pc"],
      cena: this,
    });
    this.adicionar(pc);

    // this.adicionar(
    //   new SpriteEnemy({
    //     x: 10 * 32 + 16,
    //     y: 3 * 32 + 16,
    //     w: 24,
    //     h: 24,
    //     color: "Red",
    //     tags: ["enemy"],
    //     cena: this,
    //     target: pc,
    //   })
    // );
    // this.adicionar(
    //   new SpriteEnemy({
    //     x: 8 * 32 + 16,
    //     y: 5 * 32 + 16,
    //     w: 24,
    //     h: 24,
    //     color: "Red",
    //     tags: ["enemy"],
    //     cena: this,
    //     target: pc,
    //   })
    // );
  }
}
