import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BackendService } from './services/backend.service';
import { RequestPayload } from './interfaces/request-payload';
import { ResponsePayload } from './interfaces/response-payload';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, UpperCasePipe, MatButtonModule, MatProgressSpinnerModule],
  providers: [BackendService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private backendService = inject(BackendService);
  private router = inject(Router);

  loading: boolean = false;

  ngOnInit() {
    this.backendService.loading$.subscribe((state) => {
      this.loading = state;
    });
  }

  private responsePayload: ResponsePayload = {
    text: "Can't connect to backend server!",
    citationSources: [],
  };

  coreCSControls: Array<string> = [
    'Java',
    'JavaScript',
    'Python',
    'C/C++',
    'SQL',
    'Computer Network',
    'Database',
    'Operating System',
    'OOPS',
  ];

  coreCSForm = new FormGroup({
    Java: new FormControl(false),
    JavaScript: new FormControl(false),
    Python: new FormControl(false),
    'C/C++': new FormControl(false),
    SQL: new FormControl(false),
    'Computer Network': new FormControl(false),
    Database: new FormControl(false),
    'Operating System': new FormControl(false),
    OOPS: new FormControl(false),
  });

  problemSolvingControls: Array<string> = [
    'Array',
    'Linked List',
    'Stack',
    'Queue',
    'Tree',
    'Graph',
    'Hash Maps',
    'Sorting',
    'Searching',
    'Greedy',
    'Recursion / Backtracking',
    'Dynamic Programming',
    'Graph Algorithms',
  ];

  problemSolvingForm = new FormGroup({
    Array: new FormControl(false),
    'Linked List': new FormControl(false),
    Stack: new FormControl(false),
    Queue: new FormControl(false),
    Tree: new FormControl(false),
    Graph: new FormControl(false),
    'Hash Maps': new FormControl(false),
    Sorting: new FormControl(false),
    Searching: new FormControl(false),
    Greedy: new FormControl(false),
    'Recursion / Backtracking': new FormControl(false),
    'Dynamic Programming': new FormControl(false),
    'Graph Algorithms': new FormControl(false),
  });

  behavioralControls: Array<string> = [
    'Leadership / Ownership / Initiative',
    'Teamwork / Conflict Resolution',
    'Failure / Resilience',
    'Influencing / Persuasion',
    'Ethical / Moral Conflict',
  ];

  behavioralForm = new FormGroup({
    'Leadership / Ownership / Initiative': new FormControl(false),
    'Teamwork / Conflict Resolution': new FormControl(false),
    'Failure / Resilience': new FormControl(false),
    'Influencing / Persuasion': new FormControl(false),
    'Ethical / Moral Conflict': new FormControl(false),
  });

  customizationControl = new FormControl('Keep it concise.');

  submitForm() {
    let requestPayload: RequestPayload = {
      prompt: '',
      coreCS: [],
      problemSolving: [],
      behavioral: [],
    };

    requestPayload.prompt = this.customizationControl.value;

    for (const item of this.coreCSControls) {
      if (this.coreCSForm.get(item)?.value) {
        requestPayload.coreCS.push(item);
      }
    }

    for (const item of this.problemSolvingControls) {
      if (this.problemSolvingForm.get(item)?.value) {
        requestPayload.problemSolving.push(item);
      }
    }

    for (const item of this.behavioralControls) {
      if (this.behavioralForm.get(item)?.value) {
        requestPayload.behavioral.push(item);
      }
    }

    this.backendService.setMockInterviewData(requestPayload);

    this.router.navigate(['/result']);
  }
}
