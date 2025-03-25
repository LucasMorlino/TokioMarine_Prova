import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from '../../../models/client.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-client-form-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    CommonModule 
  ],
  templateUrl: './client-form-dialog.component.html',
  styleUrls: ['./client-form-dialog.component.scss']
})
export class ClientFormDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ClientFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}