import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-coalescing-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="coalesce-demo">
      <h3>Coalescing Demo (Zone + OnPush)</h3>
      <p>Data: {{ data | json }}</p>
      <div class="button-group">
        <button (click)="runMicrotask()">Run Microtask</button>
        <button (click)="runMacrotask()">Run Macrotask</button>
      </div>
      <div class="counter">
        <span class="counter-label">Change Detection Cycles:</span>
        <div class="counter-box">{{ changeDetectionCount }}</div>
      </div>
    </div>
  `,
  styles: `
    .coalesce-demo {
      border: 2px solid #2196f3;
      padding: 20px;
      margin: 16px 0;
      background: #e3f2fd;
      border-radius: 8px;
    }
    
    .coalesce-demo h3 {
      margin-top: 0;
      color: #1976d2;
    }
    
    .coalesce-demo p {
      font-size: 1.2em;
      font-weight: bold;
      color: #1976d2;
      background: #f5f5f5;
      padding: 10px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 12px;
    }
    
    .button-group {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin: 10px 0;
    }
    
    .coalesce-demo button {
      background: #2196f3;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
    
    .coalesce-demo button:hover {
      background: #1976d2;
    }
    
    .counter {
      margin-top: 15px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
    }
    
    .counter-label {
      font-size: 16px;
      color: #1976d2;
    }
    
    .counter-box {
      width: 60px;
      height: 40px;
      border: 2px solid #1976d2;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
      color: #f44336;
      background: white;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoalescingDemoComponent {
  data: any = null;
  changeDetectionCount = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private http: HttpClient
  ) {}

  runMicrotask() {
    console.log('🚀 Starting microtask (Promise.then)');

    Promise.resolve().then(() => {
      this.data = {
        type: 'microtask',
        value: 'Promise.then executed',
        timestamp: new Date(),
      };
      console.log('✅ Microtask completed - data updated');
    });
  }

  runMacrotask() {
    console.log('🚀 Starting macrotask (HTTP request)');

    this.http
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe((res) => {
        this.data = { type: 'macrotask', value: res, timestamp: new Date() };
        console.log(
          '✅ Macrotask completed - data received (UI NOT updating!):',
          res
        );
      });
  }

  ngDoCheck() {
    this.changeDetectionCount++;
    this.cdr.detectChanges();
    console.log('🔄 CoalescingDemoComponent change detection (Zone + OnPush)');
  }
}
