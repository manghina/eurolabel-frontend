import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    @Output() variableUpdated = new EventEmitter<number>();

    public shareValue: number;

    updateVariable(newValue: number) {
        this.variableUpdated.emit(newValue);
    }
}