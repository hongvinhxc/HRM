import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer px-0 px-lg-3">
        <Container fluid>
          <nav>
            <ul className="footer-menu">
              <li>
                <a href="#Home" onClick={(e) => e.preventDefault()}>
                  Home
                </a>
              </li>
              <li>
                <a href="#Company" onClick={(e) => e.preventDefault()}>
                  Company
                </a>
              </li>
              <li>
                <a href="#Portfolio" onClick={(e) => e.preventDefault()}>
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#Blog" onClick={(e) => e.preventDefault()}>
                  Blog
                </a>
              </li>
            </ul>
            <p className="copyright text-center">
              © {new Date().getFullYear()}{" "}
              <a href="http://github.com/hongvinhxc">ReactJS</a>, made with
              love for a better web
            </p>
          </nav>
        </Container>
      </footer>
    );
  }
}

export default Footer;
