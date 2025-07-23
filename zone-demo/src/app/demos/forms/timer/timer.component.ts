import {
  Component,
  DoCheck,
  ElementRef,
  Renderer2,
  NgZone,
  ViewChild,
  OnDestroy,
  Input,
} from '@angular/core';
import { FlashService } from '../../../services/flash.service';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  standalone: true,
  template: `
    <div #container class="timer-block">
      <p>TimerComponent (Default){{ isRefreshPhase ? flash() : '' }}</p>
      <div>Timer: {{ timerCount }}</div>
      <button
        (click)="toggleTimer()"
        [class.active]="isTimerActive"
        class="timer-btn"
      >
        {{ isTimerActive ? 'Stop Timer' : 'Start Timer' }}
      </button>
      <button (click)="throwException()" class="exception-btn">
        Throw Exception
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
    .exception-btn {
      margin-top: 8px;
      margin-left: 8px;
      padding: 6px 12px;
      border: 1px solid #f44336;
      background: white;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;
      color: #f44336;
    }
    .exception-btn:hover {
      background: #f44336;
      color: white;
    }
  `,
})
export class TimerComponent implements DoCheck, OnDestroy {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;
  @Input() isRefreshPhase = false;

  timerCount = 0;
  isTimerActive = false;
  private timerInterval: any;

  constructor(
    private ngZone: NgZone,
    private renderer: Renderer2,
    private flashService: FlashService
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
      console.log(
        'TimerComponent timer tick (Zone + Default):',
        this.timerCount
      );
    }, 1000);
  }

  stopTimer() {
    this.isTimerActive = false;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  flash() {
    return this.flashService.flash(this.container, this.renderer);
  }

  throwException() {
    setTimeout(() => {
      throw new Error(
        'TimerComponent: Exception thrown from setTimeout (Zone + Default)'
      );
    }, 0);
  }

  ngDoCheck() {
    console.log('🔄 TimerComponent change detection (Zone)');
    if (!this.isRefreshPhase) {
      this.flashService.flash(this.container, this.renderer);
    }
  }

  ngOnDestroy() {
    this.stopTimer();
  }
}
