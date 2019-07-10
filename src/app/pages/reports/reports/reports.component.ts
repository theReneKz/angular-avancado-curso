import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Category} from '../../categories/shared/category.model';
import {CategoryService} from '../../categories/shared/category.service';

import {Entry} from '../../entries/shared/entry.model';
import {EntryService} from '../../entries/shared/entry.service';

import currencyFormatter from 'currency-formatter';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  expenseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;
  expenseChartData: any;
  revenueChartData: any;
  chartOptions = {
    scales: {
      yAxes: [{
          display: true,
          ticks: {
              beginAtZero: true
          }
      }]
  }
  };

 categories: Category[] = [];
 entries: Entry[] = [];

 @ViewChild('month') month: ElementRef = null;
 @ViewChild('year') year: ElementRef = null;

  constructor(private entryService: EntryService, private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories
    );
  }

  generateReports():void {
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;
    if(!month || !year) {
      alert('Você precisa selecionar o mês e o ano para gerar os relatórios');
    } else {
      this.entryService.getByMonthAndYear(month, year).subscribe(
        entries => {
          this.entries = entries;
          this.calculateBalance();
          this.setChartData();
        }
      );
    }
  }

  private calculateBalance(): void {
      let expense = this.sumAmount(this.entries, Entry.types.expense);
      let revenue = this.sumAmount(this.entries, Entry.types.renevue);
      this.expenseTotal = currencyFormatter.format(expense, {code: 'BRL'});
      this.revenueTotal = currencyFormatter.format(revenue, {code: 'BRL'});
      this.balance = currencyFormatter.format((revenue - expense), {code: 'BRL'});
  }

  private setChartData(): void {
    this.revenueChartData = this.getChartData(Entry.types.renevue, 'Gráfico de Receitas', '#9CCC65');
    this.expenseChartData = this.getChartData(Entry.types.expense, 'Gráfico de Despesas', '#E03131');
  }

  private getChartData(entryType: string, title: string, color: string): any {
    const chartData = [];
    this.categories.forEach(category => {
      const filteredEntries = this.entries.filter(entry => {
        return (entry.categoryId === category.id) && (entry.type === entryType);
      });
      if (filteredEntries.length > 0) {
        const total: number = this.sumAmount(filteredEntries, entryType);
        chartData.push({
          categoryName: category.name,
          totalAmount: total
        });
      }
    });

    return  {
      labels: chartData.map(item => item.categoryName),
      datasets: [{
        label: title,
        backgroundColor: color,
        data: chartData.map(item =>item.totalAmount)
      }]
    };
  }

  private sumAmount(input: Entry[], type: string): number {
    let sum = 0;
    input.forEach(entry => {
      if (entry.type === type) {
        sum += currencyFormatter.unformat(entry.amount, {code: 'BRL'});
      }
    });
    return sum;
  }
}
