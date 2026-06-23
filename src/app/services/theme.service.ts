import { Injectable, Renderer2, RendererFactory2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private renderer: Renderer2;
  private _theme: Theme = 'light';

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this._theme = this.getSavedTheme();
    this.apply(this._theme);
  }

  get theme(): Theme {
    return this._theme;
  }

  get isDark(): boolean {
    return this._theme === 'dark';
  }

  toggle(): void {
    this._theme = this._theme === 'light' ? 'dark' : 'light';
    this.apply(this._theme);
    localStorage.setItem('portfolio-theme', this._theme);
  }

  private apply(theme: Theme): void {
    if (theme === 'dark') {
      this.renderer.setAttribute(this.document.documentElement, 'data-theme', 'dark');
    } else {
      this.renderer.removeAttribute(this.document.documentElement, 'data-theme');
    }
  }

  private getSavedTheme(): Theme {
    const saved = localStorage.getItem('portfolio-theme') as Theme | null;
    if (saved === 'dark' || saved === 'light') return saved;
    // Respect system preference if no saved value
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
