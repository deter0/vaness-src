import React from "react";


export default class Waveform extends React.Component {
  Song: HTMLAudioElement | null = null;
  Canvas = React.createRef<HTMLCanvasElement>();
  animationFrameID: number|null;

  
  constructor(props) {
    super(props);
    
    const mylove = require("url:../public/mylovemine.mp3");
    this.Song = new Audio(mylove);
  }
  
  componentDidMount(): void {
    if (this.Song && this.Canvas.current) {
      this.Song.volume = 0.2;

      const ctx = this.Canvas.current.getContext('2d');
      if (ctx != null) {
      //   const width = this.Canvas.current.width;
      //   const height = this.Canvas.current.height;
        
      //   const audioCtx = new AudioContext();
      //   const source = audioCtx.createMediaElementSource(this.Song);
      //   const analyzer = audioCtx.createAnalyser();
        
      //   source.connect(analyzer);
      //   analyzer.connect(audioCtx.destination);
      //   analyzer.fftSize = 2048;
        
      //   const dataArray = new Uint8Array(analyzer.frequencyBinCount);
        
      //   ctx.clearRect(0, 0, width, height);
        
      //   const draw = () => {
      //     if (ctx == null) return;
          
      //     this.animationFrameID = requestAnimationFrame(draw);

      //     analyzer.getByteTimeDomainData(dataArray);

      //     ctx.clearRect(0, 0, width, height);
      //     ctx.lineWidth = 2;
      //     ctx.strokeStyle = "hsl(100, 29%, 50%)";
      //     ctx.shadowBlur = 24;
      //     ctx.shadowColor = "hsl(100, 29%, 50%)";
      //     ctx.beginPath();

      //     const sliceWidth = width * 1.0 / analyzer.frequencyBinCount;
      //     let x = 0;

      //     for (let i = 0; i < analyzer.frequencyBinCount; i++) {
      //       const v = dataArray[i] / 128.0;
      //       const y = v * height / 2;

      //       if (i === 0) {
      //         ctx.moveTo(x, y);
      //       } else {
      //         ctx.lineTo(x, y);
      //       }

      //       x += sliceWidth;
      //     }

      //     ctx.stroke();
      //   }
        
      //   this.Song.addEventListener('play', () => {
      //       draw()
      //   });
      
      //   this.Song.addEventListener('ended pause', () => {
      //     if (this.animationFrameID)  
      //       cancelAnimationFrame(this.animationFrameID);
      //       this.Song = null;
      //   });
        
      //   this.Song.play();
      // }
    }
  }
  
  componentWillUnmount(): void {
    if (this.Song)
      this.Song.pause();
    if (this.animationFrameID)
      cancelAnimationFrame(this.animationFrameID);
  }
  
  render(): React.ReactNode {
      return <canvas style={{background: 'transparent'}} ref={this.Canvas} width="600" height="100"></canvas>
  }
}
