import { Injectable, ElementRef, Renderer2, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FlashService {
  private flashTimeout: any;

  constructor(private ngZone: NgZone) {}

  flash(container: ElementRef<HTMLElement>, renderer: Renderer2) {
    console.log('🔦 FlashService.flash() called');
    const el = container.nativeElement;
    renderer.addClass(el, 'flash-outline');
    this.ngZone.runOutsideAngular(() => {
      const timeout = setTimeout(
        () => renderer.removeClass(el, 'flash-outline'),
        200
      );
    });
    return '';
  }
}
