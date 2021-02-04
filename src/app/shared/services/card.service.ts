import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { CardType, Card } from '../interfaces'
import { Constants } from '../constants'

@Injectable({
    providedIn: 'root'
})
export class CardService {
    cards: string[] = ['Visa', 'MasterCard', 'Amex']

    constructor(private http: HttpClient) {}

    getCards(): Observable<Card[]> {        
        return this.http.get<CardType>(Constants.urlCards)
        .pipe(
            map(data => data.cardTypes.filter((card: Card) => this.cards.indexOf(card.value) !== -1))
        ) 
    }
}