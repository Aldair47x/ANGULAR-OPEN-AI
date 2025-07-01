import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-gpt-message-orthohraphy',
  standalone: true,
  imports: [],
  templateUrl: './gptMessageOrthohraphy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageOrthohraphyComponent {
  @Input() userScore: number = 0;
  @Input() errors: any[] = [];
  @Input() message: string = '';
}
