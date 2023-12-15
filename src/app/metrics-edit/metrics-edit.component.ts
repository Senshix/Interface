// metrics-edit.component.ts

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {MatSliderModule} from '@angular/material/slider';


export interface MetricsData {
  positionWeights: Record<string, Record<string, number>>;
  positionIndexWeights: Record<string, number>;
  [key: string]: any; // Index signature for string
  // Add other properties as needed
}
@Component({
  selector: 'app-metrics-edit',
  templateUrl: './metrics-edit.component.html',
  styleUrls: ['./metrics-edit.component.css']
})

export class MetricsEditComponent implements OnInit {
  options: string[] = [];
  positionIndexWeights: Record<string,number> = {};
  positionWeights: Record<string, Record<string,number>> = {};
  newPositionWeights:any;
  newPositionIndexWeights: any;
  isActive_Position: boolean = false;
  isActive_PositionIndex: boolean = false;
  navBar:boolean = false;
  isActive_Edit: boolean = true;
  positionWeight_div: boolean = false;
  positionIndexWeight_div: boolean = false;
  isActive_Submit:boolean =false;
  selectedPosition: string | null = null;
  selectedPositionIndex:string | null = null;
  positionWeightKeys: string[] = [];
  positionIndexWeightKeys: string[] = [];
  innerProp: { key: string; value: number } = { key: '', value: 0 };
  step: number = 0.05;



  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchMetricsData();
  }

  fetchMetricsData() {
    this.apiService.getMetricsVar().subscribe((data) => {
      this.positionIndexWeights = data.position_index_weights || {};
      this.positionWeights = data.position_weights || {};
      this.positionWeightKeys = Object.keys(this.positionWeights);
      this.positionIndexWeightKeys = Object.keys(this.positionWeights);
    });
  }

  showPosition() {
    this.positionIndexWeight_div = this.isActive_PositionIndex=false;
    this.positionWeight_div =this.isActive_Position= true;
    this.isActive_Submit= false ;

    this.selectedPosition = null; // Reset selected position when switching views
  }

  showPositionIndex() {
    this.positionIndexWeight_div =this.isActive_PositionIndex= true;
    this.positionWeight_div = this.isActive_Position= false;
    this.isActive_Submit= false ;

    this.selectedPosition = null; // Reset selected position when switching views
  }
  showNav(){
    this.positionIndexWeight_div = this.isActive_PositionIndex=false;
    this.positionWeight_div = this.isActive_Position= false;
    this.isActive_Submit= false ;

    this.navBar=!this.navBar;
  }
handleKey(event: KeyboardEvent): void {
    // Prevent typing into the input
    event.preventDefault();
    // Handle arrow key events
    if (event.key === 'ArrowUp') {
      this.innerProp.value += this.step;
    } else if (event.key === 'ArrowDown') {
      this.innerProp.value -= this.step;
    }
  }
  handleValueChange(value: string, innerProp: { key: any }, prop: { key: any }, selectedPosition: any) {
    this.newPositionWeights = JSON.parse(JSON.stringify(this.positionWeights));
    const propKey = prop.key;
    const innerPropKey = innerProp.key;
    // Check if the value is different before updating
    if (value !== this.newPositionWeights[selectedPosition]?.[propKey]?.[innerPropKey]) {
      this.newPositionWeights[selectedPosition] = this.newPositionWeights[selectedPosition] || {};
      this.newPositionWeights[selectedPosition][propKey] = this.newPositionWeights[selectedPosition][propKey] || {};
      this.newPositionWeights[selectedPosition][propKey][innerPropKey] = parseFloat(value);
      this.isActive_Submit = true;
    } else {
      this.isActive_Submit = false;
    }
  
    console.log(value);
  }
  handleValueChangeIndex(value:number,prop:{key:string},selectedPositionIndex:any){
    this.newPositionIndexWeights = JSON.parse(JSON.stringify(this.positionIndexWeights));
    const propKey = prop.key;
    if (value !== this.newPositionIndexWeights[selectedPositionIndex]?.[propKey]){
      this.newPositionIndexWeights[selectedPositionIndex] = this.newPositionIndexWeights[selectedPositionIndex] || {};
      this.newPositionIndexWeights[selectedPositionIndex][propKey] = this.newPositionIndexWeights[selectedPositionIndex][propKey] || {};
      this.newPositionIndexWeights[selectedPositionIndex][propKey] = (value);
      this.isActive_Submit = true;
    }
    else{
      this.isActive_Submit = false;

    }
    console.log(value);
  }
  onSubmit() {
    const newData: MetricsData = {
      positionWeights: this.newPositionWeights || {}, // Default to an empty object if undefined
      positionIndexWeights: this.newPositionIndexWeights || {}, // Default to an empty object if undefined
    };
  
    // Perform any necessary updates to newData before submission
  
    this.apiService.updateMetricsVar(newData).subscribe(
      (response) => {
        console.log('Metrics data updated successfully:', newData);
        // Optionally, update your local data after a successful API update
        this.positionWeights = newData.positionWeights;
        this.positionIndexWeights = newData.positionIndexWeights;
      },
      (error) => {
        console.error('Error updating metrics data:', error);
        // Handle the error as needed
      }
    );
  }
  
}
