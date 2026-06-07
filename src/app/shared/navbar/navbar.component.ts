import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { SearchService, SearchResult } from '../../services/search.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, FormsModule, NgFor, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  searchQuery = '';
  suggestions: SearchResult[] = [];
  showSuggestions = false;
  activeSuggestionIndex = -1;
  searchOpen = false; // mobile search toggle

  @ViewChild('searchInputRef') searchInputRef?: ElementRef<HTMLInputElement>;

  constructor(
    private readonly searchService: SearchService,
    private readonly router: Router
  ) {}

  onSearchInput() {
    const q = this.searchQuery.trim();
    if (q.length >= 2) {
      this.suggestions = this.searchService.getSuggestions(q);
      this.showSuggestions = this.suggestions.length > 0;
    } else {
      this.suggestions = [];
      this.showSuggestions = false;
    }
    this.activeSuggestionIndex = -1;
  }

  onSearchKeydown(event: KeyboardEvent) {
    if (!this.showSuggestions) {
      if (event.key === 'Enter') this.submitSearch();
      return;
    }
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.activeSuggestionIndex = Math.min(
          this.activeSuggestionIndex + 1,
          this.suggestions.length - 1
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.activeSuggestionIndex = Math.max(this.activeSuggestionIndex - 1, -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.activeSuggestionIndex >= 0) {
          this.selectSuggestion(this.suggestions[this.activeSuggestionIndex]);
        } else {
          this.submitSearch();
        }
        break;
      case 'Escape':
        this.closeSuggestions();
        break;
    }
  }

  selectSuggestion(item: SearchResult) {
    this.closeSuggestions();
    this.searchQuery = '';
    this.router.navigate([item.url]);
  }

  submitSearch() {
    const q = this.searchQuery.trim();
    if (q.length >= 2) {
      this.closeSuggestions();
      this.searchQuery = '';
      this.searchOpen = false;
      this.router.navigate(['/search'], { queryParams: { q } });
    }
  }

  toggleMobileSearch() {
    this.searchOpen = !this.searchOpen;
    if (this.searchOpen) {
      setTimeout(() => this.searchInputRef?.nativeElement?.focus(), 50);
    } else {
      this.searchQuery = '';
      this.closeSuggestions();
    }
  }

  closeSuggestions() {
    this.showSuggestions = false;
    this.activeSuggestionIndex = -1;
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!target.closest('.navbar-search-wrap')) {
      this.closeSuggestions();
    }
  }
}
