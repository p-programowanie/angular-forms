import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppComponent } from './app.component';
import { PaymentComponent } from './components/forms-parts/payment/payment.component';
import { VendorCompanyComponent } from './components/forms-parts/vendor-company/vendor-company.component';
import { VendorPrivateComponent } from './components/forms-parts/vendor-private/vendor-private.component';
import { VendorTypeComponent } from './components/forms-parts/vendor-type/vendor-type.component';
import { VendorComponent } from './components/forms/vendor/vendor.component';

@NgModule({
  declarations: [
    AppComponent,
    VendorCompanyComponent,
    VendorPrivateComponent,
    VendorTypeComponent,
    PaymentComponent,
    VendorComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
