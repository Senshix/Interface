// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map ,flatMap} from 'rxjs/operators';

type MetricsData = Record<string, Record<string, number>>;


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:5038';
  private apiImageUrl = 'https://interface.myteambyfrmf.ma/uploads/datahub/';

  constructor(private http: HttpClient) {}

 // api.service.ts  
 uploadCSV_playerProfile(file: File): Observable<any> {
  const formData = new FormData();
  formData.append('csvFile', file);
  return this.http.post<any>(`${this.apiUrl}/upload-csv/playerProfile`, formData);
}
uploadCSV_playerMetrics(file: File): Observable<any> {
  const formData = new FormData();
  formData.append('csvFile', file);
  return this.http.post<any>(`${this.apiUrl}/upload-csv/playerMetrics`, formData);
}
uploadCSV_selectedFile_matches(file: File): Observable<any> {
  const formData = new FormData();
  formData.append('csvFile', file);
  return this.http.post<any>(`${this.apiUrl}/upload-csv/matches`, formData);
}
uploadCSV_selectedFile_matchesProfiles(file: File): Observable<any> {
  const formData = new FormData();
  formData.append('csvFile', file);
  return this.http.post<any>(`${this.apiUrl}/upload-csv/matchesProfiles`, formData);
}
uploadCSV_selectedFile_matchesZip(file: File): Observable<any> {
  const formData = new FormData();
  formData.append('zipFile', file);
  return this.http.post<any>(`${this.apiUrl}/upload-xlsx/Matches`, formData);
}
getData() {
  return this.http.get<any>(`${this.apiUrl}/players`).pipe(
    map((data: any) => {
      // Assuming the response structure is an array
      return data.flatMap((player: any) => player.Joueurs.map((individualPlayer: any) => individualPlayer["Informations personnelles"]));
    })
  );
}
updateData(updatedData: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/update-player`, updatedData);
}
getMetricsVar(){
  return this.http.get<any>(`${this.apiUrl}/get-csv/MetricsVar`);
}
updateMetricsVar(newData: MetricsData): Observable<any> {
  const url = `${this.apiUrl}/get-csv/MetricsVar`;
  return this.http.put(url, newData);
}
}
