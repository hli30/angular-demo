import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bug } from '../interfaces/Bug';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class BugService {
  private apiUrl = 'http://localhost:5000/bugs';

  constructor(private http: HttpClient) {}

  // for demo purposes HTTP errors are not handled;
  // error handling in general will be talked about during interview

  getBugs(): Observable<Bug[]> {
    return this.http.get<Bug[]>(this.apiUrl);
  }

  createBug(bug: Bug): Observable<Bug> {
    return this.http.post<Bug>(this.apiUrl, bug, httpOptions);
  }

  deleteBug(bugId: number): Observable<any> {
    const url = `${this.apiUrl}/${bugId}`;
    return this.http.delete<Bug>(url);
  }

  updateBug(bugData: any): Observable<any> {
    const url = `${this.apiUrl}/${bugData.id}`;
    return this.http.put(url, bugData, httpOptions);
  }
}
