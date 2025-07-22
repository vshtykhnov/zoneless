import {
  Component,
  DoCheck,
  ElementRef,
  Renderer2,
  ChangeDetectionStrategy,
  ViewChild,
  Input,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from '../form-field/form-field.component';
import { FlashService } from '../../../services/flash.service';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldComponent],
  template: `
    <form #container [formGroup]="form" class="checkout-form">
      <app-form-field
        *ngFor="let field of fields"
        [field]="field"
        [isRefreshPhase]="isRefreshPhase"
      ></app-form-field>
    </form>
    <div style="display: none;">{{ isRefreshPhase ? flash() : '' }}</div>
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
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;
  @Input() isRefreshPhase = false;

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

  constructor(
    private fb: FormBuilder,
    private el: ElementRef,
    private renderer: Renderer2,
    private flashService: FlashService
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

  flash() {
    return this.flashService.flash(this.container, this.renderer);
  }

  ngDoCheck() {
    console.log('🔄 CheckoutFormComponent change detection (Zoneless)');
    if (!this.isRefreshPhase) {
      this.flashService.flash(this.container, this.renderer);
    }
  }
}
