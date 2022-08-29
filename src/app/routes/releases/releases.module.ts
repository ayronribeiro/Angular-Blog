import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { ReleasesComponent } from './releases.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import * as CodeMirror from 'codemirror';




@NgModule({
  declarations: [ReleasesComponent],
  imports: [
    CommonModule,
    SharedModule,
    CodemirrorModule,
    RouterModule.forChild([
      {
        path: '', component: ReleasesComponent, children: [
          {
            path: 'post/:post', loadChildren: () => import('./routes/post/post.module').then(m => m.PostModule),
         },
         {
            path: 'posts', loadChildren: () => import('./routes/posts/posts.module').then(m => m.PostsModule),
         },
         { path: '', redirectTo: 'posts', pathMatch: 'full' },
         { path: '**', redirectTo: 'posts', pathMatch: 'full' },
        ]
      },
    ])
  ],
  providers: []

})
export class ReleasesModule { }
