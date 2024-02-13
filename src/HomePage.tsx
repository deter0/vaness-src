import React from "react";
import "./styles/index.scss";
import "./styles/home-page.scss"

import Messenger, { Message, MessageListAction, MessageListState, HandleMessageList } from "./Messenger";
import { NavigateFunc } from "./App";

class HomePage extends React.Component<{Navigate: NavigateFunc}> {
  state: Readonly<{ DateText: string, Messages: Message[], Exited: boolean }>;
  
  constructor(props) {
    super(props);
    this.state = {
      DateText: "Jun 15th, 2023",
      Messages: [],
      Exited: false
    };
    
    const MessagesList: MessageListAction[] = [
      new MessageListAction(2, new Message("IM SORRY I KNOW YOU LIKE RADIOHEAD 😭", false)),
      new MessageListAction(3.5, new Message("I have very strong opinions", false)),
      
      new MessageListAction(5, new Message("WHY", true)),
      new MessageListAction(6.5, new Message("wait do u even go to mgci", true)),
      new MessageListAction(8, new Message("cuz i've never seen u", true)),
      
      new MessageListAction(10, new Message("Yes I do", false)),
      new MessageListAction(12.5, new Message("I haven't been for like 3 weeks tho probably that's why", false)),
      
      new MessageListAction(15, new Message("WHY", true)),
      new MessageListAction(16.5, new Message("GO‼TO‼SCHOOL‼", true)),
      
      new MessageListAction(18, new Message("I WILL!", false)),
      new MessageListAction(19.5, new Message("you guys did really good btw", false)),
      new MessageListAction(20.5, new Message("Just hate radiohead", false)),
      
      new MessageListAction(23, new Message("WHY😭😭😭", true, "Just hate radiohead")),
      new MessageListAction(24.5, new Message("GOOD", true, "I WILL!")),
      
      new MessageListAction(26, new Message("THEY JUST MUMBLING ABOUT RANDOM STUFF IDK", false, "WHY😭😭😭")),
      new MessageListAction(26, new Message("I'm a Radiohead hater", false)),
    ];
    let MessageListState = HandleMessageList(undefined, MessagesList);
    const MessageListLoopFunc = () => {
      HandleMessageList(MessageListState, MessagesList);
      this.setState({Messages: MessageListState.Messages});
      
      if (!MessageListState.Completed)
        setTimeout(MessageListLoopFunc, 200);  
    }
    MessageListLoopFunc();
    
    setTimeout(() => {
      const theDate = "Jun 15th, 2023";
      let underlineIndex = 0;
      setInterval(() => {
        underlineIndex += 1;
        if (underlineIndex < theDate.length+1) {
          this.setState({ DateText: "<u>" + theDate.slice(0, underlineIndex) + "</u>" + theDate.slice(underlineIndex, theDate.length) });
        }
        
        if (underlineIndex > 1000) {
          underlineIndex = 0;
        }
      }, 25);
    }, 1000);
  }
  
  nextPage() {
    this.setState({Exited: true});
    this.props.Navigate("how-it-started");
  }
  
  render() {
    return <div id='main-page' className="home-page page">
      <div className="main-title">
        <div className='title-date-range'>
          <div className="l1" dangerouslySetInnerHTML={{__html: this.state.DateText}}></div>
          <div className="l2">—</div>
          <div className="l3">∞</div>
          <div className="l4">..(& beyond)</div>
        </div>
        <div className="main-title-text">
          <div className="l1">Vanessa<br/></div>
          <div className="l2">&<br/></div>
          <div className="l3">Ibraheem<br/></div>
        </div>
        <button onClick={(event) => this.nextPage()} className="our-story-button">i love you<span className="material-symbols-outlined">arrow_forward</span></button>
      </div>
      <div className="home-page-messages">
        <Messenger Messages={this.state.Messages}></Messenger>
      </div>
    </div>
  }
}

export default HomePage;
