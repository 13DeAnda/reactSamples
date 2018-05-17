import React from 'react';
import ReactDOM from 'react-dom';
import './PdfNotes.css';
import '../../shared/shared.css';

export default class HighlightZone extends React.Component {

  constructor(props) {
    super(props);

    this.onMouseDrag = this.onMouseDrag.bind(this);
    this.getRelativeCoordinates = this.getRelativeCoordinates.bind(this);
    this.onHighlightZoneClick = this.onHighlightZoneClick.bind(this);
    this.onHighlightZoneUp = this.onHighlightZoneUp.bind(this);

    this.state = {
    };
  }
  render() {
    return (
      <div className='highlightZone'
           id="highlightZone"
           onMouseMove={this.onMouseDrag}
           onMouseDown={this.onHighlightZoneClick}
           onMouseUp={this.onHighlightZoneUp}> I'm the new component  </div>
    );
  }

  getRelativeCoordinates(e){
    var offsetTop = document.getElementsByClassName("highlightZone")[0].offsetTop;
    var offsetLeft = document.getElementsByClassName("sidePdfNotes")[0].clientWidth + document.getElementsByClassName("sidePdfNotes")[0].offsetLeft;

    var headerHeight = document.getElementsByClassName("navbar")[0].clientHeight;
    var pdfControlersHeight = document.getElementsByClassName("pdfControlers")[0].clientHeight;

    return {top: e.clientY - headerHeight - pdfControlersHeight - offsetTop, left: e.clientX - offsetLeft};
  }

  onHighlightZoneClick(e){
    var initialPoint = this.getRelativeCoordinates(e);
    this.setState({highlightCreate: initialPoint});
  }
  onMouseDrag(e){
    if(this.state.highlightCreate){
      var coordinate = this.getRelativeCoordinates(e);
      var initialCo = this.state.highlightCreate;

      var newWidth = initialCo.left < coordinate.left ? initialCo.left + coordinate.left: initialCo.left - coordinate.left ;
      var newHeight = initialCo.top < coordinate.top ? initialCo.top + coordinate.top: initialCo.top - coordinate.top ;

      this.setState({highlightCreate: {top: initialCo.top, left: initialCo.left, height: newHeight, width: newWidth}});
    }
  }
  onHighlightZoneUp(){
    console.log("the highlight css", this.state.highlightCreate);
    this.setState({highlightCreate: null});
  }
  addHighlight(){
    var highlightText = "<div class='highlight' style={{this.state.style}}> HELLO </div>";
    var highlightElement = new DOMParser().parseFromString(highlightText, 'text/html');

    var pdfContainer = document.getElementsByClassName("react-pdf__Page__textContent")[0];
    var highlightContainer = document.getElementById("highlightZone");

    //you keep apending till finish drawing
    highlightContainer.appendChild(highlightElement.documentElement);

    //once it finishes drawing you append in the actual container
    //ReactDOM.render(<Highlight />, pdfContainer);
  }
}
