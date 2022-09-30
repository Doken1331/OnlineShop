import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {

  submitted = false;
  form!: UntypedFormGroup;

  constructor() { }

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      type: new UntypedFormControl(null, Validators.required),
      title: new UntypedFormControl(null, Validators.required),
      photo: new UntypedFormControl(null, Validators.required),
      info: new UntypedFormControl(null, Validators.required),
      price: new UntypedFormControl(null, Validators.required)
    })
  }

  public submit() {
    if(this.form.invalid) {
      return
    }

    const product = {
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price
    }
  }

}
