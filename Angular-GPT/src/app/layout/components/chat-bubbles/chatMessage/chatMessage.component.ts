import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <div class="col-start-1 col-end-9 p-3 rounded-lg">
    <div class="flex flex-row items-start">
      <div class="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink">
      G
      </div>

      <div class="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
        {{ text }}
      </div>
    </div>

  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent { 
  @Input({ required: true }) text!: string;
}
