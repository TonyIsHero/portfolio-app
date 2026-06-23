import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StepperSection {
  id: string;
  label: string;
  index: number;
}

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent implements OnChanges {
  @Input() activeSection = 'hero';

  sections: StepperSection[] = [
    { id: 'hero',        label: 'Hero',        index: 1 },
    { id: 'credentials', label: 'Credentials', index: 2 },
    { id: 'projects',   label: 'Projects',    index: 3 },
    { id: 'experience', label: 'Experience',  index: 4 },
    { id: 'contact',    label: 'Connect',     index: 5 }
  ];

  activeIndex = 0;

  ngOnChanges(): void {
    const found = this.sections.find(s => s.id === this.activeSection);
    this.activeIndex = found ? found.index : 1;
  }

  scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  isActive(s: StepperSection): boolean {
    return s.index === this.activeIndex;
  }

  isPast(s: StepperSection): boolean {
    return s.index < this.activeIndex;
  }
}
