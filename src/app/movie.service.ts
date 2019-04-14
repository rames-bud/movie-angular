import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';

//import observable related code (as per version 6)
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  public baseUrl = 'http://localhost:3000';
  private authToken = "c2VjdXJlbW92aWU=";

  constructor(public _http: HttpClient) {
    
  }//end constructor


  public userDetails = JSON.parse(localStorage.getItem('userInfo'));


  //exceptional handler
  private handleError(err: HttpErrorResponse) {
    console.log('Handle error http calls');
    console.log(err.message);
    return Observable.throw(err.message);
  } 

  public getAllMovies = (): any => {
    let myResponse = this._http.get(`${this.baseUrl}/getMovie/all`);
    console.log(myResponse);
    return myResponse;
  } 

  public getSingleMovie = (currentMovieId): any => {
    let myResponse = this._http.get(`${this.baseUrl}/getMovie/${currentMovieId}`)
    return myResponse;
  }//get Single getSingleMovie info
  
  public addMovie = (details): any => {
    let myResponse = this._http.post(`${this.baseUrl}/addMovie`, details);
    return myResponse;
  }//addMovie

  public updateMovie = (currentMovieId, details): any => {
    let myResponse = this._http.put(`${this.baseUrl}/editMovie/${currentMovieId}`, details);
    return myResponse;
  } //updateMovie

  public deleteMovie = (movieId): any => {
    let data = {}
    let myResponse = this._http.post(`${this.baseUrl}/deleteMovie/${movieId}`, data);
    return myResponse;
  }//deleteMovie
}//end class
