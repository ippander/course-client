import { Component, Input } from '@angular/core';
import { Swimmer } from '../../service'
import { SessionActions } from '../../redux/actions'

@Component({
  selector: 'swimmer-detail',
  templateUrl: './swimmer-detail.component.html'
})
export class SwimmerDetailComponent {

	@Input() id: string
  @Input() account_id: string
  @Input() first_name: string
  @Input() last_name: string
  @Input() birthday: string
  @Input() notes: string

  constructor(private actions: SessionActions) { }

  save() {

    let bd: string = this.birthday.split('.').reverse().join('-')

    if (this.id) {
      this.actions.updateSwimmer(new Swimmer({
        id: this.id,
        first_name: this.first_name,
        last_name: this.last_name,
        birthday: this.birthday,
        notes: this.notes || ''
      })
      , Number(this.account_id))
    } else {
      this.actions.createSwimmer(new Swimmer({
        first_name: this.first_name,
        last_name: this.last_name,
        birthday: this.birthday,
        notes: this.notes || ''
      })
      , Number(this.account_id))

    }
  }

}
