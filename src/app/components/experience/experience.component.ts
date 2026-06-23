import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TimelineItem {
  period: string;
  role: string;
  company: string;
  location: string;
  highlights: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  timeline: TimelineItem[] = [
    {
      period: 'Aug 2022 — Present',
      role: 'Senior Software Engineer',
      company: 'EY Global Delivery Services',
      location: 'Kolkata, India',
      highlights: [
        'Architected and scaled Spring Boot microservices on GCP, improving system throughput by 35% through targeted performance profiling and async processing patterns.',
        'Engineered enterprise Angular v16+ frontend with reusable component libraries, lazy-loaded feature modules, and reactive RxJS data pipelines serving 500+ concurrent users.',
        'Implemented JWT-based role authentication with Spring Security enforcing granular RBAC policies across multi-tenant application boundaries.',
        'Led AI-augmented engineering velocity initiative using GitHub Copilot (GH300 certified), reducing routine CRUD feature delivery time by ~30%.',
        'Integrated GCP BigQuery and Cloud Storage for analytical workloads, orchestrating ETL pipelines via Apache Airflow DAGs ensuring 100% data integrity SLA.',
        'Established comprehensive JUnit + Mockito testing culture achieving 85%+ code coverage on critical service layers.'
      ]
    }
  ];

  techUsed: string[] = [
    'Angular v16+', 'Spring Boot', 'Java 17', 'GCP BigQuery',
    'Apache Airflow', 'JWT', 'PostgreSQL', 'Docker', 'RxJS', 'GitHub Copilot'
  ];
}
