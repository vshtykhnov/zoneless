import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mouse-test',
  standalone: true,
  template: `
    <div class="mouse-tests">
      <div #mouseTestArea class="mouse-test-zone">
        <h3>Mouse Move Test (Zone Mode)</h3>
        <p>Move your mouse over this area</p>
        <p>Movement counter: {{ mouseMoveCount }}</p>
        <p><strong>In Zone mode, updates automatically!</strong></p>
      </div>

      <div class="mouse-test-zone-template" (mousemove)="onTemplateMouseMove()">
        <h3>Template Mouse Move Test (Zone Mode)</h3>
        <p>Move your mouse over this area</p>
        <p>Movement counter: {{ templateMouseMoveCount }}</p>
        <p><strong>Template events also update automatically!</strong></p>
      </div>
    </div>
  `,
  styles: `
    .mouse-tests {
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
  `,
})
export class MouseTestComponent implements OnInit {
  @ViewChild('mouseTestArea', { static: true })
  mouseTestArea!: ElementRef<HTMLElement>;

  mouseMoveCount = 0;
  templateMouseMoveCount = 0;

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
}
