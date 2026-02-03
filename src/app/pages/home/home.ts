import { Component, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private fontSizeCounter = 0;
  private readonly decreaseLimit = -5;
  private readonly increaseLimit = 5;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initAccessibilityBar();
    }
  }

  private initAccessibilityBar(): void {
    const contrastBtn = document.querySelector('.barra-accesibilidad-govco button.contrast');
    const decreaseBtn = document.querySelector('.barra-accesibilidad-govco button.decrease-font-size');
    const increaseBtn = document.querySelector('.barra-accesibilidad-govco button.increase-font-size');

    contrastBtn?.addEventListener('click', () => this.toggleContrast(contrastBtn as HTMLElement));
    decreaseBtn?.addEventListener('click', () => this.changeFontSizeAll(-1, decreaseBtn as HTMLElement));
    increaseBtn?.addEventListener('click', () => this.changeFontSizeAll(1, increaseBtn as HTMLElement));
  }

  private toggleContrast(button: HTMLElement): void {
    const body = document.body;
    if (body.classList.contains('contrast-govco')) {
      this.renderer.removeClass(body, 'contrast-govco');
      button.classList.remove('active');
    } else {
      this.renderer.addClass(body, 'contrast-govco');
      button.classList.add('active');
    }
  }

  private changeFontSizeAll(addition: number, button: HTMLElement): void {
    const newCounter = this.fontSizeCounter + addition;

    if (newCounter >= this.decreaseLimit && newCounter <= this.increaseLimit) {
      this.fontSizeCounter = newCounter;
      const elements = document.querySelectorAll('body *');
      elements.forEach((element) => {
        this.changeFontSize(element as HTMLElement, addition);
      });
      this.setActiveButton(button);
    }
  }

  private changeFontSize(element: HTMLElement, increment: number): void {
    const computedStyle = window.getComputedStyle(element);
    const currentSize = parseFloat(computedStyle.fontSize);
    this.renderer.setStyle(element, 'fontSize', `${currentSize + increment}px`);
  }

  private setActiveButton(button: HTMLElement): void {
    const parent = button.parentNode as HTMLElement;
    parent?.querySelector('.active')?.classList.remove('active');
    button.classList.add('active');
  }
}
