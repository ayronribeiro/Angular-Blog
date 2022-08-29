import { ApiService } from './../../../../services/api.service';
import { PostService } from './../../../../services/post.service';
import {
  Route,
  ActivatedRoute,
  Router,
  NavigationExtras,
} from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts = [];
  page = null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (this.page == paramMap.get('page')) return;
      this.page = paramMap.get('page');
      this.posts = [];
      this.postService
        .find({
          'filters[page][name][$eq]': this.page,
          populate: '*',
          sort: 'date:desc',
        })
        .then((postsResult) => {
          this.posts = postsResult.data;
        });
    });
  }

  routeToPost(post: any) {
    const navExtras: NavigationExtras = {
      state: post,
    };

    this.router.navigate([`${this.page}/post/` + post.id], navExtras);
  }

  getUrl(url: string) {
    return this.postService.getUrl(url);
  }
}
