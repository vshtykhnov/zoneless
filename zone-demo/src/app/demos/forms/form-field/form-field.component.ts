import {
  Component,
  DoCheck,
  Input,
  ElementRef,
  Renderer2,
  NgZone,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  ControlContainer,
  FormGroupDirective,
} from '@angular/forms';
import { FlashService } from '../../../services/flash.service';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div #container class="field-wrapper">
      <label [for]="field">{{ field | titlecase }}</label>
      <input [id]="field" [formControlName]="field" />
    </div>
    {{ isRefreshPhase ? flash() : '' }}
  `,
  styles: [
    `
      .field-wrapper {
        display: flex;
        flex-direction: column;
        padding: 4px;
        border-radius: 4px;
      }
      label {
        font-size: 0.8rem;
        color: #555;
      }
      input {
        padding: 4px 8px;
        font-size: 0.9rem;
      }
      .flash-outline {
        box-shadow: 0 0 0 3px red;
        transition: box-shadow 0.2s ease;
      }
    `,
  ],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class FormFieldComponent implements DoCheck {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;
  @Input() field!: string;
  @Input() isRefreshPhase = false;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private ngZone: NgZone,
    private flashService: FlashService
  ) {}

  flash() {
    return this.flashService.flash(this.container, this.renderer);
  }

  ngDoCheck() {
    console.log('🔄 FormFieldComponent change detection (Zone):', this.field);
    if (!this.isRefreshPhase) {
      this.flashService.flash(this.container, this.renderer);
    }
  }
}
