import { ElementRef } from '@angular/core'

declare var M

export interface MaterialInstance {
    destroy?(): void
}

export class MaterialService {
    static toast(message: string) {
        M.toast({html: message})
    }

    static updateTextInputs() {
        M.updateTextFields()
    }
    
    static initSelect(ref: ElementRef):MaterialInstance {
        return M.FormSelect.init(ref.nativeElement)
    }
}