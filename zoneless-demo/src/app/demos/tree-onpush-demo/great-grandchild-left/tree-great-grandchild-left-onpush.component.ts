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
  selector: 'app-tree-great-grandchild-left-onpush',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #container class="tree-great-grandchild">
      <div class="tree-node">
        <div class="node-box">
          <h4>Great Grandchild Left (OnPush) - {{ value }} {{ flash() }}</h4>
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
    
    .flash-outline { 
      box-shadow: 0 0 0 3px red; 
      transition: box-shadow 0.2s ease; 
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeGreatGrandchildLeftOnPushComponent implements AfterViewInit {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  // Regular variable for value
  public value = Math.floor(Math.random() * 1000);

  constructor(
    private ngZone: NgZone,
    private renderer: Renderer2,
    private flashService: FlashService
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
