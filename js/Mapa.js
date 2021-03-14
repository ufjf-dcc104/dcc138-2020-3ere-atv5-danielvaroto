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
        let imgLine;
        let imgColumn;

        switch (this.tiles[l][c]) {
          case 1:
            imgLine = 0;
            imgColumn = 2;
            ctx.lineWidth = 1;
            break;
          case 2:
            imgLine = 2;
            imgColumn = 0;
            break;

          default:
            imgLine = 3;
            imgColumn = 2;
            break;
        }

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
}
