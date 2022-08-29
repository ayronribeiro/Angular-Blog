import { Component, OnInit, Output, EventEmitter, Input, ElementRef, OnDestroy } from '@angular/core';
import { FieldComponent } from '../field/field.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {

  static forms = [];

  @Input() disabled = false;

  @Output() submit = new EventEmitter;



  private fields: FieldComponent[] = [];


  get valid() {
    for (let field of this.fields) {
      if (field.error) return false;
    }
    return true;
  }

  add(field: FieldComponent) {
    setTimeout(() => {
      this.remove(field);
      this.fields.push(field);
    });
  }

  field(name:string){
    return this.fields.find((field)=>{
      return name == field.name;
    }) || null;
  }

  remove(input: FieldComponent) {
    const index = this.fields.indexOf(input);
    if (index > -1) {
      this.fields.splice(index, 1);
    }
  }

  constructor(private elementRef: ElementRef) {
    FormComponent.forms.push({ element: elementRef.nativeElement, component: this });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    const index = FormComponent.forms.findIndex((f) => {
      return f.element == this.elementRef.nativeElement;
    });

    FormComponent.forms.splice(index, 1);
  }


  reset() {
    this.fields.forEach(field => {
      field.value = null;
    });
  }

  get value(): any{
    const data = {};

    this.fields.forEach(field => {
      if (field.name && !field.disabled) {
        const keys = field.name.split('.');
        let obj = data;
        keys.forEach((key, i) => {
          if (i == keys.length - 1) {
            switch (field.type) {
              case 'file': case 'image':
                if (field.value) {
                  if (field.value instanceof File) obj[key] = field.value;
                } else {
                  obj[key] = null;
                }
                break;
              case 'date':
                obj[key] = field.value?.toISOString() || null;
                break;
              default:
                obj[key] = field.value;
                break;
            }
          } else {
            if (!obj[key]) {
              const next = keys[i + 1];
              if (Number.isNaN(Number(next))) {
                obj[key] = {};
              } else {
                obj[key] = []
              }
            }
            obj = obj[key];
          }
        });
      }
    });

    return data;
  }

  emit(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.disabled) return;
    this.submit.emit(this.value);
  }

  clear(){
    this.fields.forEach(field => {
      field.clear();
    });
  }

}
