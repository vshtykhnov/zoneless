import {
  Component,
  DoCheck,
  ElementRef,
  Renderer2,
  ViewChild,
  AfterViewInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FlashService } from '../../services/flash.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';

@Component({
  selector: 'app-cards-demo',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <div #container class="async-signals-demo">
      <h2>Cards Demo (Zone + Default)</h2>
      <p>
        100 cards with traditional properties - Zone.js triggers full change
        detection
      </p>

      <div #cardsGrid class="cards-grid">
        <app-card
          *ngFor="let card of cards; let i = index"
          [card]="card"
          [attr.data-index]="i"
        ></app-card>
      </div>
    </div>
  `,
  styles: `
    .async-signals-demo {
      padding: 20px;
      background: #f5f5f5;
      border-radius: 8px;
      margin: 16px 0;
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 12px;
    }
  `,
})
export class AsyncSignalsDemoComponent implements AfterViewInit {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;
  @ViewChild('cardsGrid', { static: true }) cardsGrid!: ElementRef<HTMLElement>;

  // Traditional properties instead of signals
  cards: Array<{
    id: number;
    value: WritableSignal<number>;
    timestamp: WritableSignal<Date>;
    updateCount: WritableSignal<number>;
  }> = [];

  constructor(private renderer: Renderer2, private flashService: FlashService) {
    // Initialize 100 cards
    this.cards = Array.from({ length: 100 }, (_, index) => ({
      id: index + 1,
      value: signal(Math.floor(Math.random() * 1000)),
      timestamp: signal(new Date()),
      updateCount: signal(0),
    }));
  }

  ngAfterViewInit() {
    this.cardsGrid.nativeElement.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      const cardElement = target.closest('app-card');

      if (cardElement) {
        const index = cardElement.getAttribute('data-index');
        if (index !== null) {
          this.updateCard(parseInt(index));
        }
      }
    });
  }

  updateCard(index: number) {
    const card = this.cards[index];

    card.value.set(Math.floor(Math.random() * 1000));
    card.timestamp.set(new Date());
    card.updateCount.update(c => c + 1);

    console.log(`Updated card ${card.id} (Zone + Default)`);
  }

  flash() {
    return this.flashService.flash(this.container, this.renderer);
  }
}
