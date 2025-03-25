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

