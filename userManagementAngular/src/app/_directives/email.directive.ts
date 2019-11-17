import { Directive, HostListener, ElementRef, Input } from '@angular/core';
@Directive({
  selector: '[specialIsEmail]'
})

export class EmailDirective {

    regexStr = '^[A-Za-z0-9._@]*$';
    @Input() isEmail: boolean;
  
    constructor(private el: ElementRef) { }
  
    @HostListener('keypress', ['$event']) onKeyPress(event) {
      return new RegExp(this.regexStr).test(event.key);
    }
  
    @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
      this.validateFields(event);
    }
  
    validateFields(event) {
      setTimeout(() => {
  
        this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z0-9._%@]/g, '').replace(/\s/g, '');
        event.preventDefault();
  
      }, 100)
    }
  
  }

