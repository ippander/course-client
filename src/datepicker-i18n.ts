import { Component, Injectable, Input } from '@angular/core'
import { NgbDatepickerI18n, NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap'
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap'

const I18N_VALUES = {
  en: {
    weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  fr: {
    weekdays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
    months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
  },
  fi: {
    weekdays: ['Ma', 'Ti', 'Ke', 'To', 'Pe', 'La', 'Su'],
    months: ['Tammi', 'Helmi', 'Maalis', 'Huhti', 'Touko', 'Kesä', 'Heinä', 'Elo', 'Syys', 'Loka', 'Marras', 'Joulu'],
  }

};

// Define a service holding the language. You probably already have one if your app is i18ned.
@Injectable()
export class I18n {
  language = 'fi';
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }
}

@Injectable()
class CustomDateParserFormatter extends NgbDateParserFormatter {

  parse(value: string): NgbDateStruct {
console.log('value')
console.log(value)
    let split = value.split('.')
    return {
      day: Number(split[0]),
      month: Number(split[1]),
      year: Number(split[2])
    }
  }

  format(date: NgbDateStruct): string {
console.log('date')
console.log(date)
    if (!date) return null
    return date.day + '.' + date.month + '.' + date.year
  }
}

@Component({
  selector: 'ngbd-datepicker-i18n',
  templateUrl: 'datepicker-i18n.html',
  providers: [
    I18n,
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ] // define custom NgbDatepickerI18n provider
})
export class NgbdDatepickerI18n {

  @Input() model: any
  @Input() birthday: NgbDateStruct

  constructor(private _i18n: I18n, config: NgbDatepickerConfig) {
    console.log('config')
    console.log(config)
    // console.log(formatter)

     config.minDate = { year: 1950, month: 1, day: 1 }
     // formatter = new CustomDateParserFormatter()
  }

  set language(language: string) {
    this._i18n.language = language;
  }

  get language() {
    return this._i18n.language;
  }
}

// @Component({
//   selector: 'ngbd-datepicker-config',
//   template: '<ngb-datepicker [(ngModel)]="model"></ngb-datepicker>',
//   providers: [
//     NgbDatepickerConfig,
//     I18n,
//     { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
//     { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
//   ] // add NgbDatepickerConfig to the component providers
// })
// export class NgbdDatepickerConfig {

//   model;

//   constructor(config: NgbDatepickerConfig) {
//     // customize default values of datepickers used by this component tree
//     config.minDate = {year: 1900, month: 1, day: 1};
//     config.maxDate = {year: 2099, month: 12, day: 31};

//     // days that don't belong to current month are not visible
//     config.outsideDays = 'hidden';

//     // weekends are disabled
//     config.markDisabled = (date: NgbDateStruct) => {
//       const d = new Date(date.year, date.month - 1, date.day);
//       return d.getDay() === 0 || d.getDay() === 6;
//     };
//   }
// }
