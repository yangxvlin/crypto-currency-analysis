import ReactDOM from 'react-dom';
import React from 'react';
import { IconButton, Icon } from "rsuite";

export default class ContactPage extends React.Component {

  render() {
    return (
      <div>
        <IconButton icon={<Icon icon="envelope" />} >xuliny1998@gmail.com</IconButton>
      </div>
    );
  }
}