import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-mouse-test',
  standalone: true,
  template: `
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
        <p><strong>Template events trigger global change detection!</strong></p>
      </div>
    </div>
  `,
  styles: `
    .mouse-tests {
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MouseTestComponent implements OnInit {
  @ViewChild('mouseTestArea', { static: true })
  mouseTestArea!: ElementRef<HTMLElement>;

  mouseMoveCount = 0;
  templateMouseMoveCount = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.mouseTestArea.nativeElement.addEventListener('mousemove', () => {
      this.mouseMoveCount++;
      console.log(
        'Zone OnPush Demo - Mouse move detected, count:',
        this.mouseMoveCount
      );
      this.cdr.detectChanges();
    });
  }

  onTemplateMouseMove() {
    this.templateMouseMoveCount++;
    console.log(
      'Zone OnPush Demo - Template mouse move detected, count:',
      this.templateMouseMoveCount
    );
  }
}
