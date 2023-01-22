import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mahasiswa } from './mahasiswa';

@Injectable({
  providedIn: 'root'
})
export class MahasiswaService {
  private baseUrl = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  public getMahasiswa(): Observable<Mahasiswa[]> {
    return this.http.get<Mahasiswa[]>(`${this.baseUrl}/api/v1/mahasiswa`)
  }

  public addMahasiswa(mahasiswa: Mahasiswa): Observable<Mahasiswa> {
      return this.http.post<Mahasiswa>(`${this.baseUrl}/api/v1/mahasiswa`, mahasiswa)
  }

  public getMahasiswaById(id: String): Observable<Mahasiswa> {
      return this.http.get<Mahasiswa>(`${this.baseUrl}/api/v1/mahasiswa/get?id=${id}`)
  }

  public updateMahasiswa(mahasiswa: Mahasiswa): Observable<Mahasiswa> {
      return this.http.put<Mahasiswa>(`${this.baseUrl}/api/v1/mahasiswa`, mahasiswa)
  }

  public deleteMahasiswa(id: String): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/api/v1/mahasiswa?id=${id}`)
  }
}
