import {FormControl} from "@angular/forms";

export interface BookingForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  gender: FormControl<string | null>;
  monthOfBirth: FormControl<string | null>;
  dayOfBirth: FormControl<string | null>;
  yearOfBirth: FormControl<number | null>;
  citizenship: FormControl<string | null>;
}

export interface BookingFormValue {
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  monthOfBirth: string | null;
  dayOfBirth: string | null;
  yearOfBirth: number | null;
  citizenship: string | null;
}

