import {
  Component,
  ChangeDetectionStrategy,
  DoCheck,
  ElementRef,
  Renderer2,
  NgZone,
  ViewChild,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';
import { TreeGrandchildRightOnPushComponent } from '../grandchild-right/tree-grandchild-right-onpush.component';
import { FlashService } from '../../../services/flash.service';

@Component({
  selector: 'app-tree-child-right-onpush',
  standalone: true,
  imports: [CommonModule, TreeGrandchildRightOnPushComponent],
  template: `
    <div #container class="tree-child-right">
      <div class="node-box">
        <h4>Child Right (OnPush){{ isRefreshPhase ? flash() : '' }}</h4>
        <div class="button-container">
          <button (click)="sendRequest()" class="trigger-btn">
            Send Request
          </button>
        </div>
      </div>

      <div class="tree-branches">
        <div class="branch-left">
          <div class="connection-line"></div>
          <app-tree-grandchild-right-onpush
            [isRefreshPhase]="isRefreshPhase"
          ></app-tree-grandchild-right-onpush>
        </div>

        <div class="branch-right">
          <div class="connection-line"></div>
          <app-tree-grandchild-right-onpush
            [isRefreshPhase]="isRefreshPhase"
          ></app-tree-grandchild-right-onpush>
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
      border: 3px solid #9c27b0;
      background: #f3e5f5;
      padding: 15px 20px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-bottom: 20px;
    }
    
    .node-box h4 {
      margin: 0 0 10px 0;
      color: #7b1fa2;
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
      background: #9c27b0;
      margin-bottom: 8px;
    }
    
    .flash-outline { 
      box-shadow: 0 0 0 3px red; 
      transition: box-shadow 0.2s ease; 
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeChildRightOnPushComponent implements DoCheck {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;
  @Input() isRefreshPhase = false;
  requestData: any = null;

  constructor(
    private ngZone: NgZone,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private flashService: FlashService
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

  flash() {
    return this.flashService.flash(this.container, this.renderer);
  }

  ngDoCheck() {
    console.log('🔄 TreeChildRightOnPushComponent change detection (OnPush)');
    if (!this.isRefreshPhase) {
      this.flashService.flash(this.container, this.renderer);
    }
  }
}
