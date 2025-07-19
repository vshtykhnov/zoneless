import {
  Component,
  DoCheck,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { ParentComponent } from './demos/forms/parent/parent.component';
import { CounterParentComponent } from './demos/counter/parent/counter-parent.component';
import { CoalescingDemoComponent } from './demos/coalesce/coalescing-demo/coalescing-demo.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ParentComponent,
    CounterParentComponent,
    CoalescingDemoComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements DoCheck, OnInit {
  title = 'zone-demo';

  view: 'forms' | 'counter' | 'coalesce' = 'forms';
  mouseMoveCount = 0;
  templateMouseMoveCount = 0;

  @ViewChild('mouseTestArea', { static: true })
  mouseTestArea!: ElementRef<HTMLElement>;

  ngOnInit() {
    // Добавляем mousemove listener для демонстрации автоматической детекции в zone режиме
    this.mouseTestArea.nativeElement.addEventListener('mousemove', () => {
      this.mouseMoveCount++;
      console.log(
        'Zone Demo - Mouse move detected, count:',
        this.mouseMoveCount
      );
      // В zone режиме НЕ нужно вызывать detectChanges() - всё обновляется автоматически
    });
  }

  onTemplateMouseMove() {
    this.templateMouseMoveCount++;
    console.log(
      'Zone Demo - Template mouse move detected, count:',
      this.templateMouseMoveCount
    );
    // В zone режиме template events тоже обновляются автоматически
  }

  select(view: 'forms' | 'counter' | 'coalesce') {
    this.view = view;
  }

  ngDoCheck() {
    console.log('AppComponent change detection (Zone)');
  }
}
