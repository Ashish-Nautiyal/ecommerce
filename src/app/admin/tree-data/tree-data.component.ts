import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

export interface root {
  _id: string
  name: string
  parent_id: any
  __v: number
  children?: root[]
}

@Component({
  selector: 'app-tree-data',
  templateUrl: './tree-data.component.html',
  styleUrls: ['./tree-data.component.scss']
})

export class TreeDataComponent implements OnInit {
  selectedNode: any;
  @Input() data: any;
  @Output() selectedCategory: EventEmitter<any> = new EventEmitter<any>();

  async ngOnInit(): Promise<void> {
    this.dataSource.data = [];
  }

  ngOnChanges(): void {
      if (this.dataSource.data.length < 1) {
        this.dataSource.data = this.data;
      }
  }

  private _transformer = (node: root, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      _id: node._id,
      level: level,
    };
  };
  treeControl = new FlatTreeControl<any>(
    node => node.level,
    node => node.expandable,
  );
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: any) => node.expandable;


  nodeSelected(node: any) {
    this.selectedCategory.emit(node._id);
  }
}