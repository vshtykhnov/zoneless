import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  signal,
  AfterViewInit,
  NgZone,
  ChangeDetectorRef,
} from '@angular/core';
import { FlashService } from '../services/flash.service';

@Component({
  selector: 'app-grandchild-left',
  templateUrl: './grandchild-left.component.html',
  styleUrls: ['./grandchild-left.component.css'],
})
export class GrandchildLeftComponent implements AfterViewInit {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;
  @ViewChild('updateSignalBtn', { static: true })
  updateSignalBtn!: ElementRef<HTMLButtonElement>;

  // Signal for value
  private valueSignal = signal(Math.floor(Math.random() * 1000));
  value = this.valueSignal.asReadonly();

  constructor(
    private renderer: Renderer2,
    private flashService: FlashService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  flash() {
    return this.flashService.flash(this.container, this.renderer);
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.updateSignalBtn.nativeElement.addEventListener('click', () => {
        this.ngZone.run(() => {
          this.updateSignal();
          console.log('🔄 GrandchildLeftComponent: Update Signal clicked');
        });
      });
    });
  }

  updateSignal() {
    console.log('🔄 GrandchildLeftComponent: Update Signal clicked');
    const newValue = Math.floor(Math.random() * 1000);
    this.valueSignal.set(newValue);
  }
}
