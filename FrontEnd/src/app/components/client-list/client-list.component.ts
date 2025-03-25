import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from '../../services/client.service';
import { AddressService } from '../../services/address.service';
import { Client } from '../../models/client.model';
import { Address } from '../../models/address.model';
import { ClientFormDialogComponent } from './client-form-dialog/client-form-dialog.component';
import { AddressFormDialogComponent } from './address-form-dialog/address-form-dialog.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ClientFormDialogComponent,
    AddressFormDialogComponent
  ],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ClientListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'actions'];
  addressColumns: string[] = ['address', 'number', 'postalCode', 'city', 'actions'];
  clients: Client[] = [];
  filteredClients: Client[] = [];
  expandedElement: Client | null = null;
  searchTerm: string = '';

  constructor(
    private clientService: ClientService,
    private addressService: AddressService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getAll().subscribe({
      next: (clients) => {
        this.clients = clients;
        this.filteredClients = [...clients];
      },
      error: (err) => this.showError(err.message)
    });
  }

  filterClients(): void {
    this.filteredClients = this.clients.filter(client =>
      `${client.firstName} ${client.lastName || ''}`.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openClientDialog(client?: Client): void {
    const dialogRef = this.dialog.open(ClientFormDialogComponent, {
      width: '400px',
      data: client ? { ...client } : {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.clientService.update(result.id, result).subscribe({
            next: () => this.loadClients(),
            error: (err) => this.showError(err.message)
          });
        } else {
          this.clientService.create(result).subscribe({
            next: () => this.loadClients(),
            error: (err) => this.showError(err.message)
          });
        }
      }
    });
  }

  deleteClient(id: number): void {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.clientService.delete(id).subscribe({
        next: () => this.loadClients(),
        error: (err) => this.showError(err.message)
      });
    }
  }

  openAddressDialog(clientId: number, address?: Address): void {
    const dialogRef = this.dialog.open(AddressFormDialogComponent, {
      width: '400px',
      data: address ? { ...address } : { clientId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.addressService.update(result.id, result).subscribe({
            next: () => this.loadClients(),
            error: (err) => this.showError(err.message)
          });
        } else {
          this.addressService.create(result).subscribe({
            next: () => this.loadClients(),
            error: (err) => this.showError(err.message)
          });
        }
      }
    });
  }

  deleteAddress(addressId: number): void {
    if (confirm('Tem certeza que deseja excluir este endereço?')) {
      this.addressService.delete(addressId).subscribe({
        next: () => this.loadClients(),
        error: (err) => this.showError(err.message)
      });
    }
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Fechar', { duration: 3000 });
  }
}