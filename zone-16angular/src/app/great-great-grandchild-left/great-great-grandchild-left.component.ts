import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FlashService } from '../services/flash.service';

@Component({
  selector: 'app-great-great-grandchild-left',
  templateUrl: './great-great-grandchild-left.component.html',
  styleUrls: ['./great-great-grandchild-left.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GreatGreatGrandchildLeftComponent {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  constructor(
    private renderer: Renderer2,
    private flashService: FlashService
  ) {}

  flash() {
    return this.flashService.flash(this.container, this.renderer);
  }
}
