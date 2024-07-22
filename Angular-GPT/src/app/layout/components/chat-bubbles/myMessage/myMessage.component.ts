import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-message',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <div class="col-start-6 col-end-12 p-3 rounded-lg">
    <div class="flex flex-row-reverse items-center justify-start">
      <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 flex-shrink">
      A
      </div>

      <div class="relative mr-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
        {{ text }}
      </div>
    </div>

  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyMessageComponent { 
  @Input({ required: true }) text!: string;
}
