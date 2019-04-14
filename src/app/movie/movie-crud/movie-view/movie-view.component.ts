import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { MovieService } from 'src/app/movie.service';
import { Location } from '@angular/common';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.css'],
  providers: [Location]
})
export class MovieViewComponent implements OnInit {

  public currentMovie;

  constructor(private _route: ActivatedRoute, private router: Router, private appService: AppService,
    private movieService: MovieService, private location: Location, public toastr: ToastrService) { }

  ngOnInit() {

    let myMovieId = this._route.snapshot.paramMap.get('movieId');
    console.log(myMovieId);

    this.movieService.getSingleMovie(myMovieId).subscribe(
      apiResponse => {
        this.currentMovie = apiResponse.data[0]
        console.log(this.currentMovie);
      },
      error => {
        console.log('some error occured');
        this.toastr.error(error.errorMessage);
      }
    )
  }//oninit

  deleteThisMovie(): any {
    console.log(this.currentMovie);
    this.movieService.deleteMovie(this.currentMovie.movieId).subscribe(
      data => {
        console.log(data);
        console.log('Movie Deleted successfully');
        this.toastr.success('Movie Deleted successfully and user notified');
        setTimeout(() => {
          this.router.navigate(['/movies/all']);
        }, 1000)
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
        this.toastr.error('some error occured', error.errorMessage);

      }
    )
  }// end delete this deleteThisMovie 

  goBackToPreviousPage(): any {
    this.location.back();
  }//going back


}

