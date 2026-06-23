import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

interface ChartPoint { x: number; y: number; }

interface Project {
  id: string;
  label: string;
  featured: boolean;
  title: string;
  tags: string[];
  metrics?: { value: string; label: string }[];
  description: string;
  techStack: string[];
  hasChart: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private chartSub?: Subscription;

  chartPoints: ChartPoint[] = [];
  chartPath = '';
  chartAreaPath = '';
  readonly chartW = 260;
  readonly chartH = 110;

  projects: Project[] = [
    {
      id: 'analytics',
      label: 'DATA-DRIVEN ENTERPRISE ANALYTICS PLATFORM',
      featured: true,
      title: 'Enterprise Analytics Platform',
      tags: ['Angular v16+', 'RxJS', 'GCP', 'Highcharts'],
      metrics: [
        { value: '500+', label: 'Active Users' },
        { value: '100%', label: 'Data Integrity' },
        { value: '~50',  label: 'Concurrent Users' }
      ],
      description: 'Architected reusable Angular component library reducing platform code duplication by 40%. Built real-time REST data processing pipelines with RxJS streams and reactive state management. Delivered UI-driven operational self-service loading with Airflow DAG orchestration for 100% data integrity workflows.',
      techStack: ['REST APIs', 'RxJS Streams', 'GCP BigQuery', 'Airflow DAGs'],
      hasChart: true
    },
    {
      id: 'fintech',
      label: 'SECURE FINTECH TRADING APPLICATION',
      featured: false,
      title: 'FinTech Trading Backend',
      tags: ['Spring Boot', 'JPA/Hibernate', 'JWT', 'Flyway', 'SQL'],
      description: 'Financial domain backend infrastructure exposing 15+ RESTful APIs managing trade sessions and portfolio operations. Designed a robust persistence layer eliminating data inconsistency via Flyway schema versioning. Implemented JWT-based role security with Spring Security. Comprehensive JUnit test suite ensuring bulletproof production deployments.',
      techStack: ['Secure REST APIs', 'JPA/Hibernate', 'JUnit', 'Flyway'],
      hasChart: false
    }
  ];

  ngOnInit(): void {
    this.generateInitialChart();
    this.startChartAnimation();
  }

  ngOnDestroy(): void {
    this.chartSub?.unsubscribe();
  }

  private generateInitialChart(): void {
    this.chartPoints = this.createPoints();
    this.buildPaths();
  }

  private createPoints(): ChartPoint[] {
    const pts: ChartPoint[] = [];
    const count = 14;
    let y = this.chartH * 0.55;
    for (let i = 0; i < count; i++) {
      const x = (i / (count - 1)) * this.chartW;
      y += (Math.random() - 0.48) * 22;
      y = Math.max(12, Math.min(this.chartH - 12, y));
      pts.push({ x, y });
    }
    return pts;
  }

  private buildPaths(): void {
    if (this.chartPoints.length < 2) return;

    let path = `M ${this.chartPoints[0].x} ${this.chartPoints[0].y}`;
    for (let i = 1; i < this.chartPoints.length; i++) {
      const p0 = this.chartPoints[i - 1];
      const p1 = this.chartPoints[i];
      const cx = (p0.x + p1.x) / 2;
      path += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    this.chartPath = path;

    const last = this.chartPoints[this.chartPoints.length - 1];
    this.chartAreaPath = `${path} L ${last.x} ${this.chartH} L 0 ${this.chartH} Z`;
  }

  private startChartAnimation(): void {
    this.chartSub = interval(1200).subscribe(() => {
      // Shift all points left and add new point on right
      const shifted = this.chartPoints.slice(1).map((p, i) => ({
        x: (i / (this.chartPoints.length - 1)) * this.chartW,
        y: p.y
      }));
      const lastY = shifted[shifted.length - 1].y;
      const newY = Math.max(12, Math.min(this.chartH - 12, lastY + (Math.random() - 0.46) * 24));
      shifted.push({ x: this.chartW, y: newY });
      this.chartPoints = shifted;
      this.buildPaths();
    });
  }
}
