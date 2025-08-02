import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FlashService } from '../services/flash.service';

@Component({
  selector: 'app-parent-onpush',
  templateUrl: './parent-onpush.component.html',
  styleUrls: ['./parent-onpush.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParentOnpushComponent {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  constructor(
    private renderer: Renderer2,
    private flashService: FlashService
  ) {}

  flash() {
    return this.flashService.flash(this.container, this.renderer);
  }
}
