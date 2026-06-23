import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { CredentialsComponent } from './components/credentials/credentials.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ContactComponent } from './components/contact/contact.component';
import { NavComponent } from './components/nav/nav.component';
import { StepperComponent } from './components/stepper/stepper.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    CredentialsComponent,
    ProjectsComponent,
    ExperienceComponent,
    ContactComponent,
    NavComponent,
    StepperComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  activeSection = 'hero';
  scrollY = 0;

  private observer!: IntersectionObserver;

  ngOnInit(): void {
    this.initScrollReveal();
    this.initSectionObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    this.scrollY = window.scrollY;
  }

  private initScrollReveal(): void {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    }, 100);
  }

  private initSectionObserver(): void {
    const sections = ['hero', 'credentials', 'projects', 'experience', 'contact'];
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
          }
        });
      },
      { threshold: 0.4 }
    );

    setTimeout(() => {
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) this.observer.observe(el);
      });
    }, 200);
  }
}
