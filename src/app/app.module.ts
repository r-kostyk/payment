import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'
import { FormComponent } from './form/form.component'
import { InfoProductComponent } from './info-product/info-product.component'
import { LoaderComponent } from './shared/components/loader/loader.component'

@NgModule({
    declarations: [
        AppComponent,
        FormComponent,
        InfoProductComponent,
        LoaderComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
