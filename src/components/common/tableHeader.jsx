import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = path => {
    const { sortColumn } = this.props;
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr className="clikble">
          {columns.map(column => (
            <th
              key={column.path || column.key}
              onClick={column.path ? () => this.raiseSort(column.path) : ""}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
