import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FlashService } from '../services/flash.service';

@Component({
  selector: 'app-child-left',
  templateUrl: './child-left.component.html',
  styleUrls: ['./child-left.component.css']
})
export class ChildLeftComponent {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  constructor(
    private renderer: Renderer2,
    private flashService: FlashService
  ) {}

  flash() {
    return this.flashService.flash(this.container, this.renderer);
  }
} 