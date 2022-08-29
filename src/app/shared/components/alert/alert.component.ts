import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() design = 'success';

  constructor(private alertService: AlertService) { }

  ngOnInit() {
  }

  get active(){
    return this.alertService.active;
  }
  
  get type(){
    return this.alertService.type;
  }
  
  get title(){
    return this.alertService.title;
  }
  
  get description(){
    return this.alertService.description;
  }


}
