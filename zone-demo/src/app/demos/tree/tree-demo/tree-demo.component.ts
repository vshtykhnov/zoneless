import { Component, ChangeDetectionStrategy, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeParentComponent } from '../parent/tree-parent.component';

@Component({
  selector: 'app-tree-demo',
  standalone: true,
  imports: [CommonModule, TreeParentComponent],
  template: `
    <div class="tree-demo">
      <h3>Tree Demo (Zone + Default)</h3>
      <div class="tree-container">
        <app-tree-parent></app-tree-parent>
      </div>
    </div>
  `,
  styles: `
    .tree-demo {
      border: 2px solid #4caf50;
      padding: 20px;
      margin: 16px 0;
      background: #e8f5e8;
      border-radius: 8px;
    }
    
    .tree-demo h3 {
      margin-top: 0;
      color: #2e7d32;
    }
    
    .tree-container {
      margin-top: 15px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TreeDemoComponent implements DoCheck {
  ngDoCheck() {
    console.log('🔄 TreeDemoComponent change detection (Zone + Default)');
  }
}
