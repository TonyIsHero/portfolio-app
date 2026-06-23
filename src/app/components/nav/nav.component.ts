import { Component, Input, OnChanges, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

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
export class NavComponent implements OnChanges {
  @Input() scrollY = 0;

  isScrolled  = false;
  mobileOpen  = false;

  sections: NavSection[] = [
    { id: 'hero',        label: 'About'       },
    { id: 'credentials', label: 'Credentials' },
    { id: 'projects',   label: 'Work'         },
    { id: 'experience', label: 'Experience'   },
    { id: 'contact',    label: 'Connect'      }
  ];

  constructor(private elRef: ElementRef) {}

  ngOnChanges(): void {
    this.isScrolled = this.scrollY > 40;
  }

  toggleMobile(): void {
    this.mobileOpen = !this.mobileOpen;
  }

  scrollTo(id: string): void {
    this.mobileOpen = false;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /** Close drawer when clicking outside the nav */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.mobileOpen && !this.elRef.nativeElement.contains(event.target)) {
      this.mobileOpen = false;
    }
  }
}
