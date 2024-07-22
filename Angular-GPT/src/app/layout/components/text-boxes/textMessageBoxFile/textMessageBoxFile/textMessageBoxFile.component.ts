import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface iTextMessageBoxFile {
  file: File;
  prompt?: string | null;
}

@Component({
  selector: 'app-text-message-box-file',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './textMessageBoxFile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxFileComponent {
  @Input() disableCorrections: boolean = false;
  @Output() onMessage = new EventEmitter<iTextMessageBoxFile>();

  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: [],
    file: [null, Validators.required]
  });
  
  handleFile(event: any) {
    const file = event.target.files.item(0);
    if (!file) {
      return;
    }
    this.form.controls.file.setValue(file);

    // const reader = new FileReader();
    // reader.onload = (e) => {
    //   const text = e.target?.result;
    //   this.onMessage.emit(text as string);
    // };
    // reader.readAsText(file);
  }
  handleSubmit() {
    if( this.form.invalid ) {
      return;
    }
    const { prompt, file } = this.form.value;
    this.onMessage.emit({ prompt, file: file! });
    this.form.reset();
  }


}
