import { Component, ContentChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  url_one : string = "https://api.themoviedb.org/3/search/movie?api_key=";
  token : string = "b09cf43a0ed2b21773ecc1e9f71d4a90";
  url_two : string = "&language=en-US&query=";
  query ?: string;
  url_three : string = "&page=1&include_adult=false"

  filmArray ?: any;
  film ?: any;

  constructor(){  }

  public searchFilms(event: Event) {
    let input = (<HTMLInputElement>document.getElementById("search")).value;
    this.searchTitle(input);
  }

  public async searchTitle(input: string){
    let res = await fetch(this.url_one + this.token + this.url_two + input + this.url_three)
    let parsed = await res.json();
    this.getFilms(parsed.results);
  }

  public getFilms(json: any){
    this.filmArray = [];
    json.forEach((element: any) => {
      this.filmArray?.push(element);
    });
  }

  public clickedFilm(event: Event, i: number){
    let output = (<HTMLInputElement>document.getElementById("div_details"));
    output.innerHTML = `
      <p>${this.filmArray[i].title}</p>
      <p>${this.filmArray[i].release_date}</p>
      <p>${this.filmArray[i].original_language}</p>
      <p>${this.filmArray[i].overview}</p>
      <p class="average">${this.filmArray[i].vote_average}</p>
    `;
    
  }
}
