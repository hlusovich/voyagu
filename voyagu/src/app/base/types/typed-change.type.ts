import { SimpleChange } from "@angular/core";

export type TypedSimpleChanges<T> = {
  [P in keyof T]?: TypedSimpleChange<T[P]>;
};

interface TypedSimpleChange<T> extends SimpleChange {
  previousValue: T;
  currentValue: T;
}
