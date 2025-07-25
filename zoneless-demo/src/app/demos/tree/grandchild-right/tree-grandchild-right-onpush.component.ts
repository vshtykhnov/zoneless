import {
  Component,
  ChangeDetectionStrategy,
  DoCheck,
  ElementRef,
  Renderer2,
  NgZone,
  ViewChild,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashService } from '../../../services/flash.service';

@Component({
  selector: 'app-tree-grandchild-right-onpush',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #container class="tree-grandchild">
      <div class="tree-node">
        <div class="node-box">
          <h4>Grandchild Right (OnPush){{ isRefreshPhase ? flash() : '' }}</h4>
        </div>
      </div>
    </div>
  `,
  styles: `
    .tree-grandchild {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
    }
    
    .tree-node {
      margin-bottom: 10px;
    }
    
    .node-box {
      border: 1px solid #9c27b0;
      background: #f3e5f5;
      padding: 8px 15px;
      border-radius: 4px;
      text-align: center;
      box-shadow: 0 1px 4px rgba(0,0,0,0.1);
    }
    
    .node-box h4 {
      margin: 0;
      color: #7b1fa2;
      font-size: 12px;
      font-weight: bold;
    }
    
    .flash-outline { 
      box-shadow: 0 0 0 3px red; 
      transition: box-shadow 0.2s ease; 
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeGrandchildRightOnPushComponent implements DoCheck {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;
  @Input() isRefreshPhase = false;

  constructor(
    private renderer: Renderer2,
    private flashService: FlashService
  ) {}

  flash() {
    return this.flashService.flash(this.container, this.renderer);
  }

  ngDoCheck() {
    console.log(
      '🔄 TreeGrandchildRightOnPushComponent change detection (OnPush)'
    );
    if (!this.isRefreshPhase) {
      this.flashService.flash(this.container, this.renderer);
    }
  }
}
