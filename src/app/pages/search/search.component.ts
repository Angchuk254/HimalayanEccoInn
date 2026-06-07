import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService, SearchResult } from '../../services/search.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-search',
  imports: [NgFor, NgIf, RouterLink, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  query = '';
  results: SearchResult[] = [];
  searched = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly searchService: SearchService,
    private readonly seo: SeoService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const q = params.get('q') ?? '';
      this.query = q;
      if (q.trim().length >= 2) {
        this.results = this.searchService.search(q);
        this.searched = true;
        this.seo.update({
          title: `Search: "${q}" | Himalayan Eco Inn`,
          description: `Search results for "${q}" on Himalayan Eco Inn – Leh, Ladakh.`,
          robots: 'noindex, follow'
        });
      } else {
        this.results = [];
        this.searched = false;
        this.seo.update({
          title: 'Search | Himalayan Eco Inn',
          description: 'Search rooms, experiences, and more at Himalayan Eco Inn, Leh Ladakh.',
          robots: 'noindex, follow'
        });
      }
    });
  }

  onSubmit() {
    if (this.query.trim().length >= 2) {
      this.router.navigate(['/search'], { queryParams: { q: this.query.trim() } });
    }
  }

  get categories(): string[] {
    return [...new Set(this.results.map((r) => r.category))];
  }

  resultsByCategory(cat: string): SearchResult[] {
    return this.results.filter((r) => r.category === cat);
  }
}
