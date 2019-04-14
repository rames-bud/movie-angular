import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, Time } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Subject } from 'rxjs';
import * as moment from 'moment';

import { Cookie } from 'ng2-cookies/ng2-cookies';
import { MovieService } from 'src/app/movie.service';
import { ToastrService } from 'ngx-toastr';






@Component({
  selector: 'app-movie-crud',
  templateUrl: './movie-crud.component.html',
  styleUrls: ['./movie-crud.component.css']
})
export class MovieCrudComponent implements OnInit {

  public allMovies;


  constructor(public router: Router, public _router: ActivatedRoute, public movieService: MovieService, public modal: NgbModal,
    public toastr: ToastrService) { }
  
  
  ngOnInit() {
    this.getAllMovies();
  }

  public getAllMovies = () => {

    this.allMovies = this.movieService.getAllMovies().subscribe(
      apiResponse => {
        console.log(apiResponse);
        if (apiResponse.status == 200) {
          this.allMovies = apiResponse.data;

        } else if (apiResponse.status == 400){
          this.toastr.error(apiResponse.message);
        }
        else {
          this.toastr.error("Movies not found");
        }
      },
      error => {
        console.log('some error occurred');
        this.toastr.error(error.errorMessage);

      }

    )
  }


  public addMovie = () => {
    this.router.navigate(['movies/add'])
  }
  
  



}



