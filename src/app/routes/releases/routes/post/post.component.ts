import { ApiService } from './../../../../services/api.service';
import { PostService } from './../../../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post = null;
  postExtras: { url: string; tags: any[] } = null;
  tags: any = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private apiService: ApiService
  ) {
    if (this.router.getCurrentNavigation()?.extras?.state) {
      const postAttributes =
        this.router.getCurrentNavigation().extras.state['attributes'];

      this.postExtras = {
        url: this.getUrl(postAttributes['image']['data']['attributes']['url']),
        tags: postAttributes['tags']['data'],
      };
      console.log('post IMAGE!', this.postExtras);
    }
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async (paramMap) => {
      console.log(paramMap);

      if (!this.postExtras) {
        await this.postService
          .find({
            'filters[page][name][$eq]': paramMap.get('page'),
            populate: '*',
            sort: 'date:desc',
          })
          .then((postsResult: { data: any[]; meta: Object }) => {
            const postAttributes = postsResult?.data?.filter(
              (post) => post.id == paramMap.get('post')
            )[0]['attributes'];

            this.postExtras = {
              url: this.getUrl(
                postAttributes['image']['data']['attributes']['url']
              ),
              tags: postAttributes['tags']['data'],
            };

            console.log('GET postExtras', this.postExtras);
          });
      }

      this.getPostInfo(paramMap);
    });
  }

  async getPostInfo(paramMap) {
    console.log('PostWithImage -> ', this.postExtras);

    if (this.post?.attribute.id == paramMap.get('post')) return;

    await this.postService.get(paramMap.get('post')).then((postsResult) => {
      this.post = postsResult.data;
    });
  }

  getUrl(url: string) {
    return this.postService.getUrl(url);
  }
}
