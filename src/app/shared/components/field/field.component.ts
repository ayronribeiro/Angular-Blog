import { Component, OnInit, Input, Output, EventEmitter, Host, Optional, OnDestroy, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { MatSelect } from '@angular/material/select';
import { AlertService } from '../../../services/alert.service';
import { Batch } from '../../../../classes/batch.class';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';


@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
})
export class FieldComponent implements OnInit, OnDestroy {

  firstChange = true;
  form: FormComponent;
  _value: any = undefined;
  _lastValue: any = undefined;
  _mask: any = { mask: /.*/ };

  _focus = false;
  pristine = true;
  opened = false;
  loader = false;
  block = false;
  grab = false;
  slider = null;
  objectUrl = null;
  select = null;
  _options: { text: string | number, value: any }[] | Batch<{ text: string | number, value: any }> = [];
  hidePassword = true;
  drag = null;

  @Input() description = '';
  @Input() placeholder = '';
  @Input() name: string;
  @Input() required: boolean;
  @Input() type: string;
  @Input() disabled = false;
  @Input() border = 0;
  @Input() background = 0;
  @Input() color = 0;
  @Input() design = 'basic';
  @Input() validation: (field?: FieldComponent, form?: FormComponent)=> boolean;
  @Input() max = null;
  @Input() min = null;

  @Input() label = '';

  @ViewChild('slider') set setSliderElement(slider: ElementRef) {
    this.slider = slider ? slider.nativeElement : null;

    let min = this.min || 0;

    const range = (this.max || 1) - min;

    const subtract = this.value - min;

    this.setSlide(subtract / range);
  }

  @ViewChild('expression') set expression(code: CodemirrorComponent) {
    if (code) {
      code.codeMirror.getWrapperElement().classList.add('CodeMirror-expression');
      code.codeMirror.on("beforeChange", function (instance, change) {
        var newtext = change.text.join("").replace(/\n/g, ""); // remove ALL \n !
        change.update(change.from, change.to, [newtext]);
        return true;
      });
    }
  };

  @Output() valueChange = new EventEmitter();
  @Output() change = new EventEmitter();
  @Output() blur = new EventEmitter();

  @Input() set value(val) {
    if (val !== this.value || this.firstChange) {
      this._lastValue = this._value;
      this._value = val;
      if (this.firstChange) {
        this.firstChange = false;
        return;
      }

      if(this.type == 'slider'){
        let min = this.min || 0;
        const range = (this.max || 1) - min;
        const subtract = this.value - min;
        this.setSlide(subtract / range);
      }
    }


    let value = this._value;

    switch (this.type) {
      case 'checkbox': value = this._value ? true : false; break;
      case 'number': value = this._value ? Number(this._value) : this._value; break;
      case 'date': value = this._value ? new Date(this._value) : this._value; break;
    }

    this.valueChange.emit(value);
    this.change.emit(value);
  };

  @Input() set mask(mask) {
    const masks = [];
    if (Array.isArray(mask)) {
      if (mask.length) {
        mask.forEach(((val) => {
          masks.push({ mask: val });
        }));
      } else {
        masks.push({ mask: /.*/ });
      }
    } else {
      switch (mask) {
        case 'number':
          masks.push({
            mask: Number,
            scale: 2,  // digits after point, 0 for integers
            signed: false,  // disallow negative
            thousandsSeparator: ' ',  // any single char
            padFractionalZeros: false,  // if true, then pads zeros at end to the length of scale
            normalizeZeros: true,  // appends or removes zeros at ends
            radix: '.',  // fractional delimiter
            mapToRadix: ['.'],  // symbols to process as radix
            // additional number interval options (e.g.)
            min: -9999999999999999999,
            max: 9999999999999999999
          })
          break;
        case 'integer':
          masks.push({
            mask: Number,
            scale: 0,  // digits after point, 0 for integers
            signed: false,  // disallow negative
            thousandsSeparator: '',  // any single char
            padFractionalZeros: false,  // if true, then pads zeros at end to the length of scale
            normalizeZeros: true,  // appends or removes zeros at ends
            radix: '.',  // fractional delimiter
            mapToRadix: ['.'],  // symbols to process as radix
            // additional number interval options (e.g.)
            min: -9999999999999999999,
            max: 9999999999999999999
          })
          break;
        default:
          masks.push({ mask: /.*/ });
          break;
      }
    }

    this._mask = { mask: masks };
  };

  get mask() {
    return this._mask;
  };

  get value() {
    switch (this.type) {
      case 'checkbox': return this._value ? true : false;
      case 'select': return this._value !== null && this._value !== undefined ? this._value : null;
      case 'hidden': return this._value !== null && this._value !== undefined ? this._value : null;
      case 'file': return this._value !== null && this._value !== undefined ? this._value : null;
      case 'image': return this._value !== null && this._value !== undefined ? this._value : null;
      case 'number': return this._value !== null && this._value !== undefined ? Number(this._value) : null;
      case 'date': return this._value ? new Date(this._value) : this._value;
      default: return this._value !== null && this._value !== undefined ? this._value.toString() : null;
    }
  }



  @ViewChild(MatSelect) set setSelect(select: MatSelect) {
    if (select) {
      this.select = select;
      this.select.openedChange.subscribe(() => this.registerPanelScrollEvent());
    }
  };


  @Input('options') set setOptions(options: { text: string | number, value: any }[] | Batch<{ text: string | number, value: any }>) {
    this._options = options;
    if ((this._options instanceof Batch) && this._options.step == 0) {
      this._options.next();
    }
  };

