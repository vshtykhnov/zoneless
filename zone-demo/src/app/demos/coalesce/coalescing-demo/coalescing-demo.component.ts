import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-coalescing-demo',
  standalone: true,
  template: `
    <div class="coalesce-block">
      <p>Counter updated via 5 sequential microtasks:</p>
      <button (click)="runSequence()">Run Microtask Sequence</button>
      <p>Value: {{ counter }}</p>
    </div>
  `,
  styles: [
    `
      .coalesce-block {
        border: 2px solid #9c27b0;
        padding: 16px;
        margin: 4px;
        background: #f3e5f5;
      }
      button {
        margin-bottom: 8px;
      }
    `,
  ],
})
export class CoalescingDemoComponent implements DoCheck {
  counter = 0;

  runSequence() {
    this.counter = 0;
    for (let i = 1; i <= 5; i++) {
      Promise.resolve().then(() => {
        this.counter = i;
        console.log('microtask', i);
      });
    }
  }

  ngDoCheck() {
    console.log('CoalescingDemoComponent change detection');
  }
}
