import { OnInit , Injector} from '@angular/core';
import {BaseResourceService} from '../../services/base-resource-service';
import {BaseResourceModel} from '../../models/base-resource.model';

export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];

  constructor(protected injector: Injector, protected baseResourceService: BaseResourceService<T>) { }

  ngOnInit() {
    this.baseResourceService.getAll().subscribe(
      (resources => this.resources = resources),
      error => alert('Erro ao carregar lista')
    );
  }

  deleteEntry(resource): void {
    const mustDelete = confirm('Deseja realmente excluir este item?');
    if(mustDelete) {
      this.baseResourceService.delete(resource.id).subscribe(
        () => this.resources = this.resources.filter(element => element !== resource),
        () => alert('Erro')
      );
    }
    
  }

}
