// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module'; // Import du module de routage
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
   AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Ajout du module de routage
    // Modules supplémentaires seront ajoutés ici
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
