import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import modeloMapa1 from "../maps/mapa1.js";
import modeloMapa2 from "../maps/mapa2.js";
import SpritePlayer from "./SpritePlayer.js";
import SpriteEnemy from "./SpriteEnemy.js";
import SpriteDoor from "./SpriteDoor.js";
import SpriteGem from "./SpriteGem.js";

export default class CenaMapa1 extends Cena {
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

    const gemPositions = [
      [4, 7],
      [6, 2],
      [8, 4],
      [9, 6],
      [11, 4],
    ];
    for (let index = 0; index < gemPositions.length; index++) {
      const [x, y] = gemPositions[index];
      this.adicionar(
        new SpriteGem({
          x: x * 32 + 16,
          y: y * 32 + 16,
          w: 16,
          h: 16,
          tags: ["gem"],
          cena: this,
        })
      );
    }

    const pc = new SpritePlayer({
      x: 1 * 32 + 16,
      y: 3 * 32 + 16,
      w: 24,
      h: 24,
      tags: ["pc"],
      cena: this,
    });
    this.adicionar(pc);

    const enemyPositions = [
      [8, 5],
      [11, 3],
    ];
    for (let index = 0; index < enemyPositions.length; index++) {
      const [x, y] = enemyPositions[index];
      this.adicionar(
        new SpriteEnemy({
          x: x * 32 + 16,
          y: y * 32 + 16,
          w: 24,
          h: 24,
          color: "Red",
          tags: ["enemy"],
          cena: this,
          target: pc,
        })
      );
    }
  }
}
