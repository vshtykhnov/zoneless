import {
  Component,
  DoCheck,
  ElementRef,
  Renderer2,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from '../form-field/form-field.component';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldComponent],
  template: `
    <form #container="" [formGroup]="form" class="checkout-form">
      <app-form-field
        *ngFor="let field of fields"
        [field]="field"
      ></app-form-field>
    </form>
  `,
  styles: [
    `
      .checkout-form {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        max-width: 600px;
      }
      .checkout-form div {
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

      .flash-outline {
        box-shadow: 0 0 0 2px red;
        transition: box-shadow 0.2s ease;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutFormComponent implements DoCheck {
  fields = [
    'name',
    'email',
    'address',
    'city',
    'zip',
    'phone',
    'cardNumber',
    'expiry',
    'cvv',
    'notes',
  ];

  form: any;
  private flashTimeout: any;
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  constructor(
    private fb: FormBuilder,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      city: [''],
      zip: [''],
      phone: [''],
      cardNumber: [''],
      expiry: [''],
      cvv: [''],
      notes: [''],
    });
  }

  ngDoCheck() {
    console.log('CheckoutFormComponent change detection (Zoneless)');

    // add outline class to form element
    const el = this.container.nativeElement;
    this.renderer.addClass(el, 'flash-outline');

    clearTimeout(this.flashTimeout);
    this.flashTimeout = setTimeout(() => {
      this.renderer.removeClass(el, 'flash-outline');
    }, 200);
  }
}
