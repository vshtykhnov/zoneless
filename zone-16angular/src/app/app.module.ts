import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ParentOnpushComponent } from './parent-onpush/parent-onpush.component';
import { ChildLeftComponent } from './child-left/child-left.component';
import { ChildRightComponent } from './child-right/child-right.component';
import { GrandchildLeftComponent } from './grandchild-left/grandchild-left.component';
import { GreatGrandchildLeftComponent } from './great-grandchild-left/great-grandchild-left.component';
import { GreatGreatGrandchildLeftComponent } from './great-great-grandchild-left/great-great-grandchild-left.component';

@NgModule({
  declarations: [
    AppComponent,
    ParentOnpushComponent,
    ChildLeftComponent,
    ChildRightComponent,
    GrandchildLeftComponent,
    GreatGrandchildLeftComponent,
    GreatGreatGrandchildLeftComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
