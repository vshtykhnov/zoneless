import {
  Component,
  DoCheck,
  Input,
  ElementRef,
  Renderer2,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  ControlContainer,
  FormGroupDirective,
} from '@angular/forms';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="field-wrapper">
      <label [for]="field">{{ field | titlecase }}</label>
      <input [id]="field" [formControlName]="field" />
    </div>
  `,
  styles: [
    `
      .field-wrapper {
        display: flex;
        flex-direction: column;
      }
      label {
        font-size: 0.8rem;
        color: #555;
      }
      input {
        padding: 4px 8px;
        font-size: 0.9rem;
      }
      :host(.flash-outline) {
        box-shadow: 0 0 0 2px red;
        transition: box-shadow 0.2s ease;
      }
    `,
  ],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent implements DoCheck {
  @Input() field!: string;

  private flashTimeout: any;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngDoCheck() {
    // Highlight host element
    const host = this.el.nativeElement;
    this.renderer.addClass(host, 'flash-outline');

    clearTimeout(this.flashTimeout);
    this.flashTimeout = setTimeout(
      () => this.renderer.removeClass(host, 'flash-outline'),
      200
    );
  }
}
