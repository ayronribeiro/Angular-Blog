import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MoneyPipe } from './pipes/money.pipe';
import { CarouselDirective } from './directives/carousel.directive';
import { CarouselItemDirective } from './directives/carousel-item.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { SafePipe } from './pipes/safe.pipe';
import { DraggableDirective } from './directives/draggable.directive';
import { BytesPipe } from './pipes/bytes.pipe';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabComponent } from './components/tab/tab.component';
import { ContainerComponent } from './components/container/container.component';
import { PhonePipe } from './pipes/phone.pipe';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { ShortNumberPipe } from './pipes/short-number.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { FormComponent } from './components/form/form.component';
import { FieldComponent } from './components/field/field.component';
import { AllowedDirective } from './directives/allowed.directive';
import {IMaskModule} from 'angular-imask';
import { IconComponent } from './components/icon/icon.component';
import { OverlayComponent } from './components/overlay/overlay.component';
import { TextComponent } from './components/text/text.component';
import { OverlayAreaComponent } from './components/overlay-area/overlay-area.component';
import { ShortTimePipe } from './pipes/short-time.pipe';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { AlertComponent } from './components/alert/alert.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ModalComponent } from './components/modal/modal.component';
import { ContentComponent } from './components/content/content.component';
import {MatIconModule} from '@angular/material/icon';
import { RemarkPipe } from './pipes/remark.pipe';

@NgModule({
  declarations: [
    MoneyPipe,
    CarouselDirective,
    CarouselItemDirective,
    ButtonComponent,
    SafePipe,
    DraggableDirective,
    BytesPipe,
    TabsComponent,
    TabComponent,
    ContainerComponent,
    PhonePipe,
    ShortNumberPipe,
    FormComponent,
    FieldComponent,
    AllowedDirective,
    IconComponent,
    OverlayComponent,
    TextComponent,
    OverlayAreaComponent,
    ShortTimePipe,
    AlertComponent,
    LoaderComponent,
    ModalComponent,
    ContentComponent,
    RemarkPipe
  ],
  exports: [
    MoneyPipe,
    CarouselDirective,
    CarouselItemDirective,
    ButtonComponent,
    SafePipe,
    DraggableDirective,
    BytesPipe,
    TabsComponent,
    TabComponent,
    ContainerComponent,
    PhonePipe,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    ShortNumberPipe,
    MatNativeDateModule,
    NgxMaskModule,
    FormComponent,
    FieldComponent,
    AllowedDirective,
    IconComponent,
    OverlayComponent,
    TextComponent,
    OverlayAreaComponent,
    ShortTimePipe,
    AlertComponent,
    LoaderComponent,
    ModalComponent,
    ContentComponent,
    RemarkPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    IMaskModule,
    CodemirrorModule,
    MatIconModule,
    NgxMaskModule.forRoot()
  ]
})

export class SharedModule { }


