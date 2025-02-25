import {Component, OnInit} from '@angular/core';
import {Character} from "../../models/character.model";
import {ActivatedRoute, Router} from "@angular/router";
import {RickandmortyService} from "../../services/rickandmorty.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.css'
})
export class CharacterDetailComponent implements OnInit{
  character: Character| null = null;
  isLoading: boolean = true;
  limitedEpisodes: string[] = [];

  constructor(private route :ActivatedRoute,private apiService : RickandmortyService,private router:Router) {
  }

  goBack(){
    this.router.navigate(['/']);
  }
  async ngOnInit(): Promise<void> {
    this.isLoading = true;

    const id: string | null = this.route.snapshot.paramMap.get('id');

    if (id) {
      try {
        const characterData = await this.apiService.getCharacterById(+id);

        if (characterData) {
          this.character = characterData;
          this.limitedEpisodes = characterData.episode.slice(0, 8);
        } else {
          console.warn(`Karakter sa ID ${id} nije pronađen.`);
        }
      } catch (error) {
        console.error("Greška pri dobijanju podataka karaktera:", error);
      }
    } else {
      console.warn("ID karaktera nije prosleđen u URL-u.");
    }

    this.isLoading = false;
  }



}
