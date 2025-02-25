import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class RickandmortyService {

  private apiUrl:string = 'https://api.rickandmortyapi.com/character';

  constructor() { }
}
