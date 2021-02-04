import { Component } from '@angular/core'
import { Product } from '../shared/interfaces'

@Component({
    selector: 'app-info-product',
    templateUrl: './info-product.component.html',
    styleUrls: ['./info-product.component.scss']
})
export class InfoProductComponent {
    currency: string = 'USD'
    products: Product[] = [{
        name: 'ABCD',
        date: new Date('08/09/2019 12:03:44'),
        amount: 1123.03
    }]
}