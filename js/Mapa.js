export default class Mapa {
  constructor(linhas = 8, colunas = 12, tamanho = 32, image) {
    this.LINHAS = linhas;
    this.COLUNAS = colunas;
    this.SIZE = tamanho;
    this.tiles = [];
    this.cena = null;
    this.image = image;

    for (let l = 0; l < this.LINHAS; l++) {
      this.tiles[l] = [];

      for (let c = 0; c < this.COLUNAS; c++) {
        this.tiles[l][c] = 0;
      }
    }
  }

  desenhar(ctx) {
    for (let l = 0; l < this.LINHAS; l++) {
      for (let c = 0; c < this.COLUNAS; c++) {
        const [imgLine, imgColumn] = this.calculaPosicaoDoTile(
          this.tiles[l][c]
        );

        ctx.drawImage(
          this.image,
          imgColumn * this.SIZE,
          imgLine * this.SIZE,
          this.SIZE,
          this.SIZE,
          c * this.SIZE,
          l * this.SIZE,
          this.SIZE,
          this.SIZE
        );
      }
    }
  }

  carregaMapa(modelo) {
    this.LINHAS = modelo.length;
    this.COLUNAS = modelo[0].length;
    this.tiles = [];

    for (let l = 0; l < this.LINHAS; l++) {
      this.tiles[l] = [];

      for (let c = 0; c < this.COLUNAS; c++) {
        this.tiles[l][c] = modelo[l][c];
      }
    }
  }

  // Primeiro tile (tile = 0) retorna [0, 0]
  // Segundo tile (tile = 1) retorna [0, 1]
  // ...
  // Ultimo tile (tile = 119) retorna [14, 7]
  calculaPosicaoDoTile(tile) {
    return [Math.floor(tile / 8), tile % 8];
  }

  tileBloqueia(pmy, pmx) {
    // tiles usados no mapa1 que bloqueiam movimento
    return [48, 109, 110, 61, 59, 50].includes(this.tiles[pmy][pmx]);
  }

  tileNaoBloqueadoAleatorio() {
    let linhaAleatoria, colunaAleatoria;

    // Gera linha/coluna aleatoria (primeira e ultima linha/coluna nao disponiveis)
    do {
      linhaAleatoria = Math.floor(Math.random() * (this.LINHAS - 2)) + 1;
      colunaAleatoria = Math.floor(Math.random() * (this.COLUNAS - 2)) + 1;
    } while (this.tileBloqueia(linhaAleatoria, colunaAleatoria));

    return [linhaAleatoria, colunaAleatoria];
  }
}
