import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
@Directive({
  selector: '[appHighlightIcons]'
})
export class HighlightIconsDirective {

  static selectedElement: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('click')
  onClick() {
    // Remove highlight from previously selected icon
    if (HighlightIconsDirective.selectedElement) {
      this.renderer.removeClass(HighlightIconsDirective.selectedElement, 'selected-icon');
    }

    // Highlight the currently clicked icon
    this.renderer.addClass(this.el.nativeElement, 'selected-icon');
    HighlightIconsDirective.selectedElement = this.el.nativeElement;
  }

}
