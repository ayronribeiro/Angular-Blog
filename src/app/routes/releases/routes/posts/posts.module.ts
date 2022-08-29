import { RouterModule } from '@angular/router';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';



@NgModule({
  declarations: [PostsComponent],
  imports: [
    CommonModule,
    SharedModule,
    CodemirrorModule,
    RouterModule.forChild([
      {
        path: '', component: PostsComponent, children: [
        ]
      },
    ])
  ],
})
export class PostsModule { }
