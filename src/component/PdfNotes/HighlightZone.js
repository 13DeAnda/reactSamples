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
    this.generateStyle = this.generateStyle.bind(this);

    this.state = {
      styleDrawHighlight: {}
    };
  }

  componentDidMount(){
    if(this.props.highlightZoneSize[0]){
      document.getElementById('highlightZone').style.height = this.props.highlightZoneSize[0] + "px";
      document.getElementById('highlightZone').style.width = this.props.highlightZoneSize[1] + "px";
    }
  }
  componentWillReceiveProps(nextProps){
    console.log("the props updated", nextProps);
  }

  render() {
    return (
      <div className='highlightZone'
           id="highlightZone"
           onMouseMove={this.onMouseDrag}
           onMouseDown={this.onHighlightZoneClick}
           onMouseUp={this.onHighlightZoneUp}>
            <div style={this.state.styleDrawHighlight}> hello </div>
      </div>
    );
  }

  getRelativeCoordinates(e){
    var offsetTop = document.getElementById("highlightZone").offsetTop;
    var offsetLeft = document.getElementsByClassName("sidePdfNotes")[0].clientWidth + document.getElementsByClassName("sidePdfNotes")[0].offsetLeft;

    var headerHeight = document.getElementsByClassName("navbar")[0].clientHeight;
    var pdfControlersHeight = document.getElementsByClassName("pdfControlers")[0].clientHeight;

    var newTop = e.clientY - headerHeight - pdfControlersHeight - offsetTop -4;

    console.log(e.clientY, document.getElementsByClassName("navbar")[0], document.getElementsByClassName("pdfControlers")[0],  offsetTop);

    var newLeft = e.clientX - offsetLeft;
    return {top: newTop, left: newLeft};
  }

  generateStyle(currentStyle){
    if(currentStyle){
      var newStyle = {};
      newStyle.marginTop= currentStyle.top + "px";
      newStyle.marginLeft = currentStyle.left + "px";
      newStyle.width = currentStyle.width + "px";
      newStyle.height = currentStyle.height + "px";
      newStyle.background = "red";

      this.setState({styleDrawHighlight: newStyle});
    }
  }

  onHighlightZoneClick(e){
    var initialPoint = this.getRelativeCoordinates(e);
    this.setState({highlightCreate: initialPoint});
  }

  onMouseDrag(e){
    if(this.state.highlightCreate){
      var coordinate = this.getRelativeCoordinates(e);
      var initialCo = this.state.highlightCreate;
      console.log(coordinate, initialCo);

      var newWidth = initialCo.left < coordinate.left ? coordinate.left - initialCo.left: initialCo.left - coordinate.left ;

      console.log(initialCo.left < coordinate.left, initialCo.left, coordinate.left);
      var newHeight = initialCo.top < coordinate.top ? coordinate.top - initialCo.top: initialCo.top - coordinate.top ;

      var newTop = initialCo.top < coordinate.top ? initialCo.top : initialCo.top - newHeight;
      var newLeft= initialCo.left < coordinate.left ? initialCo.left : initialCo.left - newWidth;

      this.setState({highlightCreate: {top: newTop, left: newLeft, height: newHeight, width: newWidth}});

      this.generateStyle(this.state.highlightCreate);
    }
  }
  onHighlightZoneUp(){
    var style = this.generateStyle(this.state.highlightCreate);
    console.log("the final style", style);
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
