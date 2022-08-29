import { PostsComponent } from './../posts/posts.component';
import { PostComponent } from './post.component';
import { RouterModule } from '@angular/router';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';




@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    CodemirrorModule,
    RouterModule.forChild([
      {
        path: '', component: PostComponent, children: [
        ]
      },
    ])
  ],
})
export class PostModule { }
