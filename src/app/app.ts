import { Component, signal } from '@angular/core';
import { NavigationComponent } from './layout/navigation/containers/navigation.component';
import { PaginaParams, Verdureira } from './objectives/1';
@Component({
  selector: 'app-root',
  imports: [NavigationComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('attus');
  public verdureira = new Verdureira();
  constructor() {
    const descricao = this.verdureira.getDescricaoProduto(1);
    console.log(descricao);

    const estoque = this.verdureira.hasEstoqueProduto(1);
    console.log(estoque);

    let paginaParams: PaginaParams = {
      pagina: 1,
      tamanho: 12,
    };
    
    const filtros = this.verdureira.filtrarEPaginar<{ name: string }>(
      [{ name: 'David Lino' }],
      (item) => item.name === 'David Lino',
      paginaParams,
    );

    console.log(filtros);
  }
}
