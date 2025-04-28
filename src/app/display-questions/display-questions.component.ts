import { Component } from '@angular/core';
import { ResponsePayload } from '../interfaces/response-payload';
import { BackendService } from '../services/backend.service';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-display-questions',
  imports: [MarkdownModule],
  templateUrl: './display-questions.component.html',
  styleUrl: './display-questions.component.scss',
})
export class DisplayQuestionsComponent {
  data: ResponsePayload | null = null;
  loading: boolean = false;
  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.backendService.responsePayload$.subscribe((res) => {
      this.data = res;
    });
    this.backendService.loading$.subscribe((state) => {
      this.loading = state;
    });
  }
}
