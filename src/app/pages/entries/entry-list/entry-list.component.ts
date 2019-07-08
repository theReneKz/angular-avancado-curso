import { Component, Injector } from '@angular/core';
import {EntryService} from '../shared/entry.service';
import {Entry} from '../shared/entry.model';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resources-list/base-resource-list.component';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent extends BaseResourceListComponent<Entry> {

  constructor(protected injector: Injector, protected entryService: EntryService) { 
    super(injector, entryService);
  }
}
