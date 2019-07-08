import { Component, Injector } from '@angular/core';
import {CategoryService} from '../shared/category.service';
import {Category} from '../shared/category.model';
import { BaseResourceListComponent } from '../../../shared/components/base-resources-list/base-resource-list.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent extends BaseResourceListComponent<Category> {

  constructor(protected injector: Injector, private categoryService: CategoryService) { 
    super(injector, categoryService);
  }
}
