import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NUMBER_OF_SIBLINGS_LOOKUP } from './constants';

@Injectable({
  providedIn: 'root'
})
export class ProfileFiltersStoreService {

  private annualIncomesSource = new BehaviorSubject<ReadonlyArray<{id: number, value: string}>>([]);
  public annualIncomes$ = this.annualIncomesSource.asObservable();

  private educationAreasSource = new BehaviorSubject<ReadonlyArray<{id: number, value: string}>>([]);
  public educationAreas$ = this.educationAreasSource.asObservable();

  private numberOfSiblingsSource = new BehaviorSubject<ReadonlyArray<{id: number, value: number}>>(NUMBER_OF_SIBLINGS_LOOKUP);
  public numberOfSiblings$ = this.numberOfSiblingsSource.asObservable();

  constructor() { }

  setAnnualIncomes(value: any) {
    this.annualIncomesSource.next(value);
  }

  setEducationAreas(value: any) {
   this.educationAreasSource.next(value); 
  }
}
