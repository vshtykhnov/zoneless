import {
  Component,
  DoCheck,
  ElementRef,
  Renderer2,
  NgZone,
  ViewChild,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildPhaseComponent } from '../child/child-phase.component';
import { FlashService } from '../../../services/flash.service';

@Component({
  selector: 'app-parent-phase',
  standalone: true,
  imports: [CommonModule, ChildPhaseComponent],
  template: `
    <div #container class="block">
      <div class="header-section">
        <h3>Forms Demo (Zoneless)</h3>
        <div class="phase-buttons">
          <button
            (click)="isRefreshPhase = false"
            class="phase-btn check-phase"
            [class.active]="!isRefreshPhase"
          >
            Check Phase
          </button>
          <button
            (click)="isRefreshPhase = true"
            class="phase-btn refresh-phase"
            [class.active]="isRefreshPhase"
          >
            Patching Phase
          </button>
        </div>
      </div>
      <div class="content-section">
        <p>ParentComponent (OnPush){{ isRefreshPhase ? flash() : '' }}</p>
        <app-child-phase [isRefreshPhase]="isRefreshPhase"></app-child-phase>
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
    
    .header-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
    
    .block h3 {
      margin: 0;
      color: #2e7d32;
    }
    
    .phase-buttons {
      display: flex;
      gap: 8px;
    }
    
    .phase-btn {
      border: 2px solid;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12px;
      font-weight: bold;
      transition: all 0.3s ease;
      min-width: 100px;
    }
    
    .check-phase {
      background: #e8f5e8;
      border-color: #4caf50;
      color: #2e7d32;
    }
    
    .check-phase:hover {
      background: #c8e6c9;
    }
    
    .check-phase.active {
      background: #4caf50;
      color: white;
      box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
    }
    
    .refresh-phase {
      background: #fff3e0;
      border-color: #ff9800;
      color: #f57c00;
    }
    
    .refresh-phase:hover {
      background: #ffe0b2;
    }
    
    .refresh-phase.active {
      background: #ff9800;
      color: white;
      box-shadow: 0 2px 8px rgba(255, 152, 0, 0.3);
    }
    
    .content-section {
      margin-top: 15px;
    }
    
    .flash-outline { 
      box-shadow: 0 0 0 3px red; 
      transition: box-shadow 0.2s ease; 
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParentPhaseComponent implements DoCheck {
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
    console.log('🔄 ParentPhaseComponent change detection (Zoneless)');
    if (!this.isRefreshPhase) {
      this.flashService.flash(this.container, this.renderer);
    }
  }
}
