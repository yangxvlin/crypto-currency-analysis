import React from 'react';
import { DatePicker } from "rsuite";
import MyTable from "./MyTable";

var dateFormat = require('dateformat');

export default class MainPage extends React.Component {
    constructor(props) {
      super(props);
      var ddate = new Date("2019-11-01");

      this.state = {
        today: dateFormat(ddate, "yyyy-mm-dd"),
      };

      this.handleDateChange = this.handleDateChange.bind(this);
    }

    // get date selected from datePicker
    handleDateChange(date) {
      var ddate = new Date(date);
      this.setState({
        today: dateFormat(ddate, "yyyy-mm-dd"),
      });
      this.state.today = dateFormat(ddate, "yyyy-mm-dd");
      console.log("date picked: " + this.state.today);
    }

    render() {
    return (
        <div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <DatePicker style={{ width: 280 }} onOk={this.handleDateChange} calendarDefaultDate={new Date(this.state.today)} 
                        defaultValue={new Date(this.state.today)} 
            />
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <MyTable today={this.state.today} />
          </div>
        </div>
      );
    }
}