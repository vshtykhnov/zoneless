import {
  Component,
  DoCheck,
  ElementRef,
  Renderer2,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-grandchild',
  standalone: true,
  template: `
    <div #container class="block">
      <p>Grandchild works! (Zoneless with OnPush)</p>
      <div>Timer: {{ timerCount }}</div>
      <button
        (click)="toggleTimer()"
        [class.active]="isTimerActive"
        class="timer-btn"
      >
        {{ isTimerActive ? 'Остановить таймер' : 'Запустить таймер' }}
      </button>
    </div>
  `,
  styles: `
    .block { border: 2px solid orange; padding: 24px; margin: 8px; }
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrandchildComponent implements DoCheck, OnDestroy {
  private flashTimeout: any;
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  timerCount = 0;
  isTimerActive = false;
  private timerInterval: any;

  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

  toggleTimer() {
    if (this.isTimerActive) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
    // Ручной запуск детекции изменений при изменении состояния
    this.cdr.detectChanges();
  }

  startTimer() {
    this.isTimerActive = true;
    this.timerInterval = setInterval(() => {
      this.timerCount++;
      console.log('Grandchild timer tick:', this.timerCount);
      // Ручной запуск детекции изменений для таймера в zoneless режиме
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
    console.log('GrandchildComponent change detection (Zoneless)');
    const el = this.container.nativeElement;
    this.renderer.addClass(el, 'flash-outline');

    clearTimeout(this.flashTimeout);
    this.flashTimeout = setTimeout(
      () => this.renderer.removeClass(el, 'flash-outline'),
      200
    );
  }

  ngOnDestroy() {
    this.stopTimer();
  }
}
