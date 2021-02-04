import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import { delay } from 'rxjs/operators'
import { CardService } from '../shared/services/card.service'
import { OrderService } from '../shared/services/order.service'
import { MaterialService, MaterialInstance } from '../shared/services/material.service'
import { Card, Response } from '../shared/interfaces'

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('selectField', {static: false}) selectFieldRef: ElementRef
    selectField: MaterialInstance
    paymentForm: FormGroup
    cardTypesList: Card[] = []
    isSubmitted: boolean = false
    isLoading: boolean = false
    cardSub: Subscription
    orderSub: Subscription
    response: Response = {
        responseCode: '',
        responseMessage: '',
        invoiceNo: ''
    }

    constructor(private fb: FormBuilder,
                private cardService: CardService,
                private orderService: OrderService) {
        this._createForm();
    }

    private _createForm() {
        this.paymentForm = this.fb.group({
            cardTypes: ['', [Validators.required]],
            cardNumber: ['', [Validators.required, Validators.pattern('[0-9]{16}$')]],
            expiry: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/[0-9]{2}$')]],
            name: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[A-Za-z _]*$')]],
            email: ['', [Validators.email]]
        })
    }

    ngOnInit(): void {
        this.isLoading = true

        this.cardSub = this.cardService.getCards()
            .subscribe((data: Card[]) => {
                this.cardTypesList = data
                setTimeout(() => this.selectField = MaterialService.initSelect(this.selectFieldRef))
            },
            error => MaterialService.toast(error),
            () => this.isLoading = false)
    }

    ngOnDestroy() {
        if (this.cardSub) {
            this.cardSub.unsubscribe()
        }
        if (this.orderSub) {
            this.orderSub.unsubscribe()
        }

        this.selectField.destroy()
    }

    ngAfterViewInit() {
        MaterialService.updateTextInputs()
    }

    onChange(card: Card) {
        if(card.value === 'Amex') {
            this._updateValidators(15)
        } else {
            this._updateValidators(16)
        }
    }

    private _updateValidators(count: number) {
        let regexp = `[0-9]{${count}}$`

        this.paymentForm.get('cardNumber').setValidators([Validators.required, Validators.pattern(regexp)])
        this.paymentForm.get('cardNumber').updateValueAndValidity()
    }

    onSubmit() {
        this.paymentForm.disable()
        this.isLoading = true

        this.orderSub = this.orderService.createOrder()
            .pipe(delay(500))
            .subscribe((data: Response) => {                
                this.response = data
                this.isSubmitted = true
            },
            error => {
                MaterialService.toast(error)
                this.isLoading = false
                this.paymentForm.reset()
            },
            () => {
                this.isLoading = false
                this.paymentForm.enable()
            })
        }
}