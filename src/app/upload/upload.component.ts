// upload.component.ts
import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import {MatTableModule} from '@angular/material/table';
import { Location } from '@angular/common';



@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  selectedFile_playerProfile: File | null = null;
  selectedFile_playerProfileInter: File | null = null;
  selectedFile_playerMetrics: File | null = null;
  selectedFile_matches: File | null = null;
  selectedFile_matchesJunior: File | null = null;
  selectedFile_matchesProfiles: File | null = null;
  selectedFile_matchesZip: File | null = null;
  playerProfile_Div: boolean = true;
  playerProfileInter_Div: boolean = false;
  playerMetrics_Div: boolean = false;
  matches_Div: boolean = false;
  matchesJunior_Div: boolean = false;
  matchesProfiles_Div: boolean = false;
  matchesZip_Div: boolean = false;
  isActive_playerProfile : boolean = true;
  isActive_playerProfileInter : boolean = false;
  isActive_playerMetrics : boolean = false;
  isActive_matches: boolean = false;
  isActive_matchesJunior: boolean = false;
  isActive_matchesProfiles : boolean = false;
  isActive_matchesZip : boolean = false;


  constructor(private apiService: ApiService, private location: Location) {}
  showPlayerProfile(){
    this.playerProfile_Div = this.isActive_playerProfile= true;
    this.playerProfileInter_Div = this.isActive_playerProfileInter= false;
    this.matches_Div= this.isActive_matches=false;
    this.playerMetrics_Div= this.isActive_playerMetrics=false;
    this.matchesProfiles_Div=this.isActive_matchesProfiles=false;
    this.matchesZip_Div=this.isActive_matchesZip=false;
    this.matchesJunior_Div= this.isActive_matchesJunior=false;
  }
  showPlayerProfileInter(){
    this.playerProfile_Div = this.isActive_playerProfile= false;
    this.matches_Div= this.isActive_matches=false;
    this.playerMetrics_Div= this.isActive_playerMetrics=false;
    this.matchesProfiles_Div=this.isActive_matchesProfiles=false;
    this.matchesZip_Div=this.isActive_matchesZip=false;
    this.matchesJunior_Div= this.isActive_matchesJunior=false;
    this.playerProfileInter_Div = this.isActive_playerProfileInter= true;

  }
  showPlayerMetrics(){
    this.playerMetrics_Div= this.isActive_playerMetrics=true;
    this.playerProfile_Div = this.isActive_playerProfile= false;
    this.matches_Div= this.isActive_matches=false;
    this.matchesProfiles_Div=this.isActive_matchesProfiles=false;
    this.matchesZip_Div=this.isActive_matchesZip=false;
    this.matchesJunior_Div= this.isActive_matchesJunior=false;
    this.playerProfileInter_Div = this.isActive_playerProfileInter= false;

  }
  showMatches(){
    this.matches_Div= this.isActive_matches=true;
    this.playerProfile_Div = this.isActive_playerProfile= false;
    this.playerMetrics_Div= this.isActive_playerMetrics=false;
    this.matchesProfiles_Div=this.isActive_matchesProfiles=false;
    this.matchesZip_Div=this.isActive_matchesZip=false;
    this.matchesJunior_Div= this.isActive_matchesJunior=false;
    this.playerProfileInter_Div = this.isActive_playerProfileInter= false;


  }
  showMatchesJunior(){
    this.matchesJunior_Div= this.isActive_matchesJunior=true;
    this.matches_Div= this.isActive_matches=false;
    this.playerProfile_Div = this.isActive_playerProfile= false;
    this.playerMetrics_Div= this.isActive_playerMetrics=false;
    this.matchesProfiles_Div=this.isActive_matchesProfiles=false;
    this.matchesZip_Div=this.isActive_matchesZip=false;
    this.playerProfileInter_Div = this.isActive_playerProfileInter= false;

  }
  showMatches_Profiles(){
    this.matchesProfiles_Div=this.isActive_matchesProfiles=true;
    this.matches_Div= this.isActive_matches=false;
    this.playerMetrics_Div= this.isActive_playerMetrics=false;
    this.playerProfile_Div = this.isActive_playerProfile= false;
    this.matchesZip_Div=this.isActive_matchesZip=false;
    this.playerProfileInter_Div = this.isActive_playerProfileInter= false;

    this.matchesJunior_Div= this.isActive_matchesJunior=false;

  }
  showMatchesZip(){
    this.matchesZip_Div=this.isActive_matchesZip=true;
    this.matchesProfiles_Div=this.isActive_matchesProfiles=false;
    this.matches_Div= this.isActive_matches=false;
    this.playerMetrics_Div= this.isActive_playerMetrics=false;
    this.playerProfile_Div = this.isActive_playerProfile= false;
    this.matchesJunior_Div= this.isActive_matchesJunior=false;
    this.playerProfileInter_Div = this.isActive_playerProfileInter= false;

  }
  onFileSelected_playerProfile(event: any) {
    this.selectedFile_playerProfile = event.target.files[0];
  }
  onFileSelected_playerProfileInter(event: any) {
    this.selectedFile_playerProfileInter = event.target.files[0];
  }
  onFileSelected_playerMetrics(event: any) {
    this.selectedFile_playerMetrics = event.target.files[0];
  }
  onFileSelected_matches(event: any) {
    this.selectedFile_matches = event.target.files[0];
  }
  onFileSelected_matchesJunior(event: any) {
    this.selectedFile_matchesJunior = event.target.files[0];
  }
  onFileSelected_matchesProfiles(event: any) {
    this.selectedFile_matchesProfiles = event.target.files[0];
  }
  onFileSelected_matchesZip(event: any) {
    this.selectedFile_matchesZip = event.target.files[0];
  }

  uploadFile_playerProfile() {
    if (this.selectedFile_playerProfile) {
      this.apiService.uploadCSV_playerProfile(this.selectedFile_playerProfile).subscribe(
        (data) => {
          console.log('Upload successful:', data);
          window.location.reload();
        },
        (error) => {
          console.error('Error uploading file:', error);
        })
        ;
    } else {
      console.error('No file selected.');
    }
  }
  uploadFile_playerProfileInter() {
    if (this.selectedFile_playerProfileInter) {
      this.apiService.uploadCSV_playerProfileInter(this.selectedFile_playerProfileInter).subscribe(
        (data) => {
          console.log('Upload successful:', data);
          window.location.reload();
        },
        (error) => {
          console.error('Error uploading file:', error);
        })
        ;
    } else {
      console.error('No file selected.');
    }
  }
  uploadFile_playerMetrics() {
    if (this.selectedFile_playerMetrics) {
      this.apiService.uploadCSV_playerMetrics(this.selectedFile_playerMetrics).subscribe(
        (data) => {
          console.log('Upload successful:', data);
          // window.location.reload();

        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    } else {
      console.error('No file selected.');
    }

  }
  uploadFile_matches() {
    if (this.selectedFile_matches) {
      this.apiService.uploadCSV_selectedFile_matches(this.selectedFile_matches).subscribe(
        (data) => {
          console.log('Upload successful:', data);
          window.location.reload();

        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    } else {
      console.error('No file selected.');
    }
  }
  uploadFile_matchesJunior() {
    if (this.selectedFile_matchesJunior) {
      this.apiService.uploadCSV_selectedFile_matchesJunior(this.selectedFile_matchesJunior).subscribe(
        (data) => {
          console.log('Upload successful:', data);
          window.location.reload();

        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    } else {
      console.error('No file selected.');
    }
  }
  uploadFile_matchesProfiles() {
    if (this.selectedFile_matchesProfiles) {
      this.apiService.uploadCSV_selectedFile_matchesProfiles(this.selectedFile_matchesProfiles).subscribe(
        (data) => {
          console.log('Upload successful:', data);
          window.location.reload();

        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    } else {
      console.error('No file selected.');
    }
  }
  uploadFile_matchesZip() {
    if (this.selectedFile_matchesZip) {
      this.apiService.uploadCSV_selectedFile_matchesZip(this.selectedFile_matchesZip).subscribe(
        (data) => {
          console.log('Upload successful:', data);

        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    } else {
      console.error('No file selected.');
    }
  }
  SyncMetricsCalculs() {
    // Call the API service method to perform calculations
    this.apiService.performCalculations().subscribe(
      (response) => {
        // Handle the API response here
        console.log('API Response:', response);
        // You can update your component's data or perform other actions based on the API response
      },
      (error) => {
        // Handle any errors that occurred during the API request
        console.error('API Error:', error);
      }
    );
  }
}
