import {
  Component,
  DoCheck,
  ElementRef,
  Renderer2,
  NgZone,
  ViewChild,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  template: `
    <div #container class="timer-block">
      <p>TimerComponent (Zoneless)</p>
      <div>Timer: {{ timerCount }}</div>
      <button
        (click)="toggleTimer()"
        [class.active]="isTimerActive"
        class="timer-btn"
      >
        {{ isTimerActive ? 'Stop Timer' : 'Start Timer' }}
      </button>
    </div>
  `,
  styles: `
    .timer-block { 
      border: 2px solid orange; 
      padding: 24px; 
      margin: 8px 0;
      background: #fff3e0;
      border-radius: 8px;
    }
    .flash-outline { box-shadow: 0 0 0 2px red; transition: box-shadow 0.2s ease; }
    .timer-btn {
      margin-top: 8px;
      padding: 6px 12px;
      border: 1px solid orange;
      background: white;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .timer-btn:hover {
      background: orange;
      color: white;
    }
    .timer-btn.active {
      background: #ff5722;
      color: white;
      border-color: #ff5722;
    }
  `,
})
export class TimerComponent implements DoCheck, OnDestroy {
  private flashTimeout: any;
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  timerCount = 0;
  isTimerActive = false;
  private timerInterval: any;

  constructor(
    private ngZone: NgZone,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {}

  toggleTimer() {
    if (this.isTimerActive) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  startTimer() {
    this.isTimerActive = true;
    this.timerInterval = setInterval(() => {
      this.timerCount++;
      console.log('TimerComponent timer tick (Zoneless):', this.timerCount);
      this.cdr.detectChanges();
    }, 1000);
  }

  stopTimer() {
    this.isTimerActive = false;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  ngDoCheck() {
    console.log('TimerComponent change detection (Zoneless)');
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

  ngOnDestroy() {
    this.stopTimer();
  }
}
