import { DatePipe, Location } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { allplayers } from 'src/app/features/manage-players/interfaces/player.interface';
import { allTournaments, teamsInterface } from 'src/app/features/manage-tournament/interface/tournament.interface';
import { CommonService } from 'src/app/services/common.service';

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
  @Input() tableHeader: string = 'Management';
  @Output() onAdd = new EventEmitter<any>();
  @Output() onSearch = new EventEmitter<string>();
  // @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<allTournaments>();
  @Output() pagination = new EventEmitter<{ page: number, pagesize: number }>
  @Input() totalRecords: number = 0;
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
  public tableHeadings: string[] = [];
  public tableObjKeys: string[] = [];
  public searchControl: FormControl = new FormControl('');
  public filteredData: any[] = [];
  public isAdmin: string = '';
  public pageSizeOptions: number[] = [10, 20, 30, 40, 50];
  public selectedPageSize: number = 10;
  constructor(private loc: Location, private commonServ: CommonService) { }
  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('role')!
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
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
  public handleEdit(rowData: allTournaments | allplayers): void {
    this.commonServ.isEditPlayer.next(true)
    this.onAdd.emit(rowData);
  }
  public handleDelete(rowData: allTournaments): void {
    this.onDelete.emit(rowData);
  }
  public handleAdd() {
    this.onAdd.emit();
    this.commonServ.isEditPlayer.next(false)
  }
  public tableDataInit(): void {
    if (this.data[0]) this.filterAndFormatColumns(Object.keys(this.data[0]))
  }
  private filterAndFormatColumns(tabelKeys: string[]) {
    const excludedColumns = ["_id", "__v", "createdAt", "updatedAt", 'formatMatches', 'poolMatches', 'players'];
    this.tableHeadings = tabelKeys.filter(column => !excludedColumns.includes(column)).map(column => this.formatColumnName(column))
    this.tableObjKeys = tabelKeys.filter(column => !excludedColumns.includes(column))
  }
  private formatColumnName(column: string): string {
    return column
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, str => str.toUpperCase());
  }
  public goBack(): void {
    this.loc.back()
  }
  public onPageSizeChange(pageSize: number): void {
    this.selectedPageSize = pageSize;
    this.pagination.emit({
      page: 1,
      pagesize: pageSize
    });
  }
  public onPageChange(event: any): void {
    this.currentPage = +event.page + 1;
    this.pageSize = event.rows;
    this.pagination.emit({ page: this.currentPage, pagesize: this.pageSize })
  }
  public getRowValue(data: string | teamsInterface[]): string {
    if (Array.isArray(data)) {
      const teamsData = (data.map((res: teamsInterface) => res.teamName)).filter((res: string) => res).join(', ')
      return teamsData
    } else return data ? data : '-'
  }
}
