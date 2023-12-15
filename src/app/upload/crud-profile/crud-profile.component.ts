import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { ApiService } from '../../api.service';

const baseUrl = 'https://interface.myteambyfrmf.ma/uploads/datahub/';

export interface Player {
  Joueur: string;
  myteam_id: any;
  Équipe: {
    nom: string;
    logo: string;
  };
  'main position': {
    key: string;
    label: string;
  };
  Âge: number;
  'Minutes jouées': number;
  Pied: string | null;
  Taille: string;
  Poids: string;
  img_src: string;
  xG: number;
  xA: number;
  Position: string; // Added Position
  Label: string;    // Added Label
}


@Component({
  selector: 'app-crud-profile',
  templateUrl: './crud-profile.component.html',
  styleUrls: ['./crud-profile.component.css'],
})
export class CrudProfileComponent implements OnInit {
  getImageUrl(imagePath: string): string {
    return `${baseUrl}${imagePath}`;
  }

  displayedColumns: string[] = ['myteam_id', 'Joueur', 'Âge', 'Taille', 'Poids', 'Minutes jouées', 'Pied', 'Position', 'Label', 'Équipe', 'Équipe Logo', 'Image'];
  dataSource: MatTableDataSource<Player> = new MatTableDataSource<Player>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit() {
    this.apiService.getData().subscribe(
      (data: any[]) => {
        // Assuming data is an array of player objects
        this.dataSource = new MatTableDataSource<Player>(data.map(player => {
          return {
            ...player,
            Position: player['main position'].key,
            Label: player['main position'].label,
            Équipe: player.Équipe.nom,
            ['Équipe Logo']: player.Équipe.logo,
            Image: player.img_src,
          };
        }));
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching data from the API', error);
      }
    );
  }

  editData(data: Player): void {
    const imagePathArray = data.img_src.split('/');
    const fileName = imagePathArray[imagePathArray.length - 1];
    const fileNameParts = fileName.split('.');
    fileNameParts.pop();
    const fileNameWithoutExtension = fileNameParts.join('.');

    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '600px',
      data: { playerData: data, imageUrl: data.img_src ,file_name: fileNameWithoutExtension }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const formData = new FormData();
        formData.append('file_name', result.get('file_name') as string);
        formData.append('file', result.get('file') as File);
        formData.append('directory', result.get('directory') as string);
        // Log the FormData content
        
  
        // Call the update method in the service with FormData
        this.apiService.updateData(formData).subscribe(
          (updatedData) => {
            console.log('Data updated successfully:', updatedData);
            this.ngOnInit();
          },
          (error) => {
            console.error('Error updating data:', error);
          }
        );
      }
    });
  }
  

  applyFilter(event: any): void {
    const filterValue = event?.target?.value?.trim().toLowerCase() || '';
    // Check if the filter value is not null or undefined
    if (filterValue !== null && filterValue !== undefined) {
      this.dataSource.filter = filterValue;
    } else {
      // If filter value is null or undefined, reset the filter to show the full table
      this.dataSource.filter = '';
    }
  }
}
