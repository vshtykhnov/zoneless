import { Component, DoCheck } from '@angular/core';
import { ParentComponent } from './demos/forms/parent/parent.component';
import { CoalescingDemoComponent } from './demos/coalesce/coalescing-demo/coalescing-demo.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ParentComponent, CoalescingDemoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements DoCheck {
  title = 'zone-onpush-demo';

  view: 'forms' | 'coalesce' = 'forms';

  select(view: 'forms' | 'coalesce') {
    this.view = view;
  }

  ngDoCheck() {
    console.log('AppComponent change detection (Zone + OnPush)');
  }
}
