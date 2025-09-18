import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private apiUrl = 'http://localhost:5000/api/notes'; 

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
      })
    };
  }

  getNotes(): Observable<any> {
    return this.http.get(this.apiUrl, this.getAuthHeaders());
  }

  createNote(note: any): Observable<any> {
    return this.http.post(this.apiUrl, note, this.getAuthHeaders());
  }

  updateNote(id: string, note: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, note, this.getAuthHeaders());
  }

  deleteNote(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }
}
