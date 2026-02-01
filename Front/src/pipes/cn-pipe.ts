import { Pipe, PipeTransform } from '@angular/core';
import { cn } from '../utilis/cn';
import { ClassValue } from 'clsx';

@Pipe({
  name: 'cn',
  standalone: true,
})
export class CnPipe implements PipeTransform {

  transform(value: ClassValue, ...args: ClassValue[]): string {
    return cn(value, ...args);
  }

}
