import React from "react";
import { NavigateFunc } from "./App";

class Particle {
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;

  dob = 0;
  
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dob = Date.now()/1000;
  }
};

let VEL_POWER = 400;
let WIGGLE = 2;
let SPAWN_RATE = 0.1;
let SPAWN_AMOUNT = 100;
let ADULT_TIME = 40;
let DEVIATION = 50;

export default class ParticlePage extends React.Component<{Navigate: NavigateFunc }> {
  canvasRef = null;
  
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }
  
  nextPage() {
    this.setState({Exited: true});
    this.props.Navigate("particle");
  }

  particles = new Array<Particle>();
  running = false;
  ctx = null;

  componentDidMount() {
    const canvas = this.canvasRef.current;
    this.started = 0;
    this.particles.splice(0, this.particles); // Clear
    if (canvas) {
      const realDims = canvas.getBoundingClientRect();
      
      canvas.width = realDims.width;
      canvas.height = realDims.height;

      this.ctx = canvas.getContext("2d");

      for (let i = 0; i < SPAWN_AMOUNT; i++) {
        const p = new Particle(Math.random() * canvas.width, Math.random() * canvas.height);
        p.vx = (Math.random() - 0.5)*VEL_POWER;
        p.vy = (Math.random() - 0.5)*VEL_POWER;
        this.particles.push(p);
      }

      this.ctx.fillStyle = `rgb(0, 0, 0)`
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);

      this.lastRender = Date.now()/1000;
      this.started = this.lastRender;
      this.renderCanvas.bind(this)();
    }
  }
  started = 0;
  lastRender = 0;
  renderCanvas() {
    const now = Date.now()/1000;
    let dt = now - this.lastRender;
    this.lastRender = now;

    const ctx = this.ctx;

    if ((now - this.started) > 50) {
      SPAWN_AMOUNT = 0;
    }

    document.onclicked = (event) => {
      console.log(event);
    }
    if (ctx != null) {
      
      const width = ctx.canvas.width;
      const height = ctx.canvas.height;
      
      if (Math.random() < SPAWN_RATE) {
        for (let i = 0; i < SPAWN_AMOUNT; i++) {
          const p = new Particle(Math.random() * width, Math.random() * height);
          p.vx = (Math.random() - 0.5)*VEL_POWER;
          p.vy = (Math.random() - 0.5)*VEL_POWER;
          this.particles.push(p);
        }
      }

      const to_remove = new Array<number>();
      for (let i = 0; i < this.particles.length; i++) {
        const particle = this.particles.at(i);
        particle.x += particle.vx * dt + (Math.random()-0.5)*WIGGLE;
        particle.y += particle.vy * dt + (Math.random()-0.5)*WIGGLE;
        particle.vx += (Math.random()-0.5)*DEVIATION;
        particle.vy += (Math.random()-0.5)*DEVIATION;

        if (particle.x < 500) {
          if (particle.vx < 0)
            particle.vx *= 1;
        }

        if (particle.x < 0 || particle.y < 0 || particle.x > width || particle.y > height) {
          to_remove.push(i);
        }
        if ((now - particle.dob) > 30) {
          to_remove.push(i);
        }
      }
      for (let i = 0; i < to_remove.length; i++) {
        this.particles.splice(to_remove[i], 1);
      }
      
      for (let i = 0; i < this.particles.length; i++) {
        const particle = this.particles.at(i);
        ctx.fillStyle = `hsl(254, 55%, 51%, ${Math.min(((now - particle.dob)/ADULT_TIME)**1.4, 0.8)})`;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, 2 * Math.PI);
        ctx.fill();
      }
      requestAnimationFrame(this.renderCanvas.bind(this));
    }
  }
  render() {
    return <div class="particle-page page">
      <canvas ref={this.canvasRef} class="particle-canvas"></canvas>
      <h1>i love you</h1>
      <p>i can't begin to explain to you how much i love you. i will never stop loving you. your soul is worth love and i love every last corner of it. there will never be a time where i am not in love with you. you are like space and i am drifting forever in love with you. there is so much to love about you from the way you talk to the way your eyes sparkle. i hate seeing you sad it makes me so angry. i can tell when you're sad or upset and i wish i couldn't because i don't want to see you like that. i love you with all my heart and i will forever. i want to spend the rest of my life with you and i will do that. you are the prettiest girl i've ever seen and you are so kind to me. you treat me so well and i love you and i will forever and ever. i only love you, you only from now and forever and i want you to know that. i want you to know how special i am to you. i wish to be with i wish to be a part of your life. i want to be the one you turn to when everything else goes wrong because i want to be there for you and i will be there. i will never not be there for you, i love you.</p>
      <br/>
      <br/>
      <br/>
      <p>i love love love you (more)</p>
    </div>
  }
}


