import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() tableTitle: string = ''; 
  @Input() columns: { field: string; header: string }[] = []; 
  @Input() data: any[] = []; 
  @Input() addButtonLabel: string = 'Add';
  @Output() onAdd = new EventEmitter<void>(); 
  @Output() onSearch = new EventEmitter<string>(); 
  searchControl: FormControl = new FormControl('');
  filteredData: any[] = [];
  ngOnInit(): void {
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
  handleAdd() {
    this.onAdd.emit();
  }

}
