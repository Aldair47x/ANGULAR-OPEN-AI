import { Injectable } from '@angular/core';
import { orthographyUseCase } from '@use-cases//orthography/orthography';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenAIService {
  constructor() {}

  checkOrthography(prompt: string) {
    return from(orthographyUseCase(prompt));
  }
}
