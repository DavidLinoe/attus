import { Injectable } from '@angular/core';
import { delay, map, of } from 'rxjs';

@Injectable()
export class PessoaService {
  buscarPorId(id: number) {
    return of({ id, nome: 'João' }).pipe(delay(500));
  }
  buscarQuantidadeFamiliares(id: number) {
    return of([{ id, nome: 'João' }]).pipe(
      delay(500),
      map((familiares: { id: number; nome: string }[]) => familiares.length),
    );
  }
}
