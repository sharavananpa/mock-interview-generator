import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { RequestPayload } from '../interfaces/request-payload';
import { ResponsePayload } from '../interfaces/response-payload';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private _responsePayload = new BehaviorSubject<ResponsePayload | null>(null);
  readonly responsePayload$ = this._responsePayload.asObservable();

  private _loading = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loading.asObservable();

  constructor(private http: HttpClient) { }
  private url = "https://mock-interview-generator-backend-1745849879493.azurewebsites.net/mock";

  getMockInterview(requestPayload: RequestPayload): Observable<ResponsePayload> {
    return this.http.post<ResponsePayload>(this.url, requestPayload);
  }

  setMockInterviewData(requestPayload: RequestPayload) {
    this._loading.next(true);
    this.getMockInterview(requestPayload).pipe(
      finalize(() => this._loading.next(false))
    ).subscribe({
      next: res => {
        let updatedData: ResponsePayload = {
          text: res.text,
          citationSources: res.citationSources
        };
        this._responsePayload.next(updatedData);
        console.log("Mock Interview Updated!");
      },
      error: err => {
        console.log("Something went wrong!")
        let updatedData: ResponsePayload = {
          text: "# Something went wrong!\n Try again later...\n Or try again immediately...\n\n *I'll leave that up to you!*",
          citationSources: undefined
        }
        this._responsePayload.next(updatedData);
      }
    });
  }
}
