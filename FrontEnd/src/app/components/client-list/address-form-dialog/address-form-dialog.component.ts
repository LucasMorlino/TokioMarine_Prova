import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Address } from '../../../models/address.model';
import { AddressService } from '../../../services/address.service';
import { ViaCepResponse } from '../../../models/via-cep-response.model';

@Component({
  selector: 'app-address-form-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  template: `
    <h1 mat-dialog-title>Adicionar Endereço</h1>
    <div mat-dialog-content>
      <form #addressForm="ngForm">
        <mat-form-field appearance="fill">
          <mat-label>CEP</mat-label>
          <input matInput name="postalCode" [(ngModel)]="form.postalCode" (blur)="onCepBlur()">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Endereço</mat-label>
          <input matInput name="address" [(ngModel)]="form.address" required>
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Número</mat-label>
          <input matInput name="number" [(ngModel)]="form.number" required>
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Complemento</mat-label>
          <input matInput name="complement" [(ngModel)]="form.complement">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Cidade</mat-label>
          <input matInput name="city" [(ngModel)]="form.city">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Estado</mat-label>
          <input matInput name="state" [(ngModel)]="form.state">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>País</mat-label>
          <input matInput name="country" [(ngModel)]="form.country">
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-button (click)="onSave()" [disabled]="!addressForm.valid">Salvar</button>
    </div>
  `,
  styles: []
})
export class AddressFormDialogComponent {
  form: Partial<Address> = {
    address: '',
    number: '',
    complement: '',
    postalCode: '',
    city: '',
    state: '',
    country: ''
  };

  clientId?: number;

  constructor(
    public dialogRef: MatDialogRef<AddressFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { clientId?: number; address?: Address },
    private addressService: AddressService
  ) {
    this.clientId = data.clientId;
    if (data.address) {
      this.form = { ...data.address };
    }
  }

  onCepBlur(): void {
    const cep = this.form.postalCode;
    if (cep && cep.length >= 8) {
      this.addressService.getByCep(cep).subscribe({
        next: (address: ViaCepResponse) => {
          if (!address.erro) {
            this.form.address = address.logradouro || undefined;
            this.form.city = address.localidade || undefined;
            this.form.state = address.uf || undefined;
            this.form.country = 'Brasil';
            this.form.complement = address.complemento || undefined;
          } else {
            console.error('CEP não encontrado');
          }
        },
        error: (err: any) => {
          console.error('Erro ao buscar CEP:', err);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const address: Address = {
      id: this.data.address?.id,
      clientId: this.clientId!, 
      client: this.clientId ? { id: this.clientId } : undefined,
      address: this.form.address!,
      number: this.form.number!,
      complement: this.form.complement || undefined,
      postalCode: this.form.postalCode || undefined,
      city: this.form.city || undefined,
      state: this.form.state || undefined,
      country: this.form.country || undefined
    };
    this.dialogRef.close(address);
  }
}