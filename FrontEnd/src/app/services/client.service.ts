import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/clients`);
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/clients`, client);
  }

  update(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/clients/${id}`, client);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clients/${id}`);
  }

  createAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.apiUrl}/addresses`, address);
  }
}