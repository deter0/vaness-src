import React, { ReactElement } from "react";
import "./styles/index.scss";

import Navigator from "./Navigator.tsx";
import HomePage from "./HomePage.tsx";
import HowItStartedPage from "./HowItStarted.tsx";
import Particle from "./Particle.tsx";

export type NavigateFunc = (url: string) => void;

class App extends React.Component {
  state: Readonly<{ OldPage?: ReactElement, CurrentPage?: ReactElement, Navigating: boolean }> = {
    Navigating: false
  };
  
  GetPageByURL(URL: string) {
    switch (URL) {
      case 'home':
      case '':
      case '/home':
        return <HomePage Navigate={this.navigateToPage.bind(this)}/>
        
      case 'how-it-started':
      case '/how-it-started':
        return <HowItStartedPage Navigate={this.navigateToPage.bind(this)}/>

      case 'particle':
      case '/particle':
        return <Particle Navigate={this.navigateToPage.bind(this)}/>
        
      default:
        return <div className="page">
          <h1>Looks like you\'re lost!</h1>
          <p>The URL "{URL}" was not found.</p>
          <button onClick={() => this.navigateToPage("home")}>Take Me Home!<span className="material-symbols-outlined">favorite</span></button>
        </div>
        break;
    }
  }
  
  componentDidMount() {
    history.pushState({}, "", window.location.pathname);
    
    const findPage = () => {
      const page = this.GetPageByURL(window.location.pathname);
      this.setState({CurrentPage: page});
    }
    findPage();

    window.onlocationchange = () => {
      findPage();
    }
    window.onpopstate = () => {
      findPage();
    }
    window.onhashchange = () => {
      findPage();
    }

    var audio = new Audio('https://dl.sndup.net/p46j/mylovemine.mp3');
    document.body.addEventListener("mousemove", function () {
      audio.play();
    })
  }

  navigationQueue: string[] = [];
  navigateToPage(pageUrl: string, skipHistory: boolean = false) {
    if (this.state.Navigating === true) {
      console.log("Navigating!");
      this.navigationQueue.push(pageUrl);
      return;
    } else {
      let NewPage: ReactElement|null = this.GetPageByURL(pageUrl);

      if (!skipHistory) {
        history.pushState({}, "", pageUrl);
      }
      this.setState({ CurrentPage: NewPage, OldPage: this.state.CurrentPage, Navigating: true });
      
      setTimeout(() => {
        this.setState({OldPage: null, Navigating: false});
        
        console.log("Queue", this.navigationQueue);
        if (this.navigationQueue.length > 0) {
          this.navigateToPage(this.navigationQueue.pop() as string);
        }
      }, 800);
    }
  }
  
  render() {
    return <div className="App">
      <div unselectable="on" className="overlay-grain"></div>
      <Navigator Navigate={this.navigateToPage.bind(this)}/>
      
      <div id="old-page" className={`${this.state.Navigating ? 'page-hidden' : ''}`}>
        {this.state.OldPage}
      </div>
      <div id="current-page" className={`${this.state.Navigating ? 'page-view' : ''}`}>
        {this.state.CurrentPage}
      </div>
    </div>
  }
}

export default App;
