import {
  Component,
  ChangeDetectionStrategy,
  DoCheck,
  ElementRef,
  Renderer2,
  NgZone,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';
import { TreeGrandchildRightComponent } from '../grandchild-right/tree-grandchild-right.component';

@Component({
  selector: 'app-tree-child-right',
  standalone: true,
  imports: [CommonModule, TreeGrandchildRightComponent],
  template: `
    <div #container class="tree-child-right">
      <div class="node-box">
        <h4>Child Right (Default)</h4>
        <div class="button-container">
          <button (click)="sendRequest()" class="trigger-btn">
            Send Request
          </button>
        </div>
      </div>

      <div class="tree-branches">
        <div class="branch-left">
          <div class="connection-line"></div>
          <app-tree-grandchild-right></app-tree-grandchild-right>
        </div>

        <div class="branch-right">
          <div class="connection-line"></div>
          <app-tree-grandchild-right
            [requestData]="requestData"
            [label]="'Deep nested Input'"
          ></app-tree-grandchild-right>
        </div>
      </div>
    </div>
  `,
  styles: `
    .tree-child-right {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 15px;
    }
    
    .node-box {
      border: 3px solid #ff9800;
      background: #fff3e0;
      padding: 15px 20px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-bottom: 20px;
    }
    
    .node-box h4 {
      margin: 0 0 10px 0;
      color: #f57c00;
      font-size: 14px;
      font-weight: bold;
    }
    
    .button-container {
      margin-top: 10px;
    }
    
    .trigger-btn {
      background: #ff5722;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 11px;
      font-weight: bold;
    }
    
    .trigger-btn:hover {
      background: #e64a19;
    }
    
    .tree-branches {
      display: flex;
      justify-content: space-between;
      width: 100%;
      max-width: 300px;
      gap: 20px;
    }
    
    .branch-left, .branch-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .connection-line {
      width: 2px;
      height: 20px;
      background: #ff9800;
      margin-bottom: 8px;
    }
    
    .flash-outline { 
      box-shadow: 0 0 0 3px red; 
      transition: box-shadow 0.2s ease; 
    }
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TreeChildRightComponent implements DoCheck {
  private flashTimeout: any;
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;
  requestData: any = null;

  constructor(
    private ngZone: NgZone,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  sendRequest() {
    console.log('🚀 Right branch button clicked - sending HTTP request');

    this.http
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .pipe(delay(5000))
      .subscribe((res) => {
        this.requestData = res;
        console.log('✅ HTTP request completed, calling detectChanges()');
        this.cdr.detectChanges();
      });
  }

  ngDoCheck() {
    console.log('🔄 TreeChildRightComponent change detection (Default)');
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