  get options(): { text: string | number, value: any }[] {
    return this._options instanceof Batch ? this._options.data : this._options;
  }

  url(value){
    if(value){
      if(value instanceof File){
        if(!this.objectUrl){
          this.objectUrl = {obj: value, url: URL.createObjectURL(value)};
        }else{
          if(this.objectUrl.obj != value){
            URL.revokeObjectURL(this.objectUrl.url);
            this.objectUrl = {obj: value, url: URL.createObjectURL(value)};
          }
        }

        return this.objectUrl.url;
      }

      if(typeof value == 'string'){
        return value;
      }
    }else{
      if(this.objectUrl){
        URL.revokeObjectURL(this.objectUrl.url);
        this.objectUrl = null;
      }
    }
    return null;
  }

  registerPanelScrollEvent() {
    if (this.select.panel) {
      const panel = this.select.panel.nativeElement;
      panel.addEventListener('scroll', (event) => {
        const scrollHeight = panel.scrollHeight;
        const offsetHeight = panel.offsetHeight;
        const scrollTop = panel.scrollTop;
        if (scrollTop >= (scrollHeight - offsetHeight)) {
          if (this._options instanceof Batch) {
            this._options.next();
          }
        }
      });

    }
  }

  private globals = {
    'mousemove': (event) => {
      this.ngZone.runOutsideAngular(() => {
        if (this.drag) {
          const mouse = { x: event.clientX, y: event.clientY };
          let val = (mouse.x - this.drag.x) / this.drag.width;
          if (val > 1) val = 1;
          if (val < 0) val = 0;
          let min = this.min || 0;
          const range = (this.max || 1) - min;
          this.drag.value = min + (val * range);
          this.setSlide(val);
        }
      });
    },
    'mouseup': (event) => {
      if (this.drag) {
        this.ngZone.run(() => {
          this.value = this.drag.value;
          this._focus = false
          this.pristine = false;
          this.blur.emit(event);
          this.drag = null;
        });

      }
    },
  }


  constructor(private element: ElementRef, private alertService: AlertService, private ngZone: NgZone) {


  }

  revert(){
    this.value = this._lastValue;
  }

  startGrab(event, bar) {
    this._focus = true;
    const box = bar.getBoundingClientRect();
    this.drag = { x: box.left, y: event.clientY, width: box.width , value: this.value};
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      for (let event in this.globals) {
        window.addEventListener(event, this.globals[event]);
      }
    });
    setTimeout(() => {
      const formElement = this.element.nativeElement.closest('app-form');
      const obj = FormComponent.forms.find((f) => {
        return f.element == formElement;
      });

      if (obj) {
        this.form = obj.component;
        this.form.add(this);
      }
    });
  }

  setSlide(val){
    this.ngZone.runOutsideAngular(() => {
      let value = val;
      if(value > 1) value = 1;
      if(value < 0 ) value = 0;
      if(this.slider)this.slider.style.left = ((value || 0) * 100) + '%';
    });
  }

  get error() {
    if (this.disabled) return null;

    if (this.value === undefined || this.value === null || this.value === '') {
      if (this.required) {
        return 'required';
      }
    } else {
      if (this.validation) {
        try{
          if (!this.validation(this, this.form)) {
            return 'invalid';
          };
        }catch(err){
          return 'invalid';
        }
      }

      if (this.max !== null && !isNaN(this.max)) {
        switch (this.type) {
          case 'file': if (this.value instanceof File && this.value.size > Number(this.max)) { return 'max:file' } break;
          case 'date': if (this.value.getTime() > new Date(this.max).getTime()) { return 'max:date' } break;
          case 'number': if (Number(this.value) > Number(this.max)) { return 'max:number' } break;
          default: if (this.value.length > this.max) return 'max:string';
        }
      }

      if (this.min !== null && !isNaN(this.min)) {
        switch (this.type) {
          case 'file': if (this.value instanceof File && this.value.size < Number(this.min)) { return 'min:file' } break;
          case 'date': if (this.value.getTime() < new Date(this.min).getTime()) { return 'min:date' } break;
          case 'number': if (Number(this.value) < Number(this.min)) { return 'min:number' } break;
          default: if (this.value.length < this.min) return 'min:string';
        }
      }
    }

    return null;
  }

  ngOnDestroy(): void {
    if (this.form) {
      this.form.remove(this);
    }

    for (let event in this.globals) {
      window.removeEventListener(event, this.globals[event]);
    }

    if(this.objectUrl){
      URL.revokeObjectURL(this.objectUrl.url);
      this.objectUrl = null;
    }

  }


  get text() {
    return this.options.find((option) => {
      return option.value == this.value;
    })?.text || '';

  }

  copy(input) {
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");
    input.setSelectionRange(0, 0);
    this.alertService.success(`Texto copiado.`, `O texto foi copiado para a sua área de transferência.`);
  }

  setFile($event) {
    this.value = $event.target.files[0] || null;
  }


  date(date) {
    if (!date) return null;
    return new Date(date);
  }

  setPristine($event) {
    if (this.opened) {
      this.pristine = false;
      this.opened = false;
      this.blur.emit($event);
    } else {
      this.opened = true;
    }
  }


clear(){
  this.value = null;
  this.pristine = true;
}


focus(){
  const element = this.element.nativeElement.querySelector('input, textarea');
  if(element){
    element.focus();
  }
}

}
