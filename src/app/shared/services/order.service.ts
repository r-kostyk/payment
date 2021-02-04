import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Constants } from '../constants'
import { Response } from '../interfaces'

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(private http: HttpClient) {}

    createOrder(): Observable<Response> {        
        return this.http.get<Response>(Constants.urlOrder)
        // return this.http.get<Response>(Constants.urlOrderError)
    }
}