import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {
  editedData: any;
  ImageUrl: string;
  fileName: string;
  selectedFile: File | null = null; // Variable to store the selected file

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { playerData: any, imageUrl: string , file_name: string}
  ) {
    this.editedData = { ...data.playerData };
    this.ImageUrl = data.imageUrl;
    this.fileName = data.file_name;
    console.log('FileName',this.fileName);
    console.log('Image URl',this.ImageUrl);

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    // Create a FormData object
    const formData = new FormData();

    // Append the file to the FormData if a file is selected
    if (this.selectedFile) {
      // Append the file to the FormData
      formData.append('file', this.selectedFile , this.fileName);
    }
    // Append other form data
    formData.append('directory', this.ImageUrl); 
    formData.append('file_name', this.fileName); 
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    // Close the dialog and pass the FormData object
    this.dialogRef.close(formData);
  }

  onFileSelected_playerImage(event: any) {
    this.selectedFile = event.target.files[0];

  }
}
