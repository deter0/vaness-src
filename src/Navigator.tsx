import React from "react";
import { NavigateFunc } from "./App";

import './styles/navigator.scss';

class Navigator extends React.Component<{Navigate: NavigateFunc }> {
  click(e) {
    e.preventDefault();
    
    const url = new URL(e.nativeEvent.srcElement.href);
    this.props.Navigate(url.pathname);
    // console.log(this.props);
    return false;
  }
  render() {
    return <div className="navigator">
      <a href="/home" className="main-title-nav main-title-small main-title-text">
        <div className="l1">Vanessa<br/></div>
        <div className="l2">&<br/></div>
        <div className="l3">Ibraheem<br/></div>
      </a>
      <div class="links">
        <a onClick={this.click.bind(this)} href="/home">h</a>
        <a onClick={this.click.bind(this)} href="/how-it-started">s</a>
        <a onClick={this.click.bind(this)} href="/particle">p</a>

        <a class="really-you" href="">is it really you?</a>
      </div>
    </div>
  }
}

export default Navigator;
