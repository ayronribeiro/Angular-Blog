import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private apiService:ApiService) { }
  async get(params) {
    const response=await this.apiService.request("pages","get",{params:params});
    if(response.status !=200) throw await response.content;
    return await response.content;
  }
}
