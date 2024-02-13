import React from "react";
import { NavigateFunc } from "./App";

class HowItStartedPage extends React.Component<{Navigate: NavigateFunc }> {
  nextPage() {
    this.setState({Exited: true});
    this.props.Navigate("particle");
  }
  
  render() {
    return <div class="started-page page">
      <img class="bg"/>
      <h1>So Far</h1>
      <img class="img-cen img-bord" src="https://i.imgur.com/Y61Rw95.png"/>
      <p>We were so far from each other when you first messaged me. I was on vaction with my family and I didn't want to be there. I was really excited to have someone like you like me, and I was really excited to see you. I thought you were really pretty from the pictures you sent me and I thought you were really tall (I thought you would be taller than me). A lot of stupid people said bad things about you that weren't true  and I didn't want to believe them and I'm happy I didn't because all of it was wrong.</p>

      <h1>Coming back!</h1>
      <img src="https://i.imgur.com/nTR4y68.jpeg" class="img-bord img-cen"></img>
      <p>We had a rough start. I had some issues that I didn't take time to think through and they hurt you and I'm sorry. It wasn't your fault and I never should have done what I did, I was stupid to do that. I am really sorry I know it still effects you today and it's my fault. I'm sorry.</p>

      <h1>First Date</h1>

      <div class="img-bord grid-2x1">
        <img src="https://i.imgur.com/5f4Cttu.jpeg" class="img-cen"></img>
        <img src="https://i.imgur.com/tRv98wp.jpeg" class="img-cen"></img>
      </div>
      <p>We went to Sharika's (🖕) dad's garden! I picked you flowers and touched your ass (not on purpose to help you I swear). Those flowers are probably dust neow. It was so cute that you put them in your room with the tape. I was so excited to see you and I thought you were really pretty. That day was so fun I still remember it in full detail.</p>
      <img src="https://i.imgur.com/vQf68nD.jpeg" class="img-cen img-bord"/>
      <p>My sweater!</p>

      <h1>Crayons</h1>
      <img src="https://i.imgur.com/54GorW4.jpeg" class="img-cen img-bord"/>
      <p>This is when we first started seeing each other in real life. I think this was also the day we held hands for the first time!! I don't know why but everytime I think back to these days I feel warm and I feel good, I miss it. You made me hang out with Sharika and Tamara a lot and it was really awkward but it's okay it was silly :3.</p>

      <img src="https://i.imgur.com/jebq3T0.jpeg" class="img-cen img-bord"/>

      <h1>Aquarium Date!</h1>
      <div class="img-bord grid-2x1">
        <img src="https://i.imgur.com/tOxqGYd.jpeg" class="img-cen"></img>
        <img src="https://i.imgur.com/70D3W7Z.jpeg" class="img-cen"></img>
      </div>
      <p>This day was so fun it made me feel so happy to be with you it made me realize how much I loved you because I do.
      I loved spending the entire day with you and it was so fun and I would not trade it for anything. It was one of the best memories I have. I love you :D</p>

      <button onClick={(event) => this.nextPage()} className="our-story-button">i love you<span className="material-symbols-outlined">arrow_forward</span></button>
    </div>
  }
}

export default HowItStartedPage;
