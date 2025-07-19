import {
  Component,
  DoCheck,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { CounterChildComponent } from '../child/counter-child.component';

@Component({
  selector: 'app-counter-parent',
  standalone: true,
  imports: [CounterChildComponent],
  template: `
    <div class="counter-block parent">
      <p>
        Parent counter (Zoneless with OnPush, updates every 1s): {{ counter }}
      </p>
      <app-counter-child [counter]="counter"></app-counter-child>
    </div>
  `,
  styles: [
    `
      .counter-block {
        border: 2px solid #4caf50;
        padding: 8px;
        margin: 4px;
      }
      .parent {
        background: #e8f5e9;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterParentComponent implements DoCheck, OnDestroy {
  counter = 0;
  private intervalId: any;

  constructor(private cdr: ChangeDetectorRef) {
    // В zoneless режиме setInterval НЕ запускает автоматическую детекцию изменений
    this.intervalId = setInterval(() => {
      this.counter++;
      console.log('counter', this.counter);
      // Ручной запуск детекции изменений в zoneless режиме
      this.cdr.detectChanges();
    }, 1000);
  }

  ngDoCheck() {
    console.log('CounterParentComponent change detection (Zoneless)');
    // no visual flash in counter demo
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
