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
import { TreeGrandchildLeftOnPushComponent } from '../grandchild-left/tree-grandchild-left-onpush.component';
import { FlashService } from '../../../services/flash.service';

@Component({
  selector: 'app-tree-child-left-onpush',
  standalone: true,
  imports: [CommonModule, TreeGrandchildLeftOnPushComponent],
  template: `
    <div #container class="tree-child">
      <div class="tree-node">
        <div class="node-box">
          <h4>Child Left (OnPush) - {{ value }} {{ flash() }}</h4>
        </div>
      </div>

      <div class="tree-branches">
        <div class="branch-center">
          <div class="connection-line"></div>
          <app-tree-grandchild-left-onpush></app-tree-grandchild-left-onpush>
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
      border: 3px solid #4caf50;
      background: #e8f5e8;
      padding: 12px 20px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
         .node-box h4 {
       margin: 0 0 8px 0;
       color: #2e7d32;
       font-size: 14px;
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
      width: 3px;
      height: 25px;
      background: #4caf50;
      margin-bottom: 8px;
    }
    
    .flash-outline { 
      box-shadow: 0 0 0 3px red; 
      transition: box-shadow 0.2s ease; 
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeChildLeftOnPushComponent implements AfterViewInit {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  // Regular variable for value
  public value = Math.floor(Math.random() * 1000);

  constructor(
    private ngZone: NgZone,
    private renderer: Renderer2,
    private flashService: FlashService,
    private cdr: ChangeDetectorRef
  ) {}

  flash() {
    return this.flashService.flash(this.container, this.renderer);
  }

  ngAfterViewInit() {
    // Auto-increment value every second
    setInterval(() => {
      this.value++;
    }, 1000);
  }
}
