import { Component } from '@angular/core';
import { map } from 'rxjs';
import { DataService } from './data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  displayedColumns: string[] = ['name', 'count'];
  dataSource: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService
      .getData()
      .pipe(map((data: any[]) => this.processData(data)))
      .subscribe((data) => (this.dataSource = data));
  }

  processData(data: any[]): any[] {
    const nameCounts = data.reduce((acc, name) => {
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(nameCounts).map((name) => ({
      name,
      count: nameCounts[name],
      color: this.getRowColor(nameCounts[name]),
    }));
  }

  getRowColor(count: number): string {
    if (count > 10) return 'green';
    if (count > 2) return 'yellow';
    return count > 0 ? 'red' : '';
  }
}
