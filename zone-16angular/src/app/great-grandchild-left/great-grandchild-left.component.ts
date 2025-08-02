import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FlashService } from '../services/flash.service';

@Component({
  selector: 'app-great-grandchild-left',
  templateUrl: './great-grandchild-left.component.html',
  styleUrls: ['./great-grandchild-left.component.css'],
})
export class GreatGrandchildLeftComponent {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  constructor(
    private renderer: Renderer2,
    private flashService: FlashService
  ) {}

  flash() {
    return this.flashService.flash(this.container, this.renderer);
  }
}
