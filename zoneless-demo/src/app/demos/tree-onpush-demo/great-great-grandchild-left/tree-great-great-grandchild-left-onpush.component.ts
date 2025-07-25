import {
  Component,
  ChangeDetectionStrategy,
  DoCheck,
  ElementRef,
  Renderer2,
  NgZone,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashService } from '../../../services/flash.service';

@Component({
  selector: 'app-tree-great-great-grandchild-left-onpush',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #container class="tree-great-great-grandchild">
      <div class="tree-node">
        <div class="node-box">
          <h4>Great Great Grandchild Left (OnPush) {{ flash() }}</h4>
        </div>
      </div>
    </div>
  `,
  styles: `
    .tree-great-great-grandchild {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 6px;
    }
    
    .tree-node {
      margin-bottom: 6px;
    }
    
    .node-box {
      border: 3px solid #4caf50;
      background: #e8f5e8;
      padding: 6px 10px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .node-box h4 {
      margin: 0;
      color: #2e7d32;
      font-size: 9px;
      font-weight: bold;
    }
    
    .flash-outline { 
      box-shadow: 0 0 0 3px red; 
      transition: box-shadow 0.2s ease; 
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeGreatGreatGrandchildLeftOnPushComponent {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  constructor(
    private renderer: Renderer2,
    private flashService: FlashService
  ) {}

  flash() {
    return this.flashService.flash(this.container, this.renderer);
  }
}
