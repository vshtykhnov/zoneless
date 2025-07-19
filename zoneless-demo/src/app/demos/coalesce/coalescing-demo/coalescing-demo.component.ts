import {
  Component,
  DoCheck,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-coalescing-demo',
  standalone: true,
  template: `
    <div class="coalesce-block">
      <p>Counter updated via 5 sequential microtasks (Zoneless with OnPush):</p>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoalescingDemoComponent implements DoCheck {
  counter = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  runSequence() {
    this.counter = 0;
    // Ручной запуск детекции изменений для начального значения
    this.cdr.detectChanges();

    for (let i = 1; i <= 5; i++) {
      Promise.resolve().then(() => {
        this.counter = i;
        console.log('microtask', i);
        // Ручной запуск детекции изменений для каждого microtask в zoneless режиме
        this.cdr.detectChanges();
      });
    }
  }

  ngDoCheck() {
    console.log('CoalescingDemoComponent change detection (Zoneless)');
  }
}
