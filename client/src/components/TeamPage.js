import React from 'react';
import { IconButton, Icon } from "rsuite";

export default class TeamPage extends React.Component {

  handle=()=>{
    const w=window.open('about:blank');
    w.location.href="https://github.com/yangxvlin/crypto-currency-analysis"
  }

  render() {
    return (
      <div>
        <p>This site is created by Xulin Yang.</p>
          <IconButton icon={<Icon icon="github"/>} onClick={this.handle}>GitHub</IconButton>
      </div>
    );
  }
}