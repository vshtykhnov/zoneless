import {
  Component,
  ChangeDetectionStrategy,
  DoCheck,
  ElementRef,
  Renderer2,
  NgZone,
  ViewChild,
  AfterViewInit,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeGreatGreatGrandchildLeftOnPushComponent } from '../great-great-grandchild-left/tree-great-great-grandchild-left-onpush.component';
import { FlashService } from '../../../services/flash.service';

@Component({
  selector: 'app-tree-great-grandchild-left-onpush',
  standalone: true,
  imports: [CommonModule, TreeGreatGreatGrandchildLeftOnPushComponent],
  template: `
    <div #container class="tree-great-grandchild">
      <div class="tree-node">
        <div class="node-box">
          <h4>Great Grandchild Left (Default) {{ flash() }}</h4>
        </div>
      </div>

      <div class="tree-branches">
        <div class="branch-center">
          <div class="connection-line"></div>
          <app-tree-great-great-grandchild-left-onpush></app-tree-great-great-grandchild-left-onpush>
        </div>
      </div>
    </div>
  `,
  styles: `
    .tree-great-grandchild {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8px;
    }
    
    .tree-node {
      margin-bottom: 8px;
    }
    
    .node-box {
      border: 3px solid #66bb6a;
      background: #f8faf8;
      padding: 8px 12px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .node-box h4 {
      margin: 0;
      color: #388e3c;
      font-size: 10px;
      font-weight: bold;
    }
    
    .tree-branches {
      display: flex;
      justify-content: center;
      width: 100%;
    }
    
    .branch-center {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .connection-line {
      width: 2px;
      height: 15px;
      background: #66bb6a;
      margin-bottom: 4px;
    }
    
    .flash-outline { 
      box-shadow: 0 0 0 3px red; 
      transition: box-shadow 0.2s ease; 
    }
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TreeGreatGrandchildLeftOnPushComponent {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  constructor(
    private renderer: Renderer2,
    private flashService: FlashService
  ) {}

  flash() {
    return this.flashService.flash(this.container, this.renderer);
  }
}
