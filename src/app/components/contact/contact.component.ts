import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  readonly email       = environment.email;
  readonly linkedinUrl = environment.linkedinUrl;
  readonly githubUrl   = environment.githubUrl;

  copyEmail(): void {
    navigator.clipboard.writeText(this.email).then(() => {
      // Optionally show a toast; kept simple
    });
  }
}
