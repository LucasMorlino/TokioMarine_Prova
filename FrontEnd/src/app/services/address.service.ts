import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../../app/models/address.model';
import { ViaCepResponse } from '../../app/models/via-cep-response.model'; 

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'http://localhost:8080';
  private viaCepUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  create(address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.apiUrl}/addresses`, address);
  }

  update(id: number, address: Address): Observable<Address> {
    return this.http.put<Address>(`${this.apiUrl}/addresses/${id}`, address);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/addresses/${id}`);
  }

  getByCep(cep: string): Observable<ViaCepResponse> {
    const cleanCep = cep.replace(/\D/g, '');
    return this.http.get<ViaCepResponse>(`${this.viaCepUrl}/${cleanCep}/json/`);
  }
}