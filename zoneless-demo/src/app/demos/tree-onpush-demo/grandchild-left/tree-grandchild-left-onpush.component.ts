import {
  Component,
  ChangeDetectionStrategy,
  DoCheck,
  ElementRef,
  Renderer2,
  NgZone,
  ViewChild,
  signal,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeGreatGrandchildLeftOnPushComponent } from '../great-grandchild-left/tree-great-grandchild-left-onpush.component';
import { FlashService } from '../../../services/flash.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-tree-grandchild-left-onpush',
  standalone: true,
  imports: [CommonModule, TreeGreatGrandchildLeftOnPushComponent],
  template: `
    <div #container class="tree-grandchild">
      <div class="tree-node">
        <div class="node-box">
          <h4>Grandchild Left (Default) - {{ value() }} {{ flash() }}</h4>
          <button #updateSignalBtn class="update-btn">Update Signal</button>
        </div>
      </div>

      <div class="tree-branches">
        <div class="branch-center">
          <div class="connection-line"></div>
          <app-tree-great-grandchild-left-onpush></app-tree-great-grandchild-left-onpush>
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
      border: 3px solid #8bc34a;
      background: #f1f8e9;
      padding: 10px 16px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .node-box h4 {
        margin: 0 0 8px 0;
        color: #558b2f;
        font-size: 12px;
        font-weight: bold;
      }
      
      .update-btn {
        padding: 3px 6px;
        border: none;
        border-radius: 3px;
        background: #8bc34a;
        color: white;
        cursor: pointer;
        font-size: 8px;
        font-weight: 500;
        transition: all 0.2s ease;
      }
      
      .update-btn:hover {
        background: #689f38;
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
       height: 20px;
       background: #8bc34a;
       margin-bottom: 6px;
     }
    
    .flash-outline { 
      box-shadow: 0 0 0 3px red; 
      transition: box-shadow 0.2s ease; 
    }
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TreeGrandchildLeftOnPushComponent implements AfterViewInit {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;
  @ViewChild('updateSignalBtn', { static: true })
  updateSignalBtn!: ElementRef<HTMLButtonElement>;

  // Signal for value
  private valueSignal = signal(Math.floor(Math.random() * 1000));
  value = this.valueSignal.asReadonly();

  constructor(
    private renderer: Renderer2,
    private flashService: FlashService
  ) {}

  flash() {
    return this.flashService.flash(this.container, this.renderer);
  }

  ngAfterViewInit() {
    this.updateSignalBtn.nativeElement.addEventListener('click', () => {
      this.updateSignal();
    });
  }

  updateSignal() {
    console.log('🔄 TreeGrandchildLeftOnPushComponent: Update Signal clicked');
    const newValue = Math.floor(Math.random() * 1000);
    this.valueSignal.set(newValue);
  }
}
