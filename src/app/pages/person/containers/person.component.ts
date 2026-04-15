import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, concat, forkJoin, merge, Subscription } from 'rxjs';
import { PessoaService } from '../services/person.service';
@Component({
  selector: 'app-root',
  providers: [PessoaService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './person.component.html',
  imports: [CommonModule],
})
export class PersonComponent implements OnInit, OnDestroy {
  //*exercicio exercicio 2.1
  public texto: BehaviorSubject<string> = new BehaviorSubject('');
  public texto2: BehaviorSubject<string> = new BehaviorSubject('');

  private contador = 0;
  private subscriptionBuscarPessoa?: Subscription;

  constructor(private readonly pessoaService: PessoaService) {}

  ngOnInit(): void {
    this.subscriptionBuscarPessoa = this.pessoaService.buscarPorId(1).subscribe((pessoa) => {
      this.texto.next(`Nome: ${pessoa.nome}`);
    });
    setInterval(() => this.contador++, 1000);

    this.ngOnInit2();
  }

  //*exercicio  2.2
  ngOnInit2(): void {
    // esse nome é apenas para mostrar o mesmo init com o que o exercicio 2.2 pede
    const pessoaId = 1;
    const pessoa$ = this.pessoaService.buscarPorId(pessoaId);
    const quantidadeFamiliares$ = this.pessoaService.buscarQuantidadeFamiliares(pessoaId);
    forkJoin([pessoa$, quantidadeFamiliares$]).subscribe(([pessoa, qtdFamiliares]) => {
      this.texto2.next(`Nome: ${pessoa.nome} | familiares: ${qtdFamiliares}`);
      console.log([pessoa, qtdFamiliares]);
    });
  }
  ngOnDestroy(): void {}
}
