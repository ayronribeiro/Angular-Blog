import { ApiService } from './../../services/api.service';
import { PostService } from './../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { PageService } from './../../services/page.service';
import { Component, OnInit } from '@angular/core';
import { remark } from 'remark'
import remarkHtml from 'remark-html'

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.scss'],
})
export class ReleasesComponent implements OnInit {

  page=null
  constructor(private pageService:PageService, private apiService:ApiService, private postService:PostService, private route:ActivatedRoute) {}
  reloadPosts(){


  }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      if (this.page?.attributes?.name == paramMap.get("page")) return;
      this.pageService.get({"filters[name][$eq]":paramMap.get("page")}).then((result)=>{
      this.page=result.data[0]
      })
  })
  }

}
