import { Injectable } from '@angular/core';
import axios, {AxiosResponse} from 'axios';
import {ApiResponse} from "../models/api-response.model";
import {Character} from "../models/character.model";

@Injectable({
  providedIn: 'root'
})
export class RickandmortyService {

  private apiUrl:string = 'https://rickandmortyapi.com/api/character';

  constructor() { }

  async getCharacters(page: number = 1, name: string = ''): Promise<ApiResponse | null> {
    try {
      console.log(`Poziv API-ja: ${this.apiUrl}?page=${page}&name=${name}`);
      const response: AxiosResponse<ApiResponse> = await axios.get(`${this.apiUrl}?page=${page}&name=${name}`);
      console.log('API odgovor:', response.data);
      return response.data;
    } catch (error: unknown) {
      console.error('Greška pri preuzimanju podataka:', error);
      return null;
    }
  }
  async getCharacterById(id: number): Promise<Character | null> {
    try {
      const response: AxiosResponse<Character> = await axios.get(`${this.apiUrl}/${id}`);
      return response.data;
    } catch (error: unknown) {
      console.error(`Greška pri preuzimanju lika sa ID ${id}:`, error);
      return null;
    }
  }

}
