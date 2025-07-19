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
      <h3>Coalescing Microtasks Demo (Zoneless + OnPush)</h3>
      <p>Count: {{ counter }}</p>
      <button (click)="runSequence()">Run Microtask Sequence</button>

      <div class="explanation">
        <h4>Expected behavior in Zoneless + OnPush:</h4>
        <ul>
          <li>
            ❌ Promise.then does NOT trigger change detection automatically
          </li>
          <li>❌ Counter does NOT update without detectChanges()</li>
          <li>
            ✅ detectChanges() is NEEDED - Zoneless doesn't track microtasks
          </li>
          <li>✅ OnPush strategy requires explicit update indication</li>
        </ul>
      </div>
    </div>
  `,
  styles: `
    .coalesce-demo {
      border: 2px solid #ff5722;
      padding: 20px;
      margin: 16px 0;
      background: #ffebee;
      border-radius: 8px;
    }
    
    .coalesce-demo h3 {
      margin-top: 0;
      color: #d32f2f;
    }
    
    .coalesce-demo p {
      font-size: 1.2em;
      font-weight: bold;
      color: #d32f2f;
    }
    
    .coalesce-demo button {
      background: #ff5722;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      margin: 10px 0;
    }
    
    .coalesce-demo button:hover {
      background: #d32f2f;
    }
    
    .explanation {
      background: white;
      padding: 15px;
      border-radius: 4px;
      margin-top: 15px;
      border-left: 4px solid #ff5722;
    }
    
    .explanation h4 {
      margin-top: 0;
      color: #d32f2f;
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
    console.log('Starting microtask sequence in Zoneless + OnPush mode');

    for (let i = 1; i <= 5; i++) {
      Promise.resolve().then(() => {
        this.counter = i;
        console.log('microtask', i, 'counter =', this.counter);
        this.cdr.detectChanges();
      });
    }
  }

  get isZoneless(): boolean {
    return !NgZone.isInAngularZone();
  }
}
