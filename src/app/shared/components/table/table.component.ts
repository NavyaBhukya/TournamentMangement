import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges {
  @Input() tableTitle: string = '';
  // @Input() columns: string[] = []; 
  public tableHeadings: string[] = [];
  public tableObjKeys: string[] = [];
  @Input() data: any[] = [];
  @Input() addButtonLabel: string = 'Add';
  @Output() onAdd = new EventEmitter<void>();
  @Output() onSearch = new EventEmitter<string>();
  searchControl: FormControl = new FormControl('');
  filteredData: any[] = [];
  ngOnInit(): void {
    // this.tableDataInit()
    // this.searchDataInit()
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue?.length) {
      this.searchDataInit()
      this.tableDataInit()
    }
  }

  public searchDataInit() {
    this.filteredData = this.data;
    this.searchControl.valueChanges.subscribe((searchTerm) => {
      this.filteredData = this.data.filter((item) =>
        Object.values(item).some((val) =>
          val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      this.onSearch.emit(searchTerm);
    });
  }

 public handleAdd() {
    this.onAdd.emit();
  }
  public tableDataInit(): void {
    this.filterAndFormatColumns(Object.keys(this.data[0]))
  }
  //  Filter and transform the column names
  private filterAndFormatColumns(tabelKeys: string[]) {
    const excludedColumns = ["_id", "__v", "createdAt", "updatedAt"];
    this.tableHeadings = tabelKeys.filter(column => !excludedColumns.includes(column)).map(column => this.formatColumnName(column))
    this.tableObjKeys = tabelKeys.filter(column => !excludedColumns.includes(column))
  }

  // Format column name: camelCase or PascalCase to spaced words
  private formatColumnName(column: string): string {
    return column
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lowercase and uppercase letters
      .replace(/^./, str => str.toUpperCase()); // Capitalize the first letter
  }
  public checkingIsArray(data: string[]): boolean {
    return Array.isArray(data)
  }
}
