import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';






import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { MovieCrudComponent } from './movie-crud/movie-crud.component';
import { MovieCreateComponent } from './movie-crud/movie-create/movie-create.component';
import { MovieEditComponent } from './movie-crud/movie-edit/movie-edit.component';
import { MovieViewComponent } from './movie-crud/movie-view/movie-view.component';


import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [MovieCrudComponent, MovieCreateComponent, MovieEditComponent, MovieViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    RouterModule.forChild([
      { path: 'movies/all', component: MovieCrudComponent },
      { path: 'movies/view/:movieId', component: MovieViewComponent },
      { path: 'movies/add', component: MovieCreateComponent },
      { path: 'movies/edit/:movieId', component: MovieEditComponent },


    ])
  ]
})
export class MovieModule { }
