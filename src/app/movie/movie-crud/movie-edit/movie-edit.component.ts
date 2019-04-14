import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/movie.service';

import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/app.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  currentMovie: any;
  constructor(public router: Router, public _router: ActivatedRoute, public movieService: MovieService,
    public modal: NgbModal, public AppService: AppService,
     public toastr: ToastrService) {

    console.log("inside movie edit")
    

  }


  public movieName: string;
  public startAt: Date;

  public rating: Number;
  public releaseDate: Date;
  public directors: Array<any>;
  public tempDirectors: String;
  

  ngOnInit() {

    let myMovieId = this._router.snapshot.paramMap.get('movieId');
    console.log(myMovieId);

    // this.getAllUsers();
    this.movieService.getSingleMovie(myMovieId).subscribe(
      apiResponse => {
        console.log(apiResponse);
        this.currentMovie = apiResponse.data;
        this.tempDirectors = this.currentMovie[0].directors.join(',');

        const date = new Date(this.currentMovie[0].releaseDate);
        this.currentMovie[0].releaseDate = date.toISOString().substring(0, 10);
        //this.currentMovie[0].releaseDate = `${date.getFullYear()}-${(date.getMonth()+1)}-${date.getDate()}`;

        console.log("current movie is : ");
        console.log(this.currentMovie);
      }, error => {

        console.log("some error occured");
        this.toastr.error("some error occured : ", error.errorMessage)

      }

    )

  }

  public editMovie: any = () => {
    this.currentMovie[0].directors = this.tempDirectors.split(',');
    this.movieService.updateMovie(this.currentMovie[0].movieId, this.currentMovie[0]).subscribe(
      data => {
        console.log(data);
        this.toastr.success("Movie updated successfully");
        
        setTimeout(() => {
          this.router.navigate(['/movies/view', this.currentMovie[0].movieId]);
        }, 1000)
      },
      error => {
        console.log("some error occured");
        this.toastr.error("Error : ", error.message);
      }

    )

  }//edit movie

}
