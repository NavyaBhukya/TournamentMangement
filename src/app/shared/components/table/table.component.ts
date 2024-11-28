import { DatePipe, Location } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { allTournaments } from 'src/app/features/manage-tournament/interface/tournament.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [DatePipe]
})
export class TableComponent implements OnChanges {
  @Input() tableTitle: string = '';
  @Input() data: any[] = [];
  @Input() addButtonLabel: string = 'Add';
  @Output() onAdd = new EventEmitter<allTournaments>();
  @Output() onSearch = new EventEmitter<string>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<allTournaments>();
  public tableHeadings: string[] = [];
  public tableObjKeys: string[] = [];
  public searchControl: FormControl = new FormControl('');
  public filteredData: any[] = [];
  public isAdmin: string = '';
  constructor(private loc: Location, private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('role')!
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
  public handleEdit(rowData: allTournaments): void {
    // console.log(rowData);
    // this.onEdit.emit(rowData);
    this.onAdd.emit(rowData); // sending tournament data to edit
  }
  public handleDelete(rowData: allTournaments): void {
    console.log(rowData);
    this.onDelete.emit(rowData);
  }
  public handleAdd() {
    this.onAdd.emit();
  }
  public tableDataInit(): void {
    this.filterAndFormatColumns(Object.keys(this.data[0]))
  }
  private filterAndFormatColumns(tabelKeys: string[]) {
    const excludedColumns = ["_id", "__v", "createdAt", "updatedAt"];
    this.tableHeadings = tabelKeys.filter(column => !excludedColumns.includes(column)).map(column => this.formatColumnName(column))
    this.tableObjKeys = tabelKeys.filter(column => !excludedColumns.includes(column))
  }
  private formatColumnName(column: string): string {
    return column
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, str => str.toUpperCase());
  }
  // going back to previous screen from table
  public goBack(): void {
    this.loc.back()
  }
}
