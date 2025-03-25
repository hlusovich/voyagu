
import {BookingFormEntity} from "../entities/booking-form.entity";
import {BookingFormModel} from "../../domain/models/booking-form.model";
import {Mapper} from "../../../../base/utils/mapper";

export class BookingFlightMapper extends Mapper<BookingFormEntity, BookingFormModel> {
  override mapFrom(param: BookingFormEntity): BookingFormModel {
    return {
      firstName: param.firstName,
      lastName: param.lastName,
      gender: param.gender,
      monthOfBirth: param.monthOfBirth,
      dayOfBirth: param.dayOfBirth,
      yearOfBirth: param.yearOfBirth,
      citizenship: param.citizenship,
    };
  }

  public mapTo(param: BookingFormModel): BookingFormEntity {
    return {
      firstName: param.firstName,
      lastName: param.lastName,
      gender: param.gender,
      monthOfBirth: param.monthOfBirth,
      dayOfBirth: param.dayOfBirth,
      yearOfBirth: param.yearOfBirth,
      citizenship: param.citizenship,
    };
  }
}
