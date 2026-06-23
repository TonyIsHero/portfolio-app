import { Component, Input, OnChanges, OnDestroy, HostListener, ElementRef, Renderer2, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

interface NavSection {
  id: string;
  label: string;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnChanges, OnDestroy {
  @Input() scrollY = 0;

  isScrolled  = false;
  mobileOpen  = false;
  photoOpen   = false;

  sections: NavSection[] = [
    { id: 'hero',        label: 'About'       },
    { id: 'credentials', label: 'Credentials' },
    { id: 'projects',   label: 'Work'         },
    { id: 'experience', label: 'Experience'   },
    { id: 'contact',    label: 'Connect'      }
  ];

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    public themeService: ThemeService
  ) {}

  get isDark(): boolean {
    return this.themeService.isDark;
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  openPhoto(): void  { this.photoOpen = true;  }
  closePhoto(): void { this.photoOpen = false; }

  /** Close modal on Escape */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.photoOpen) this.closePhoto();
  }

  /** Block right-click context menu on the modal image */
  onImageContextMenu(event: MouseEvent): void {
    event.preventDefault();
  }

  ngOnChanges(): void {
    // Only apply the scrolled style when the drawer is closed.
    // This prevents the semi-transparent backdrop-filter background of
    // .nav.scrolled from bleeding through the open drawer.
    this.isScrolled = this.scrollY > 40 && !this.mobileOpen;
  }

  ngOnDestroy(): void {
    this.setBodyScrollLock(false);
  }

  toggleMobile(): void {
    this.mobileOpen = !this.mobileOpen;
    this.setBodyScrollLock(this.mobileOpen);
    // Re-evaluate scrolled class now that mobileOpen changed
    this.isScrolled = this.scrollY > 40 && !this.mobileOpen;
  }

  private setBodyScrollLock(lock: boolean): void {
    // Only lock scroll on mobile — desktop has no drawer visible.
    // The hamburger/drawer are hidden via CSS at > 768px, so
    // applying overflow:hidden on desktop would break page scrolling.
    const isMobile = window.innerWidth <= 768;
    if (lock && isMobile) {
      this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
    } else {
      this.renderer.removeStyle(this.document.body, 'overflow');
    }
  }

  scrollTo(id: string): void {
    this.mobileOpen = false;
    this.setBodyScrollLock(false);
    this.isScrolled = this.scrollY > 40;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /** Close drawer when clicking outside the nav */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.mobileOpen && !this.elRef.nativeElement.contains(event.target)) {
      this.mobileOpen = false;
      this.setBodyScrollLock(false);
      this.isScrolled = this.scrollY > 40;
    }
  }
}
