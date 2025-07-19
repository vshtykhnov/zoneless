import {
  Component,
  DoCheck,
  ElementRef,
  Renderer2,
  NgZone,
  ViewChild,
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
        <p>Parent works! (Zone)</p>
        <app-child></app-child>
      </div>

      <div class="mouse-tests">
        <div #mouseTestArea class="mouse-test-zone">
          <h3>Mouse Move Test (Zone Mode)</h3>
          <p>Move your mouse over this area</p>
          <p>Movement counter: {{ mouseMoveCount }}</p>
          <p><strong>In Zone mode, updates automatically!</strong></p>
        </div>

        <div
          class="mouse-test-zone-template"
          (mousemove)="onTemplateMouseMove()"
        >
          <h3>Template Mouse Move Test (Zone Mode)</h3>
          <p>Move your mouse over this area</p>
          <p>Movement counter: {{ templateMouseMoveCount }}</p>
          <p><strong>Template events also update automatically!</strong></p>
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
    
    .mouse-test-zone,
    .mouse-test-zone-template {
      border: 2px solid #4caf50;
      padding: 16px;
      margin: 0;
      background: #e8f5e9;
      border-radius: 8px;
    }

    .mouse-test-zone h3,
    .mouse-test-zone-template h3 {
      margin-top: 0;
      color: #2e7d32;
    }

    .mouse-test-zone p,
    .mouse-test-zone-template p {
      margin: 8px 0;
    }
    
    .flash-outline { box-shadow: 0 0 0 2px red; transition: box-shadow 0.2s ease; }
  `,
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
        'Zone Demo - Mouse move detected, count:',
        this.mouseMoveCount
      );
    });
  }

  onTemplateMouseMove() {
    this.templateMouseMoveCount++;
    console.log(
      'Zone Demo - Template mouse move detected, count:',
      this.templateMouseMoveCount
    );
  }

  ngDoCheck() {
    console.log('ParentComponent change detection (Zone)');
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
