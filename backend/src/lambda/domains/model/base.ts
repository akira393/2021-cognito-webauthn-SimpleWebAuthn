// import shallowEqual from 'shallowequal'

export abstract class AbstractValueObject<T> {
    protected readonly _value: T;

    protected constructor(_value: T) {
        this._value = Object.freeze(_value);
    }
    // equals(vo?: AbstractValueObject<T>): boolean {
    //     if (vo  === null|| vo ===undefined) {
    //         return false;
    //     }
    //     return shallowEqual(this._value, vo._value);
    // }
}

export abstract class PrimitiveValueObject<T> extends AbstractValueObject<T> {
    get value(): T {
        return this._value;
    }
}

interface ValueObjectProps {
    [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> extends AbstractValueObject<T> { }
