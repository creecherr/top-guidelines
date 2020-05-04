import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

/**
 * @title Table with sorting
 */
@Component({
  selector: 'top-guidelines',
  styleUrls: ['top-guidelines.css'],
  templateUrl: 'top-guidelines.html',
})
export class TopGuidelines implements OnInit {
    displayedColumns = ['select','journal', 'citation', 'data', 'materials', 'code', 'design', 'studyPre', 'analysisPre', 'replication','publication', 'tf'];
  dataSource = new MatTableDataSource(TOP_DATA);

  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
    applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onPsycClick() {
    this.applyFilter("psychology");
  }

  onEcologyClick() {
    this.applyFilter("ecology");
  }

  onPhysicsClick() {
    this.applyFilter("physics");
  }

  onSelectClick(element: any) {
    const index = this.dataSource.data.indexOf(element);
    if(this.dataSource.data[index].isSelected === 'yes it is selected'){
        this.dataSource.data[index].isSelected = '';
    } else {
        this.dataSource.data[index].isSelected = 'yes it is selected';
    }
  }

  onCompare(){
    this.applyFilter("yes it is selected");
  }
    showAll() {
    this.applyFilter("");
  }
openDialog() {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    });
}
  
}

export interface TopGuidelines {
  journal: string;
  citation: number;
  data: number;
  materials: number;
  code: number;
  design: number;
  studyPre: number;
  analysisPre: number;
  replication: number;
  publication: number;
  tf: number;
  tag: string;
  isSelected: string;
}

const TOP_DATA: TopGuidelines[] = [
  {journal: 'American Journal of Psychology', citation: 2, data: 1, materials: 2, code: 1, design: 1, studyPre: 2, analysisPre: 2, replication: 1, publication: 2, tf: 2, tag: 'psychology', isSelected: ''},
    {journal: 'Journal of Clinical Psychology', citation: 3, data: 3, materials: 1, code: 3, design: 2, studyPre: 2, analysisPre: 3, replication: 3, publication: 3, tf: 3, tag: 'psychology', isSelected: ''},
      {journal: 'Journal of Applied Ecology', citation: 0, data: 1, materials: 1, code: 1, design: 1, studyPre: 1, analysisPre: 0, replication: 1, publication: 0, tf: 1, tag: 'ecology', isSelected: ''},
        {journal: 'Oecologia', citation: 2, data: 2, materials: 2, code: 2, design: 2, studyPre: 2, analysisPre: 2, replication: 2, publication: 2, tf: 2, tag: 'ecology', isSelected: ''},
          {journal: 'Computational Materials Science', citation: 1, data: 2, materials: 3, code: 1, design: 2, studyPre: 3, analysisPre: 1, replication: 3, publication: 1, tf: 2, tag: 'Physics, ecology', isSelected: ''},
            {journal: 'American Journal of Physics', citation: 3, data: 2, materials: 2, code: 1, design: 2, studyPre: 2, analysisPre: 3, replication: 3, publication: 1, tf: 3, tag: 'Physics', isSelected: ''}
];

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}