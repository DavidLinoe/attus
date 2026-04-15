class Produto {
  id: number;
  descricao: string;
  quantidadeEstoque: number;

  constructor(id: number, descricao: string, quantidadeEstoque: number) {
    this.id = id;
    this.descricao = descricao;
    this.quantidadeEstoque = quantidadeEstoque;
  }
}
class Verdureira {
  produtos: Produto[];
  constructor() {
    this.produtos = [
      new Produto(1, 'Maçã', 20),
      new Produto(2, 'Laranja', 0),
      new Produto(3, 'Limão', 20),
    ];
  }

  getDescricaoProduto(produtoId: number): string {
    const produto = this.produtos.find((produto) => produto.id === produtoId);
    return `${produto?.id} - ${produto?.descricao}`;
  }

  hasEstoqueProduto(produtoId: number): boolean {
    const produto = this.produtos.find((produto) => produto.id === produtoId);
    return produto?.quantidadeEstoque ? produto?.quantidadeEstoque >= 1 : false;
  }
}
