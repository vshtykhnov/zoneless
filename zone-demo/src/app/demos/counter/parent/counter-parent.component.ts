import { Component, DoCheck, NgZone } from '@angular/core';
import { CounterChildComponent } from '../child/counter-child.component';

@Component({
  selector: 'app-counter-parent',
  standalone: true,
  imports: [CounterChildComponent],
  template: `
    <div class="counter-block parent">
      <p>
        Parent counter (updates outside Angular zone every 1s): {{ counter }}
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
})
export class CounterParentComponent implements DoCheck {
  counter = 0;

  constructor(private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.counter++;
        // Note: no change detection triggered automatically.
        console.log('counter', this.counter);
      }, 1000);
    });
  }

  ngDoCheck() {
    console.log('CounterParentComponent change detection');
    // no visual flash in counter demo
  }
}
