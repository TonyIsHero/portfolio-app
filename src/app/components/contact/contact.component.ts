import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  email = 'sarkarsabarno@gmail.com';
  linkedinUrl = 'https://www.linkedin.com/in/sabarno-sarkar-bb11b01a9';
  githubUrl = 'https://github.com/sabarno-sarkar';

  copyEmail(): void {
    navigator.clipboard.writeText(this.email).then(() => {
      // Optionally show a toast; kept simple
    });
  }
}
