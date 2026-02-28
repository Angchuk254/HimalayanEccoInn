import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsComponent } from './pages/terms/terms.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { NearbyComponent } from './pages/nearby/nearby.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Himalayan Eco Inn | Luxury Hotel in Leh Ladakh' },
  { path: 'about', component: AboutComponent, title: 'About Himalayan Eco Inn' },
  { path: 'experience', component: ExperienceComponent, title: 'Experience | Himalayan Eco Inn' },
  { path: 'rooms', component: RoomsComponent, title: 'Rooms & Amenities | Himalayan Eco Inn' },
  { path: 'contact', component: ContactComponent, title: 'Contact | Himalayan Eco Inn' },
  { path: 'gallery', component: GalleryComponent, title: 'Gallery | Himalayan Eco Inn' },
  { path: 'faq', component: FaqComponent, title: 'FAQ | Himalayan Eco Inn' },
  { path: 'reviews', component: ReviewsComponent, title: 'Guest Reviews | Himalayan Eco Inn' },
  { path: 'nearby', component: NearbyComponent, title: 'Nearby Places | Himalayan Eco Inn' },
  { path: 'privacy-policy', component: PrivacyPolicyComponent, title: 'Privacy Policy | Himalayan Eco Inn' },
  { path: 'terms', component: TermsComponent, title: 'Terms & Conditions | Himalayan Eco Inn' },
  { path: 'admin/login', component: AdminLoginComponent, title: 'Admin Login | Himalayan Eco Inn' },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [adminGuard],
    title: 'Admin Dashboard | Himalayan Eco Inn'
  },
  { path: '**', component: NotFoundComponent, title: 'Page Not Found | Himalayan Eco Inn' }
];
