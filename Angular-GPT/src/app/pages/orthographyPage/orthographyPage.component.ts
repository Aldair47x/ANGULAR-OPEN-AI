import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';
import { TextMessageBoxFileComponent } from '@components/text-boxes/textMessageBoxFile/textMessageBoxFile/textMessageBoxFile.component';
import { TextMessageBoxSelectComponent } from '@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { iMessage } from '@interfaces/message.interface';
import { OpenAIService } from 'app/services/openai.service';
import { GptMessageOrthohraphyComponent } from "../../layout/gptMessageOrthohraphy/gptMessageOrthohraphy.component";


@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent,
    GptMessageOrthohraphyComponent
],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export  default class OrthographyPageComponent {
  public messages = signal<iMessage[]>([{ isGpt: false, text: 'Hello!' }]);
  public isTyping = signal<boolean>(false);
  public openAiService = inject( OpenAIService );

  handleMessage(message: any) {
    this.isTyping.set(true);
    this.messages.update((messages) => [...messages, { isGpt: false, text: message }]);
    this.openAiService.checkOrthography(message).subscribe({
      next: (response) => {
        console.log(response, 'response');
        this.isTyping.set(false);
        if (response.ok) {
          this.messages.update((messages) => [
            ...messages,
            { isGpt: true, text: response.message, userScore: response.userScore, errors: response.errors },
          ]);
        } else {
          this.messages.update((messages) => [
            ...messages,
            { isGpt: true, text: `Error: ${response.error}` },
          ]);
        }
      },
      error: (error) => {
        this.isTyping.set(false);
        this.messages.update((messages) => [
          ...messages,
          { isGpt: true, text: `Error: ${error.message}` },
        ]);
      },
    });
  }

  handleFile(message: any) {
    console.log(message, 'file');
  }

  handleSelect(message: any) {
    console.log(message, 'select');
  }
}
