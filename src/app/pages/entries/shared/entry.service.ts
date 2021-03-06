import { Injectable, Injector } from '@angular/core';

import {Entry} from './entry.model';
import {CategoryService} from '../../categories/shared/category.service';
import {BaseResourceService} from '../../../shared/services/base-resource-service';
import { Observable } from 'rxjs';
import { map, flatMap, catchError} from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry>{
  constructor(protected injector: Injector, private categoryService: CategoryService) {
    super('api/entries', injector, Entry.instance);
   }

  create(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.create.bind(this));
  }

  update(entry: Entry): Observable<Entry> {
   return this.setCategoryAndSendToServer(entry, super.update.bind(this));
  }

  private setCategoryAndSendToServer(entry: Entry, sendFn: any) {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;
        return sendFn(entry);
      }),
      catchError(this.handleError)
    );
  }

  getByMonthAndYear(month: number, year: number): Observable<Entry[]> {
    return this.getAll().pipe(
      map(entries => {
        var result: Entry[] =  entries.filter(entry => {
          const entrDate = moment(entry.date, 'dd/MM/yyyy');
          return (entrDate.month() + 1) == month && entrDate.year() == year;
        });
        return result;
      })
    );
  }
}
