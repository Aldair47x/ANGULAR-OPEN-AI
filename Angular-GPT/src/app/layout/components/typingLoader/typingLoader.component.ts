import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-typing-loader',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    <div class="typing">
      <span class="circle scaling"></span>
      <span class="circle scaling"></span>
      <span class="circle scaling"></span>
    </div>
  `,
  styleUrls: ['./typingLoader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypingLoaderComponent { }
