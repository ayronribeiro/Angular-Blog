import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private apiService: ApiService) {}

  async find(params) {
    const response = await this.apiService.request('posts', 'get', {
      params: params,
    });

    if (response.status != 200) throw response.content;

    return response.content;
  }

  async get(id) {
    const response = await this.apiService.request('posts/' + id, 'get');

    if (response.status != 200) throw response.content;

    return response.content;
  }

  getUrl(path) {
    return this.apiService.baseUrl + path;
  }
}
