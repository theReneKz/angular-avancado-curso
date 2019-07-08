import { BaseResourceModel } from '../models/base-resource.model';
import {Injector } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

export abstract class BaseResourceService<T extends BaseResourceModel> {
  protected http: HttpClient;

  constructor(
      protected apiPath: string,
      protected injector: Injector,
      protected jsonDataToResourceFn: (jsonData) => T) {
        this.http = injector.get(HttpClient);
  }

  getAll(): Observable<T[]> {
    return this.http.get(this.apiPath).pipe(
      map((jsondata: Array<any>) => this.jsonDataToResources(jsondata)),
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<T> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      map((jsondata) => this.jsonDataToResourceFn(jsondata)),
      catchError(this.handleError)
    );
  }

  create(resource: T): Observable<T> {
    return this.http.post(this.apiPath, resource).pipe(
      map(jsondata => this.jsonDataToResourceFn(jsondata)),
      catchError(this.handleError)
    );
  }

  update(resource: T): Observable<T> {
    const url = `${this.apiPath}/${resource.id}`;

    return this.http.put(url, resource).pipe(
      map(() => resource),
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe (
      map(() => null),
      catchError(this.handleError)
    );
  }

  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(element => {
        const input: T = this.jsonDataToResourceFn(element);
        resources.push(input);
    });
    return resources;
  }


  protected handleError(error: any) {
    console.log('Erro na requisição: ', error);
    return throwError(error);
  }
}