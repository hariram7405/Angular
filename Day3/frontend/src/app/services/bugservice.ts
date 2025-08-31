import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export interface Bug {
  id: number;
  title: string;
  description: string;
  status: string;
  createdOn: Date;
  projectId: number;
}

@Injectable({ providedIn: "root" })
export class BugService {
  private apiURL = "https://localhost:7028/api/Bug";

  constructor(private http: HttpClient) {}

  getBugs(): Observable<Bug[]> {
    return this.http.get<Bug[]>(this.apiURL).pipe(
      catchError((err) => {
        console.error("Error fetching bugs", err);
        return throwError(() => new Error("Failed to load bugs"));
      })
    );
  }
}
