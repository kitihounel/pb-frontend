import { Pipe, PipeTransform } from "@angular/core"
import { getInitials } from 'src/utils/functions'

@Pipe({ name: 'initials'})
export default class InitialsPipe implements PipeTransform {

  transform(value: string) {
    return getInitials(value)
  }
}
