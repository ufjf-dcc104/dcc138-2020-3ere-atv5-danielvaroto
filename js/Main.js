import AssetManager from "./AssetManager.js";
import Mixer from "./Mixer.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";
import CenaMapa1 from "./CenaMapa1.js";
import CenaMapa2 from "./CenaMapa2.js";
import CenaCarregando from "./CenaCarregando.js";
import CenaFim from "./CenaFim.js";

const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);

assets.carregaImagem("tiles", "assets/tiles.png");
assets.carregaImagem("player", "assets/player.png");
assets.carregaImagem("enemy", "assets/enemy.png");
assets.carregaImagem("door", "assets/door.png");
assets.carregaImagem("gem", "assets/Gem.png");
assets.carregaImagem("chest", "assets/ChestBlue.png");
assets.carregaImagem("arrow", "assets/arrow.png");

assets.carregaAudio("bow-shot", "assets/bow-shot.ogg");
assets.carregaAudio("coin", "assets/coin.wav");
assets.carregaAudio("colisao", "assets/hurt.wav");
assets.carregaAudio("gameover", "assets/gameover.wav");
assets.carregaAudio("level-up", "assets/level-up.wav");
assets.carregaAudio("hurt", "assets/hurt.wav");

const canvas = document.querySelector("canvas");
canvas.width = 14 * 32;
canvas.height = 10 * 32;

input.configurarTeclado({
  ArrowLeft: "MOVE_ESQUERDA",
  ArrowRight: "MOVE_DIREITA",
  ArrowUp: "MOVE_CIMA",
  ArrowDown: "MOVE_BAIXO",
  " ": "BOW_SHOT",
  Enter: "PROXIMA_CENA",
});

const game = new Game(canvas, assets, input);

const carregando = new CenaCarregando();
const cena1 = new CenaMapa1();
const cena2 = new CenaMapa2();
const fim = new CenaFim();

game.adicionarCena("carregando", carregando);
game.adicionarCena("cena1", cena1);
game.adicionarCena("cena2", cena2);
game.adicionarCena("fim", fim);
