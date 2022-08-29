import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Auth } from './auth';
import { MAT_DATE_LOCALE } from '@angular/material/core';



@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        SharedModule,
        HttpClientModule,
        RouterModule.forRoot([
            {
                path: ':page', loadChildren: () => import('./routes/releases/releases.module').then(m => m.ReleasesModule),
            },
            { path: '', redirectTo: 'news', pathMatch: 'full' },
            { path: '**', redirectTo: 'news', pathMatch: 'full' },
        ], {
            paramsInheritanceStrategy: 'always',
            enableTracing: false
        })
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
        Auth
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
