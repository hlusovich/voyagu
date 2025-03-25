import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Months } from "../../../../base/enums/months.enum";
import { Genders } from "../../../../base/enums/gender.enum";
import { Citizenship } from "../../../../base/enums/citizenships.enum";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { MatOption, MatSelect } from "@angular/material/select";
import { MatButton } from "@angular/material/button";
import { RoutesConstants } from "../../../../base/constants/routes.constants";
import { Router } from "@angular/router";
import { MatInput } from "@angular/material/input";
import { BookingForm } from "../interfaces/booking-form.interface";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { BookingFormService } from '../services/booking-form.service';

@Component({
  selector: 'booking-form-body',
  standalone: true,
  templateUrl: './booking-form-body.component.html',
  styleUrl: './booking-form-body.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatRadioGroup,
    MatRadioButton,
    MatSelect,
    MatOption,
    MatButton,
    MatInput,
    MatLabel
  ]
})
export class BookingFormBodyComponent {
  protected readonly maxDaysCount = 31;
  protected readonly bookingForm: FormGroup<BookingForm>;
  protected readonly genders = Object.values(Genders);
  protected readonly months = Object.values(Months);
  protected days = Array.from({ length: this.maxDaysCount }, (_, i) => (i + 1).toString());
  protected readonly years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  protected readonly citizenships = Object.values(Citizenship);

  constructor(private fb: FormBuilder, private router: Router, private bookingFormService: BookingFormService) {
    const formValues = this.bookingFormService.getFormState();

    this.bookingForm = this.fb.group<BookingForm>({
      firstName: this.fb.control(formValues.firstName || '', Validators.required),
      lastName: this.fb.control(formValues.lastName || '', Validators.required),
      gender: this.fb.control(formValues.gender || '', Validators.required),
      monthOfBirth: this.fb.control(formValues.monthOfBirth || '', Validators.required),
      dayOfBirth: this.fb.control(formValues.dayOfBirth || '', Validators.required),
      yearOfBirth: this.fb.control(formValues.yearOfBirth || new Date().getFullYear(), Validators.required),
      citizenship: this.fb.control(formValues.citizenship || '', Validators.required)
    });

    this.bookingForm.get('monthOfBirth')?.valueChanges.pipe(takeUntilDestroyed()).subscribe(month => {
      const year = this.bookingForm.get('yearOfBirth')?.value || new Date().getFullYear();
      if (month && year) {
        this.updateDays(month, +year);
      }
    });

    this.bookingForm.get('yearOfBirth')?.valueChanges.pipe(takeUntilDestroyed()).subscribe(year => {
      const month = this.bookingForm.get('monthOfBirth')?.value;
      if (month && year) {
        this.updateDays(month, +year);
      }
    });
  }

  protected onSubmit(): void {
    console.log(this.bookingForm.value);
    this.bookingFormService.setFormState(this.bookingForm.value);
  }

  protected onBack(): void {
    this.bookingFormService.setFormState(this.bookingForm.value);
    this.router.navigate([`${RoutesConstants.flightList}`]);
  }

  private getDaysInMonth(month: string, year: number): string[] {
    const monthIndex = this.months.findIndex(item => item === month) + 1;
    if (!monthIndex) {
      return Array.from({ length: this.maxDaysCount }, (_, i) => (i + 1).toString());
    }
    return Array.from({ length: new Date(year, monthIndex, 0).getDate() }, (_, i) => (i + 1).toString());
  }

  private updateDays(month: string, year: number): void {
    this.days = this.getDaysInMonth(month, year);
    const selectedDay = this.bookingForm.get('dayOfBirth')?.value;
    if (selectedDay && !this.days.includes(selectedDay)) {
      this.bookingForm.get('dayOfBirth')?.setValue('');
    }
  }
}
