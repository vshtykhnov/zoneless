import {
  Component,
  DoCheck,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CounterGrandchildComponent } from '../grandchild/counter-grandchild.component';

@Component({
  selector: 'app-counter-child',
  standalone: true,
  imports: [CounterGrandchildComponent],
  template: `
    <div class="counter-block child">
      Child counter (Zoneless with OnPush): {{ counter }}
      <app-counter-grandchild [counter]="counter"></app-counter-grandchild>
    </div>
  `,
  styles: [
    `
      .counter-block {
        border: 2px solid #03a9f4;
        padding: 8px;
        margin: 4px;
      }
      .child {
        background: #e1f5fe;
      }
      .block {
        padding: 24px;
        margin: 8px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterChildComponent implements DoCheck {
  @Input() counter = 0;

  constructor() {}

  ngDoCheck() {
    console.log('CounterChildComponent change detection (Zoneless)');
    // no flash
  }
}
