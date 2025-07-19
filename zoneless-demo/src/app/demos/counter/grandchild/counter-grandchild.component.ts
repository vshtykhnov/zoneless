import {
  Component,
  DoCheck,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-counter-grandchild',
  standalone: true,
  template: `
    <div class="counter-block grandchild">
      Grandchild counter (Zoneless with OnPush): {{ counter }}
    </div>
  `,
  styles: [
    `
      .counter-block {
        border: 2px solid #ff9800;
        padding: 8px;
        margin: 4px;
      }
      .grandchild {
        background: #fff7e6;
      }
      :host(.flash-outline) {
        outline: 2px solid red;
        outline-offset: 2px;
        transition: outline-color 0.2s ease;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterGrandchildComponent implements DoCheck {
  @Input() counter = 0;

  constructor() {}

  ngDoCheck() {
    console.log('CounterGrandchildComponent change detection (Zoneless)');
    // no flash
  }
}
