import { Component, Input, OnChanges } from '@angular/core';
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

  isScrolled = false;

  sections: NavSection[] = [
    { id: 'hero',        label: 'About'      },
    { id: 'credentials', label: 'Credentials' },
    { id: 'projects',   label: 'Work'        },
    { id: 'experience', label: 'Experience'  },
    { id: 'contact',    label: 'Connect'     }
  ];

  ngOnChanges(): void {
    this.isScrolled = this.scrollY > 40;
  }

  scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
