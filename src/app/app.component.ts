import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'WOWPerso';

  search = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    realm: new FormControl('eu', [Validators.required]),
    server: new FormControl('lesSentienelles', [Validators.required])
  });

  onSubmit() {
    console.log(this.search.value);
  }
}
