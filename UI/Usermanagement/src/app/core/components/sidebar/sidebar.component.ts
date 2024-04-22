import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  activeLink: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.highlightActiveLink(event.urlAfterRedirects);
      });
  }

  highlightActiveLink(url: string) {
    if (url === '/dashboard') {
      this.activeLink = 'dashboard';
    } else if (url === '/documents') {
      this.activeLink = 'documents';
    } else {
      this.activeLink = null;
    }
  }

  highlightLink(linkName: string) {
    this.activeLink = linkName;
  }
}
