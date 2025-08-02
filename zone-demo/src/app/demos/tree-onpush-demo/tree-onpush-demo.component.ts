import {
  Component,
  ChangeDetectionStrategy,
  DoCheck,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeParentOnPushComponent } from './parent/tree-parent-onpush.component';

@Component({
  selector: 'app-tree-onpush-demo-new',
  standalone: true,
  imports: [CommonModule, TreeParentOnPushComponent],
  template: `
    <div class="tree-demo">
      <div class="header-section">
        <h3>Async Pipe & Signals Demo (Zone + Default) - OnPush</h3>
      </div>
      <div class="tree-container">
        <app-tree-parent-onpush></app-tree-parent-onpush>
      </div>
    </div>
  `,
  styles: `
    .tree-demo {
      border: 2px solid #ff9800;
      padding: 20px;
      margin: 16px 0;
      background: #fff3e0;
      border-radius: 8px;
    }
    
    .header-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 15px;
    }
    
    .tree-demo h3 {
      margin: 0;
      color: #f57c00;
      font-size: 18px;
    }
    
    .tree-container {
      margin-top: 15px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeOnPushDemoComponent implements DoCheck {
  ngDoCheck() {
    console.log('🔄 TreeOnPushDemoComponent change detection (Zone + Default)');
  }
}
