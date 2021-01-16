import React from 'react';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';

export default class SortTable extends React.Component {
    constructor(props) {
    super(props);

    this.state = {
      today: props.package.today,
      data: props.package.data,
    };

    this.handleSortColumn = this.handleSortColumn.bind(this);
  }

  // from update data from parent
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    console.log("SortTable.UNSAFE_componentWillUpdate", nextProps.package.today, this.state.today, nextProps.package.today !== this.state.today, JSON.stringify(nextProps.package.data) !== JSON.stringify(this.state.data));

    if (JSON.stringify(nextProps.package.data) !== JSON.stringify(this.state.data)) {
      console.log("SortTable.UNSAFE_componentWillUpdate", nextProps.package.data, this.state.data);
      this.setState({
        today: nextProps.package.today,
        data: nextProps.package.data,
      });
    }
  }

  // from rsuite
  getData() {
    const { data, sortColumn, sortType } = this.state;
    console.log("getData");
    console.log(data);

    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === 'string') {
          x = x.charCodeAt();
        }
        if (typeof y === 'string') {
          y = y.charCodeAt();
        }

        // equal items sort equally
        if (x === y) {
          return 0;
        }
        // nulls sort after anything else
        else if (x === null) {
            return 1;
        }
        else if (y === null) {
            return -1;
        }
        // otherwise, if we're ascending, lowest sorts first
        else if (sortType === 'asc') {
            return x < y ? -1 : 1;
        }
        // if descending, highest sorts first
        else { 
            return x < y ? 1 : -1;
        }
      });
    }
    return data;
  }

  // from rsuite
  handleSortColumn(sortColumn, sortType) {
    this.setState({
      loading: true
    });

    setTimeout(() => {
      this.setState({
        sortColumn,
        sortType,
        loading: false
      });
    }, 500);
  }

  my_format_float(num) {
    if (num != null) {
      return "$" + num.toFixed(2).toLocaleString();
    } else {
      return "null";
    }
  }

  my_to_percent(num) {
    if (num != null) {
      var val = Number(num*100).toFixed(2) + "%";
      if (num > 0) {
        return <p style={{ color: 'red' }} >{val}</p>;
      } else {
        return <p style={{ color: 'green' }} >{val}</p>;
      }
    } else {
      return "null";
    }
  }

  render() {
    return (
      <div>
        <Table
          height={600}
          width={910}
          data={this.getData()}
          sortColumn={this.state.sortColumn}
          sortType={this.state.sortType}
          onSortColumn={this.handleSortColumn}
          loading={this.state.loading}
          onRowClick={data => { console.log(data); }}
        >
          <Column width={130} align="center" fixed sortable>
            <HeaderCell>Coin</HeaderCell>
            <Cell dataKey="Coin" />
          </Column>

          <Column width={130} sortable align="right">
            <HeaderCell>Price</HeaderCell>
            <Cell dataKey="Price" >{rowData => this.my_format_float(rowData.Price)}</Cell>
          </Column>

          <Column width={130} sortable align="right">
            <HeaderCell>24h</HeaderCell>
            <Cell dataKey="24h" >{rowData => this.my_to_percent(rowData["24h"])}</Cell>
          </Column>

          <Column width={100} sortable align="right">
            <HeaderCell>7d</HeaderCell>
            <Cell dataKey="7d" >{rowData => this.my_to_percent(rowData["7d"])}</Cell>
          </Column>

          <Column width={100} sortable align="right">
            <HeaderCell>1m</HeaderCell>
            <Cell dataKey="1m" >{rowData => this.my_to_percent(rowData["1m"])}</Cell>
          </Column>

          <Column width={160} sortable align="right">
            <HeaderCell>24h Volume</HeaderCell>
            <Cell dataKey="24h_volume" >{rowData => this.my_format_float(rowData["24h_volume"])}</Cell>
          </Column>

          <Column width={160} sortable align="right">
            <HeaderCell>Market Capital</HeaderCell>
            <Cell dataKey="Market_Cap" >{rowData => this.my_format_float(rowData.Market_Cap)}</Cell>
          </Column>

        </Table>
      </div>
    );
  }
}