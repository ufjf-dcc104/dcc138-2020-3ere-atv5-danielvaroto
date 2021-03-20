import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Mixer from "./Mixer.js";
import Sprite from "./Sprite.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";
import modeloMapa1 from "../maps/mapa1.js";
import CenaJogo from "./CenaJogo.js";
import CenaCarregando from "./CenaCarregando.js";

const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.carregaImagem("tiles", "assets/tiles.png");
assets.carregaAudio("colisao", "assets/hurt.wav");

const canvas = document.querySelector("canvas");
canvas.width = 14 * 32;
canvas.height = 10 * 32;

input.configurarTeclado({
  ArrowLeft: "MOVE_ESQUERDA",
  ArrowRight: "MOVE_DIREITA",
  ArrowUp: "MOVE_CIMA",
  ArrowDown: "MOVE_BAIXO",
  " ": "PROXIMA_CENA",
});

const game = new Game(canvas, assets, input);

const cena0 = new CenaCarregando(canvas, assets);
const cena1 = new CenaJogo(canvas, assets);
game.adicionarCena("carregando", cena0);
game.adicionarCena("jogo", cena1);

const mapa1 = new Mapa(10, 14, 32, assets.img("tiles"));
mapa1.carregaMapa(modeloMapa1);
cena1.configuraMapa(mapa1);

adicionaSpritesAleatoriamente();
// setInterval(adicionaSpritesAleatoriamente, 4000);

game.iniciar();

function adicionaSpritesAleatoriamente() {
  cena1.removeTodosSprites();

  const pc = new Sprite({
    x: 1 * 32 + 16,
    y: 3 * 32 + 16,
    color: "White",
  });
  pc.controlar = function (dt) {
    if (input.comandos.get("MOVE_ESQUERDA")) {
      this.vx = -50;
    } else if (input.comandos.get("MOVE_DIREITA")) {
      this.vx = 50;
    } else {
      this.vx = 0;
    }

    if (input.comandos.get("MOVE_CIMA")) {
      this.vy = -50;
    } else if (input.comandos.get("MOVE_BAIXO")) {
      this.vy = 50;
    } else {
      this.vy = 0;
    }
  };

  cena1.adicionar(pc);

  function perseguePC() {
    this.vx = 25 * Math.sign(pc.x - this.x);
    this.vy = 25 * Math.sign(pc.y - this.y);
  }

  cena1.adicionar(new Sprite({ x: 360, color: "Red", controlar: perseguePC }));
  cena1.adicionar(
    new Sprite({ x: 115, y: 70, color: "Red", controlar: perseguePC })
  );
  cena1.adicionar(
    new Sprite({ x: 115, y: 160, color: "Red", controlar: perseguePC })
  );

  // const cores = [
  //   "Black",
  //   "Blue",
  //   "Brown",
  //   "Gold",
  //   "Grey",
  //   "Green",
  //   "Orange",
  //   "Pink",
  //   "Purple",
  //   "Red",
  //   "Silver",
  //   "White",
  //   "Yellow",
  // ];
  // for (let i = 0; i < 10; i++) {
  //   const [linha, coluna] = mapa1.tileNaoBloqueadoAleatorio();
  //   const cor = cores[Math.floor(Math.random() * cores.length)];

  //   let vx = 0;
  //   let vy = 0;
  //   // define uma direcao aleatoria para multiplicar por de vx ou vy
  //   let direcao = Math.random() > 0.5 ? -1 : 1;

  //   // Aleatoriamente decide se a velocidade vai
  //   // ser em relacao ao x ou y
  //   if (Math.random() > 0.5) {
  //     vx = 20 * direcao;
  //   } else {
  //     vy = 20 * direcao;
  //   }

  //   cena1.adicionar(
  //     new Sprite({
  //       x: coluna * 32 + 16,
  //       y: linha * 32 + 16,
  //       vx: vx,
  //       vy: vy,
  //       color: cor,
  //     })
  //   );
  // }
}
