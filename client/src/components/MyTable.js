import React from 'react';
import SortTable from "./SortTable";

export default class MyTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      today: props.today,
      data: [],
    };
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (nextProps.today !== this.state.today) {
      var new_data;

      console.log("MyTable.UNSAFE_componentWillUpdate", "http://127.0.0.1:5000/test?today=" + nextProps.today);
      fetch("http://127.0.0.1:5000/test?today=" + nextProps.today)
      .then(function(res) {
        if (res.status >= 400) {
          alert("Bad response from server: " + res.status);
          throw new Error("Bad response from server");
        }
        console.log(res);
        return res;
      })
      .then(
        res => {
          if (res.ok) {
            console.log("ok");
            new_data = res.json()

            // update data
            Promise.any([new_data])
            .then(
              value => {
                  this.setState({
                    today: nextProps.today,
                    data: value,
                  });
                }
              );
          } else {
            console.log("error");
          }
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  componentWillMount() {
    console.log("MyTable.componentWillMount", "http://127.0.0.1:5000/test?today=" + this.state.today);
    var new_data;
    fetch("http://127.0.0.1:5000/test?today=" + this.state.today)
      .then(function(res) {
        if (res.status >= 400) {
          alert("Bad response from server: " + res.status);
          throw new Error("Bad response from server");
        }
        return res;
      })
      .then(
        res => {
          if (res.ok) {
            console.log("ok");
            new_data = res.json()

            // update data
            Promise.any([new_data])
              .then(
                value => {
                  this.setState({
                    data: value,
                  });
                }
              );
          } else {
            console.log("error");
          }
        },
        err => {
          console.log(err);
        }
      )
  }

  render() {
    return (
      <div>
        <SortTable package={{
          today:this.state.today,
          data: this.state.data}}  />
      </div>
    );
  }
}
