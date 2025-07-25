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
  selector: 'app-tree-grandchild-left',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #container class="tree-grandchild-left">
      <div class="node-box">
        <h4>Grandchild Left (OnPush){{ isRefreshPhase ? flash() : '' }}</h4>
        <p>Deep nested</p>
      </div>
    </div>
  `,
  styles: `
    .tree-grandchild-left {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .node-box {
      border: 2px solid #90caf9;
      background: #f3e5f5;
      padding: 10px 15px;
      border-radius: 6px;
      text-align: center;
      box-shadow: 0 1px 4px rgba(0,0,0,0.1);
    }
    
    .node-box h4 {
      margin: 0 0 5px 0;
      color: #7b1fa2;
      font-size: 12px;
      font-weight: bold;
    }
    
    .node-box p {
      margin: 0;
      font-size: 10px;
      color: #6a1b9a;
    }
    
    .flash-outline { 
      box-shadow: 0 0 0 2px red; 
      transition: box-shadow 0.2s ease; 
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeGrandchildLeftComponent implements DoCheck {
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
    console.log('🔄 TreeGrandchildLeftComponent change detection (OnPush)');
    if (!this.isRefreshPhase) {
      this.flashService.flash(this.container, this.renderer);
    }
  }
}
