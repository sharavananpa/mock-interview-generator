import { Component, inject } from '@angular/core';
import { ResponsePayload } from '../interfaces/response-payload';
import { BackendService } from '../services/backend.service';
import { MarkdownModule } from 'ngx-markdown';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-display-questions',
  imports: [MarkdownModule, MatProgressSpinnerModule],
  templateUrl: './display-questions.component.html',
  styleUrl: './display-questions.component.scss',
})
export class DisplayQuestionsComponent {
  private backendService = inject(BackendService);
  data: ResponsePayload | null = null;

  loading: boolean = false;

  ngOnInit() {
    this.backendService.responsePayload$.subscribe((res) => {
      if (res == null) {
        this.data = {
          text: "# What are you doing here?\n Go to the home page and choose the topics you like.\n\n *Go! Go! Go!!!*",
          citationSources: null
        };
      } else {
        this.data = res;
      }
    });
    this.backendService.loading$.subscribe((state) => {
      this.loading = state;
    });
  }
}
