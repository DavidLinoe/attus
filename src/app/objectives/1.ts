export interface Pagina<T> {
  itens: T[];
  total: number;
}

export interface PaginaParams {
  pagina: number;
  tamanho: number;
}

//*exercicio 1.1
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
export class Verdureira {
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

  //*exercicio 1.2
  filtrarEPaginar<T>(data: T[], filterFn: (item: T) => boolean, params: PaginaParams): Pagina<T> {
    const filtrados = data.filter(filterFn);
    const inicio = (params.pagina - 1) * params.tamanho;
    const itens = filtrados.slice(inicio, inicio + params.tamanho);
    return { itens, total: filtrados.length };
  }

}

