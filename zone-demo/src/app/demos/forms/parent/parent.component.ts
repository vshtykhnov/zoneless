import {
  Component,
  DoCheck,
  ElementRef,
  Renderer2,
  NgZone,
  ViewChild,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildComponent } from '../child/child.component';
import { FlashService } from '../../../services/flash.service';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [CommonModule, ChildComponent],
  template: `
    <div #container class="block">
      <div class="content-section">
        <p>ParentComponent (Default){{ isRefreshPhase ? flash() : '' }}</p>
        <app-child [isRefreshPhase]="isRefreshPhase"></app-child>
      </div>
    </div>
  `,
  styles: `
    .block { 
      border: 2px solid green; 
      padding: 24px; 
      margin: 8px; 
      background: #e8f5e8;
    }
    
    .flash-outline { 
      box-shadow: 0 0 0 3px red; 
      transition: box-shadow 0.2s ease; 
    }
  `,
})
export class ParentComponent implements DoCheck {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;
  @Input() isRefreshPhase = false;

  constructor(
    private ngZone: NgZone,
    private renderer: Renderer2,
    private flashService: FlashService
  ) {}

  flash() {
    return this.flashService.flash(this.container, this.renderer);
  }

  ngDoCheck() {
    console.log('🔄 ParentComponent change detection (Zone)');
    if (!this.isRefreshPhase) {
      this.flashService.flash(this.container, this.renderer);
    }
  }
}
