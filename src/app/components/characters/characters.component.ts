import {Component, HostListener} from '@angular/core';
import {Character} from "../../models/character.model";
import {Router, RouterModule, RouterOutlet} from "@angular/router";
import {RickandmortyService} from "../../services/rickandmorty.service";
import {NgForOf} from "@angular/common";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    NgForOf,CommonModule,RouterModule
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css'
})
export class CharactersComponent {
  characters: Character[] = [];
  page : number = 1;
  searchQuery: string = '';
  isLoading: boolean = false;

  constructor(private router: Router , private rickAndMortyService : RickandmortyService ) { }

  ngOnInit():void{
    this.loadCharacters();
  }

  async loadCharacters(): Promise<void> {
    if (this.isLoading) return ;
    this.isLoading = true;
    console.log('Učitavanje podataka...');  // Log pre slanja zahteva
    const data = await this.rickAndMortyService.getCharacters(this.page,this.searchQuery);
    console.log('Podaci primljeni:', data);  // Log nakon što API vrati podatke
    if (data && data.results){
      this.characters = [...this.characters , ...data.results];
      this.page++;
    }
    this.isLoading = false;
  }

  onSearch(event:Event):void{
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value;
    this.page =1;
    this.characters = [];
    this.loadCharacters();
  }

  onScroll(event: Event): void {
    const scrollDiv = event.target as HTMLElement;
    if (scrollDiv.scrollTop + scrollDiv.clientHeight >= scrollDiv.scrollHeight - 10) {
      this.loadCharacters();
    }
  }

  goToCharacterDetails(id:number):void{
    this.router.navigate(['/character',id]);
  }

}
