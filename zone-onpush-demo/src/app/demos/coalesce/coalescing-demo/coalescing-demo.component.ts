import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coalescing-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="coalesce-demo">
      <h3>Coalescing Microtasks Demo (Zone + OnPush)</h3>
      <p>Count: {{ counter }}</p>
      <button (click)="runSequence()">Run Microtask Sequence</button>

      <div class="explanation">
        <h4>Expected behavior in Zone + OnPush:</h4>
        <ul>
          <li>✅ Each Promise.then automatically triggers change detection</li>
          <li>✅ Counter updates 5 times: 1 → 2 → 3 → 4 → 5</li>
          <li>✅ No detectChanges() needed - Zone.js does it automatically</li>
        </ul>
      </div>
    </div>
  `,
  styles: `
    .coalesce-demo {
      border: 2px solid #9c27b0;
      padding: 20px;
      margin: 16px 0;
      background: #f3e5f5;
      border-radius: 8px;
    }
    
    .coalesce-demo h3 {
      margin-top: 0;
      color: #7b1fa2;
    }
    
    .coalesce-demo p {
      font-size: 1.2em;
      font-weight: bold;
      color: #7b1fa2;
    }
    
    .coalesce-demo button {
      background: #9c27b0;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      margin: 10px 0;
    }
    
    .coalesce-demo button:hover {
      background: #7b1fa2;
    }
    
    .explanation {
      background: white;
      padding: 15px;
      border-radius: 4px;
      margin-top: 15px;
      border-left: 4px solid #9c27b0;
    }
    
    .explanation h4 {
      margin-top: 0;
      color: #7b1fa2;
    }
    
    .explanation ul {
      margin: 10px 0;
      padding-left: 20px;
    }
    
    .explanation li {
      margin: 5px 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoalescingDemoComponent {
  counter = 0;

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  runSequence() {
    this.counter = 0;
    console.log('Starting microtask sequence in Zone + OnPush mode');

    for (let i = 1; i <= 5; i++) {
      Promise.resolve().then(() => {
        this.counter = i;
        console.log('microtask', i, 'counter =', this.counter);
      });
    }
  }

  get isZoneless(): boolean {
    return !NgZone.isInAngularZone();
  }
}
