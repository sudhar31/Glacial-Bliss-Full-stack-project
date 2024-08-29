import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private renderer: Renderer2) { }

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      this.initTheme();
    }
    
  }
  
  initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') ?? 'dark';
    this.renderer.setAttribute(document.body, 'data-theme', currentTheme);

    themeToggle?.addEventListener('click', () => {
      const newTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      this.renderer.setAttribute(document.body, 'data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
}
