import { Component, ChangeDetectionStrategy, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeParentComponent } from '../parent/tree-parent.component';

@Component({
  selector: 'app-tree-demo',
  standalone: true,
  imports: [CommonModule, TreeParentComponent],
  template: `
    <div class="tree-demo">
      <div class="header-section">
        <h3>Tree Demo (Zone + OnPush)</h3>
        <button (click)="isRefreshPhase = !isRefreshPhase" class="phase-toggle">
          {{ isRefreshPhase ? 'Check Phase' : 'Refresh Phase' }}
        </button>
      </div>
      <div class="tree-container">
        <app-tree-parent [isRefreshPhase]="isRefreshPhase"></app-tree-parent>
      </div>
    </div>
  `,
  styles: `
    .tree-demo {
      border: 2px solid #2196f3;
      padding: 20px;
      margin: 16px 0;
      background: #e3f2fd;
      border-radius: 8px;
    }
    
    .header-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
    
    .tree-demo h3 {
      margin: 0;
      color: #1976d2;
    }
    
    .phase-toggle {
      background: #2196f3;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      font-weight: bold;
    }
    
    .phase-toggle:hover {
      background: #1976d2;
    }
    
    .tree-container {
      margin-top: 15px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeDemoComponent implements DoCheck {
  isRefreshPhase = false;

  ngDoCheck() {
    console.log('🔄 TreeDemoComponent change detection (Zone + OnPush)');
  }
}
