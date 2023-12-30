import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

constructor(private router:Router){}

navigateTo(route: string): void {
  this.router.navigate([route]);
  window.scrollTo({ top: 0, behavior: "smooth" });
}




}
