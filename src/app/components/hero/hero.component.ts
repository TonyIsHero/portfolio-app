import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';

interface CodeLine {
  num: string;
  code: string;
  active: boolean;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  private typingSub?: Subscription;
  private lineSub?: Subscription;

  readonly linkedinUrl = environment.linkedinUrl;
  readonly githubUrl   = environment.githubUrl;
  codeLines: CodeLine[] = [
    { num: '01', code: 'microservices.orchestration()',      active: false },
    { num: '02', code: 'reactive.frontend.architectures()',  active: false },
    { num: '03', code: 'secure.jwt.gateways()',              active: false },
    { num: '04', code: 'ai.assisted.delivery()',             active: false }
  ];

  currentActiveIndex = 0;
  cursorVisible = true;

  ngOnInit(): void {
    this.startCodeAnimation();
    this.startCursorBlink();
  }

  ngOnDestroy(): void {
    this.typingSub?.unsubscribe();
    this.lineSub?.unsubscribe();
  }

  private startCodeAnimation(): void {
    this.codeLines[0].active = true;

    this.lineSub = interval(1400).subscribe(i => {
      const idx = (i + 1) % this.codeLines.length;
      this.codeLines.forEach((l, li) => l.active = li === idx);
      this.currentActiveIndex = idx;
    });
  }

  private startCursorBlink(): void {
    this.typingSub = interval(530).subscribe(() => {
      this.cursorVisible = !this.cursorVisible;
    });
  }

  scrollToProjects(): void {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
