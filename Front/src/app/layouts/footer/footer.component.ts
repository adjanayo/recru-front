import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import menu from '../../../assets/config/menu.json';
import social from '../../../assets/config/social.json';
import config from '../../../assets/config/config.json';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  private platformId = inject(PLATFORM_ID);

  menuItems = menu.footer;
  socialLinks = social;
  footerContent = config.params.footer_content;
  copyright = config.params.copyright.replace('{year}', new Date().getFullYear().toString());

  isPlatformBrowser() {
    return isPlatformBrowser(this.platformId);
  }
}
