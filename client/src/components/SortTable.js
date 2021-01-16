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
        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
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

  render() {
    return (
      <div>
        <Table
          height={600}
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

          <Column width={130} sortable>
            <HeaderCell>Price</HeaderCell>
            <Cell dataKey="Price" />
          </Column>

          <Column width={130} sortable>
            <HeaderCell>24h</HeaderCell>
            <Cell dataKey="24h" />
          </Column>

          <Column width={130} sortable>
            <HeaderCell>7d</HeaderCell>
            <Cell dataKey="7d" />
          </Column>

          <Column width={130} sortable>
            <HeaderCell>1m</HeaderCell>
            <Cell dataKey="1m" />
          </Column>

          <Column width={130} sortable>
            <HeaderCell>24h Volume</HeaderCell>
            <Cell dataKey="24h_volume" />
          </Column>

          <Column width={130} sortable>
            <HeaderCell>Market Capital</HeaderCell>
            <Cell dataKey="Market_Cap" />
          </Column>

        </Table>
      </div>
    );
  }
}