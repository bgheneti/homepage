import React, { Component } from "react"
import SocialIcons from "./social-icons"

import "./footer.css"

export default class Footer extends Component {
  render() {
    return (
      <footer className="pv5 bg-near-whited x-sans f4 mid-gray bg-near-white footer">
        <div className="x-viewport">
          <a href="https://github.com/bgheneti">Github</a>
          <i />
          <a href="https://www.linkedin.com/in/bgheneti/">Linkedin</a>
          <a href="#" className="top">
            ↑
          </a>
        </div>
      </footer>
    )
  }
}
