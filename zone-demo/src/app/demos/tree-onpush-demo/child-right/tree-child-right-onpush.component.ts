import {
  Component,
  ChangeDetectionStrategy,
  DoCheck,
  ElementRef,
  Renderer2,
  NgZone,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashService } from '../../../services/flash.service';

@Component({
  selector: 'app-tree-child-right-onpush',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #container class="tree-child">
      <div class="tree-node">
        <div class="node-box">
          <h4>Child Right (Default) {{ flash() }}</h4>
        </div>
      </div>
    </div>
  `,
  styles: `
    .tree-child {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 15px;
    }
    
    .tree-node {
      margin-bottom: 15px;
    }
    
    .node-box {
      border: 3px solid #9c27b0;
      background: #f3e5f5;
      padding: 12px 20px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .node-box h4 {
      margin: 0 0 8px 0;
      color: #7b1fa2;
      font-size: 14px;
      font-weight: bold;
    }
    
    .flash-outline { 
      box-shadow: 0 0 0 3px red; 
      transition: box-shadow 0.2s ease; 
    }
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TreeChildRightOnPushComponent {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  constructor(
    private renderer: Renderer2,
    private flashService: FlashService
  ) {}

  flash() {
    return this.flashService.flash(this.container, this.renderer);
  }
}
