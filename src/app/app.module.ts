import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListComponent } from './user-list/user-list.component';
import { CommonUiModule } from './common-ui/common-ui.module';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { UserListState } from './store';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, UserListComponent],
  imports: [
    BrowserModule,
    CommonUiModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([UserListState], {
      compatibility: { strictContentSecurityPolicy: true },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
