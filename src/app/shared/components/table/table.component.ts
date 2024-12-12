import { DatePipe, Location } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { allplayers } from 'src/app/features/manage-players/interfaces/player.interface';
import { allTournaments, teamsInterface } from 'src/app/features/manage-tournament/interface/tournament.interface';
import { CommonService } from 'src/app/services/common.service';
import { PaginatorState } from 'primeng/paginator';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [DatePipe]
})
export class TableComponent implements OnChanges {
  @Input() playersNumber:any
  @Input() tableTitle: string = '';
  @Input() data: any[] = [];
  @Input() addButtonLabel: string = 'Add';
  @Input() tableHeader: string = 'Management';
  @Output() onAdd = new EventEmitter<any>();
  @Output() onSearch = new EventEmitter<string>();
  // @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<allTournaments>();
  @Output() pagination = new EventEmitter<PaginatorState>
  @Input() totalRecords: number = 0;
  // @Input() currentPage: number = 1;
  // @Input() pageSize: number = 10;
  public tableHeadings: string[] = [];
  public tableObjKeys: string[] = [];
  public searchControl: FormControl = new FormControl('');
  public filteredData: any[] = [];
  public isAdmin: string = '';
  public pageSizeOptions: number[] = [10, 20, 30, 40, 50];
  public selectedPageSize: number = 10;
  public paginationFirst: number = 0
  constructor(private loc: Location, private commonServ: CommonService,private router:Router) { }
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
    if (this.data[0]) {
      this.filterAndFormatColumns(Object.keys(this.data[0]));
    }
  }
  private filterAndFormatColumns(tableKeys: string[]) {
    const excludedColumns = ["_id", "__v", "createdAt", "updatedAt", 'formatMatches', 'poolMatches','players'];
    
    // Prepare table headings
    this.tableHeadings = tableKeys
      .filter(column => !excludedColumns.includes(column))
      .map(column => this.formatColumnName(column));
    
    // Add Number of Players for Teams Management
    if (this.tableHeader === 'Teams Management') {
      this.tableHeadings.push('Number of Players');
    }
    
    // Prepare table object keys
    this.tableObjKeys = tableKeys.filter(column => !excludedColumns.includes(column));
    
    // Add players count key for Teams Management
    if (this.tableHeader === 'Teams Management') {
      this.tableObjKeys.push('playersCount');
    }
  }
  private formatColumnName(column: string): string {
    return column
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, str => str.toUpperCase());
  }
  public goBack(): void {
    this.loc.back()
  }
  public navigateToDetails(rowData: any): void {
    // Assuming you want to route to details using the _id
    if (rowData._id) {
      this.router.navigate(['details', rowData._id]);
    }
  }

  public onPageChange(event: PaginatorState): void {
    // this.currentPage = event?.first;
    // this.pageSize = event.rows;
    this.pagination.emit(event)
  }
  public getRowValue(data: string | teamsInterface[] | number): string {
    if (Array.isArray(data)) {
      const teamsData = (data.map((res: teamsInterface) => res.teamName)).filter((res: string) => res).join(', ');
      return teamsData;
    } else if (typeof data === 'number') {
      return data.toString();
    } else {
      return data ? data : '***';
      
    }
  }

  public getPlayersCount(rowData: any): number {
    return rowData.players ? rowData.players.length : 0;
  }
}
