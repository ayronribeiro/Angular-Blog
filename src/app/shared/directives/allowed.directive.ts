import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Directive({
  selector: '[allowed]'
})
export class AllowedDirective {

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private router: Router, private authService: AuthService) {
  }

  @Input() set allowed(allowed: string | string[]) {
    if (this.authService.isAllowed(allowed)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
