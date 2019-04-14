import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/movie.service';

import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cookie } from 'ng2-cookies/ng2-cookies';





@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent implements OnInit {


  constructor(public router: Router, public _router: ActivatedRoute, public movieService: MovieService,
    public modal: NgbModal,
    public toastr: ToastrService) {
  }

  public movieName: string;
  public startAt: Date;

  public rating: Number;
  public releaseDate: Date;
  public directors: Array<any>;
  public tempDirectors: String;
  
  ngOnInit() {

    
  }//oninit
  
  public addMovie: any = () => {

    this.directors = this.tempDirectors.split(",");
      let movieData = {
        movieName: this.movieName,
        rating: this.rating,
        releaseDate: this.releaseDate,
        directors: this.directors
      }

      //    console.log("user selected: " + this.userDetailsViaEmail)
      console.log(movieData);

      this.movieService.addMovie(movieData).subscribe(

        apiResponse => {
          if (apiResponse.status === 200) {

            console.log("Movie added successfully and user been notified")
            this.toastr.success("Movie added successfully and user been notified");
            setTimeout(() => {
              this.router.navigate(['movies/all']);
            }, 1000)
          }
        },
        error => {
          console.log(error.errorMessage);
          this.toastr.error('Some error occurred', error.errorMessage);
        }

      )
  }//get add movie
}
