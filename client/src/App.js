import React, { Component } from "react";
import "rsuite/dist/styles/rsuite-default.css";
import {
  Icon,
  Navbar,
  Nav,
  Dropdown,
  Container,
  Content,
} from "rsuite";
import "./App.css";
import TeamPage from "./components/TeamPage";
import ContactPage from "./components/ContactPage";
import MainPage from "./components/MainPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.navItemOnClick = this.navItemOnClick.bind(this);
    this.state = {
      activeKey: 1,
    };
  }

  navItemOnClick(index) {
    this.setState({
      activeKey: index,
    })
  }

  render() {
    const { activeKey } = this.state;

    return (
      <Container>

        <Navbar appearance="inverse">
          <Navbar.Header onClick={ () => {this.navItemOnClick(1)} }>
            <a href="#" className="navbar-brand logo">
              Crypto Currency Analysis
            </a>
          </Navbar.Header>
          <Navbar.Body>
            <Nav>
              <Nav.Item icon={<Icon icon="home" />} onClick={ () => {this.navItemOnClick(1)} } >
                Home
              </Nav.Item>
              <Dropdown title="About">
                <Dropdown.Item onClick={ () => {this.navItemOnClick(5)} } >Team</Dropdown.Item>
                <Dropdown.Item onClick={ () => {this.navItemOnClick(6)} } >Contact</Dropdown.Item>
              </Dropdown>
            </Nav>
            <Nav pullRight>
              <Nav.Item icon={<Icon icon="cog" />}>Settings</Nav.Item>
            </Nav>
          </Navbar.Body>
        </Navbar>
        
        <Container>
          <Content>
            { console.log("this.state.activeKey", this.state.activeKey) }
            {this.state.activeKey === 5 ? (
              console.log(this.state.activeKey),
              <TeamPage />
            ) : null}
            {this.state.activeKey === 6 ? (
              <ContactPage/>
            ) : null}
            {this.state.activeKey === 1 ? (
              <MainPage />
            ) : null}
          </Content>
        </Container>

      </Container>
    );
  }
}

export default App;
