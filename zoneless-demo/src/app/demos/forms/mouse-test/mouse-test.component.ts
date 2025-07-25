import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  DoCheck,
  Renderer2,
} from '@angular/core';
import { FlashService } from '../../../services/flash.service';

@Component({
  selector: 'app-mouse-test',
  standalone: true,
  template: `
    <div #container class="mouse-tests">
      <div #mouseTestArea class="mouse-test-zoneless">
        <h3>Mouse Move Test (Zoneless Mode)</h3>
        <p>Move your mouse over this area</p>
        <p>Movement counter: {{ mouseMoveCount }}</p>
      </div>

      <div
        class="mouse-test-zoneless-template"
        (mousemove)="onTemplateMouseMove()"
      >
        <h3>Template Mouse Move Test (Zoneless Mode)</h3>
        <p>Move your mouse over this area</p>
        <p>Movement counter: {{ templateMouseMoveCount }}</p>
        <p><strong>Template events trigger global change detection!</strong></p>
      </div>
    </div>
    {{ isRefreshPhase ? flash() : '' }}
  `,
  styles: `
    .mouse-tests {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .mouse-test-zoneless,
    .mouse-test-zoneless-template {
      border: 2px solid #ff5722;
      padding: 16px;
      margin: 0;
      background: #ffebee;
      border-radius: 8px;
    }

    .mouse-test-zoneless h3,
    .mouse-test-zoneless-template h3 {
      margin-top: 0;
      color: #d32f2f;
    }

    .mouse-test-zoneless p,
    .mouse-test-zoneless-template p {
      margin: 8px 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MouseTestComponent implements OnInit, DoCheck {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;
  @ViewChild('mouseTestArea', { static: true })
  mouseTestArea!: ElementRef<HTMLElement>;
  @Input() isRefreshPhase = false;

  mouseMoveCount = 0;
  templateMouseMoveCount = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private flashService: FlashService
  ) {}

  ngOnInit() {
    this.mouseTestArea.nativeElement.addEventListener('mousemove', () => {
      this.mouseMoveCount++;
      console.log(
        'Zoneless Demo - Mouse move detected, count:',
        this.mouseMoveCount
      );
      this.cdr.detectChanges();
    });
  }

  flash() {
    return this.flashService.flash(this.container, this.renderer);
  }

  ngDoCheck() {
    console.log('🔄 MouseTestComponent change detection (Zoneless)');
    if (!this.isRefreshPhase) {
      this.flashService.flash(this.container, this.renderer);
    }
  }

  onTemplateMouseMove() {
    this.templateMouseMoveCount++;
    console.log(
      'Zoneless Demo - Template mouse move detected, count:',
      this.templateMouseMoveCount
    );
  }
}
