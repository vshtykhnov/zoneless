import {
  Component,
  DoCheck,
  ElementRef,
  Renderer2,
  NgZone,
  ViewChild,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  template: `
    <div class="forms-container">
      <div #container class="block">
        <p>Parent works! (Zone + OnPush)</p>
        <app-child></app-child>
      </div>

      <div class="mouse-tests">
        <div #mouseTestArea class="mouse-test-zone-onpush">
          <h3>Mouse Move Test (Zone + OnPush)</h3>
          <p>Move your mouse over this area</p>
          <p>Movement counter: {{ mouseMoveCount }}</p>
          <p>
            <strong>In Zone + OnPush mode, detectChanges() is needed!</strong>
          </p>
        </div>

        <div
          class="mouse-test-zone-onpush-template"
          (mousemove)="onTemplateMouseMove()"
        >
          <h3>Template Mouse Move Test (Zone + OnPush)</h3>
          <p>Move your mouse over this area</p>
          <p>Movement counter: {{ templateMouseMoveCount }}</p>
          <p>
            <strong>Template events trigger global change detection!</strong>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: `
    .forms-container {
      display: flex;
      gap: 20px;
      align-items: flex-start;
    }
    
    .block { 
      border: 2px solid green; 
      padding: 24px; 
      margin: 8px; 
      flex: 1;
    }
    
    .mouse-tests {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .mouse-test-zone-onpush,
    .mouse-test-zone-onpush-template {
      border: 2px solid #9c27b0;
      padding: 16px;
      margin: 0;
      background: #f3e5f5;
      border-radius: 8px;
    }

    .mouse-test-zone-onpush h3,
    .mouse-test-zone-onpush-template h3 {
      margin-top: 0;
      color: #7b1fa2;
    }

    .mouse-test-zone-onpush p,
    .mouse-test-zone-onpush-template p {
      margin: 8px 0;
    }
    
    .flash-outline { box-shadow: 0 0 0 2px red; transition: box-shadow 0.2s ease; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParentComponent implements DoCheck, OnInit {
  private flashTimeout: any;
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;
  @ViewChild('mouseTestArea', { static: true })
  mouseTestArea!: ElementRef<HTMLElement>;

  mouseMoveCount = 0;
  templateMouseMoveCount = 0;

  constructor(private ngZone: NgZone, private renderer: Renderer2) {}

  ngOnInit() {
    this.mouseTestArea.nativeElement.addEventListener('mousemove', () => {
      this.mouseMoveCount++;
      console.log(
        'Zone OnPush Demo - Mouse move detected, count:',
        this.mouseMoveCount
      );
    });
  }

  onTemplateMouseMove() {
    this.templateMouseMoveCount++;
    console.log(
      'Zone OnPush Demo - Template mouse move detected, count:',
      this.templateMouseMoveCount
    );
  }

  ngDoCheck() {
    console.log('ParentComponent change detection (Zone + OnPush)');
    const el = this.container.nativeElement;
    this.renderer.addClass(el, 'flash-outline');
    this.ngZone.runOutsideAngular(() => {
      clearTimeout(this.flashTimeout);
      this.flashTimeout = setTimeout(
        () => this.renderer.removeClass(el, 'flash-outline'),
        200
      );
    });
  }
}
