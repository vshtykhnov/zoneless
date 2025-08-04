import {
  Component,
  Input,
  ElementRef,
  Renderer2,
  ViewChild,
  DoCheck,
  ChangeDetectionStrategy,
  Signal,
} from '@angular/core';
import { FlashService } from '../../services/flash.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #cardElement class="card">
      <div class="card-header">
        <span class="card-id">Card {{ card.id }}{{ flash() }}</span>
        <span class="card-timestamp">{{ card.timestamp() | date : 'HH:mm:ss.SSS' }}</span>
      </div>
      <div class="card-content">
        <div class="card-value">{{ card.value() }}</div>
        <div class="card-updates">Updates: {{ card.updateCount() }}</div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background: white;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      padding: 12px;
      transition: all 0.3s ease;
      position: relative;
      cursor: pointer;
    }

    .card:hover {
      border-color: #2196f3;
      box-shadow: 0 4px 8px rgba(33, 150, 243, 0.2);
      transform: translateY(-2px);
    }

    .flash-outline {
      border: 3px solid #ff5722 !important;
      box-shadow: 0 0 15px rgba(255, 87, 34, 0.6) !important;
      animation: flashOutline 0.2s ease-in-out;
    }

    @keyframes flashOutline {
      0% {
        border-color: #ff5722;
        box-shadow: 0 0 15px rgba(255, 87, 34, 0.6);
      }
      100% {
        border-color: #e0e0e0;
        box-shadow: none;
      }
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .card-id {
      font-weight: bold;
      color: #333;
    }

    .card-timestamp {
      font-size: 12px;
      color: #666;
    }

    .card-content {
      text-align: center;
    }

    .card-value {
      font-size: 24px;
      font-weight: bold;
      color: #2196f3;
      margin-bottom: 4px;
    }

    .card-updates {
      font-size: 12px;
      color: #666;
    }
  `],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CardComponent implements DoCheck {
  @Input() card!: {
    id: number;
    value: Signal<number>;
    timestamp: Signal<Date>;
    updateCount: Signal<number>;
  };

  @ViewChild('cardElement', { static: true })
  cardElement!: ElementRef<HTMLElement>;

  constructor(
    private renderer: Renderer2,
    private flashService: FlashService
  ) {}

  flash() {
    return this.flashService.flash(this.cardElement, this.renderer);
  }

  ngDoCheck() {
    console.log(`🔄 Card ${this.card.id} change detection (Zone + Default)`);
  }
}
