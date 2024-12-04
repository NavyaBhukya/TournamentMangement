import { DatePipe, Location } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
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
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<allTournaments>();
  @Output() pagination = new EventEmitter<{page:number,pagesize:number}>
  public tableHeadings: string[] = [];
  public tableObjKeys: string[] = [];
  public searchControl: FormControl = new FormControl('');
  public filteredData: any[] = [];
  public isAdmin: string = '';
  public totalRecords: number = 0;
  public currentPage: number = 1;
  public pageSize: number = 10;  
  // public pageSizeOptions: number[] = [10, 20, 30, 40, 50];
  constructor(private loc: Location, private datePipe: DatePipe, private commonServ: CommonService) { }
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
  public handleEdit(rowData: allTournaments | allplayers): void {
    console.log(rowData);
    
    this.commonServ.isEditPlayer.next(true)
    console.log('on click edit');
    // this.onEdit.emit(rowData);
    this.onAdd.emit(rowData); // sending tournament data to edit
  }
  public handleDelete(rowData: allTournaments): void {
    this.onDelete.emit(rowData);
  }
  public handleAdd() {
    this.onAdd.emit();
    this.commonServ.isEditPlayer.next(false)
  }
  public tableDataInit(): void {
    this.filterAndFormatColumns(Object.keys(this.data[0]))
  }
  private filterAndFormatColumns(tabelKeys: string[]) {
    const excludedColumns = ["_id", "__v", "createdAt", "updatedAt", 'formatMatches', 'poolMatches','players'];
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
  public onPageChange(event: any): void {
    this.currentPage = +event.page + 1; // PrimeNG pages are zero-based
    this.pageSize = event.rows; // Rows per page
    this.pagination.emit({page:this.currentPage,pagesize:this.pageSize})
  }
  public getRowValue(data: string | teamsInterface[]): string {
    if (Array.isArray(data)) {
      const teamsData = (data.map((res: teamsInterface) => res.teamName)).filter((res: string) => res).join(',')
      return teamsData
    } else return data ? data : '-'
  }
}
