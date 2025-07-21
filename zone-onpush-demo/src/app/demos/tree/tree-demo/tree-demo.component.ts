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
        <div class="phase-buttons">
          <button
            (click)="isRefreshPhase = false"
            class="phase-btn check-phase"
            [class.active]="!isRefreshPhase"
          >
            Check Phase
          </button>
          <button
            (click)="isRefreshPhase = true"
            class="phase-btn refresh-phase"
            [class.active]="isRefreshPhase"
          >
            Refresh Phase
          </button>
        </div>
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
    
    .phase-buttons {
      display: flex;
      gap: 8px;
    }
    
    .phase-btn {
      border: 2px solid;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12px;
      font-weight: bold;
      transition: all 0.3s ease;
      min-width: 100px;
    }
    
    .check-phase {
      background: #e8f5e8;
      border-color: #4caf50;
      color: #2e7d32;
    }
    
    .check-phase:hover {
      background: #c8e6c9;
    }
    
    .check-phase.active {
      background: #4caf50;
      color: white;
      box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
    }
    
    .refresh-phase {
      background: #fff3e0;
      border-color: #ff9800;
      color: #f57c00;
    }
    
    .refresh-phase:hover {
      background: #ffe0b2;
    }
    
    .refresh-phase.active {
      background: #ff9800;
      color: white;
      box-shadow: 0 2px 8px rgba(255, 152, 0, 0.3);
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
