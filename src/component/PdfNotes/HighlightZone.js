import React from 'react';
import _ from 'lodash';

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
      styleDrawHighlight: {},
      highlightCreate: null,
      initialPoint: null
    };
  }

  componentDidMount(){
    if(this.props.highlightZoneSize && this.props.highlightZoneSize[0]){
      document.getElementById('highlightZone').style.height = this.props.highlightZoneSize[0] + "px";
      document.getElementById('highlightZone').style.width = this.props.highlightZoneSize[1]-15 + "px";
    }
  }
  componentWillReceiveProps(nextProps){
  }

  render() {
    return (
      <div className='highlightZone'
           id="highlightZone"
           onMouseMove={this.onMouseDrag}
           onMouseDown={this.onHighlightZoneClick}
           onMouseUp={this.onHighlightZoneUp}>
            <div style={this.state.styleDrawHighlight}></div>
      </div>
    );
  }

  getRelativeCoordinates(e){
    var offsetTop = document.getElementById("highlightZone").offsetTop;
    var offsetLeft = document.getElementsByClassName("sidePdfNotes")[0].clientWidth + document.getElementsByClassName("sidePdfNotes")[0].offsetLeft;

    var headerHeight = document.getElementsByClassName("navbar")[0].clientHeight;
    var pdfControlersHeight = document.getElementsByClassName("pdfControlers")[0].clientHeight;

    var x = e.clientY - headerHeight - pdfControlersHeight - offsetTop -4;

    var y = e.clientX - offsetLeft;
    return {y: y, x: x};
  }

  generateStyle(currentStyle){
    if(currentStyle){
      var newStyle = {};
      newStyle.marginTop= currentStyle.top + "px";
      newStyle.marginLeft = currentStyle.left + "px";
      newStyle.width = currentStyle.right - currentStyle.left + "px";
      newStyle.height = currentStyle.bottom - currentStyle.top + "px";
      newStyle.background = "red";
      newStyle.opacity = ".5";


      this.setState({styleDrawHighlight: newStyle});
    }
  }

  onHighlightZoneClick(e){
    var initialPoint = this.getRelativeCoordinates(e);
    this.setState({initialPoint: initialPoint});
  }

  onMouseDrag(e){
    if(this.state.initialPoint){
      var coordinate = this.getRelativeCoordinates(e);
      var initialCo = this.state.initialPoint;

      var top = initialCo.x < coordinate.x? initialCo.x : coordinate.x;
      var bottom = initialCo.x > coordinate.x? initialCo.x : coordinate.x;

      var left = initialCo.y < coordinate.y? initialCo.y: coordinate.y;
      var right = initialCo.y > coordinate.y? initialCo.y: coordinate.y;

      this.setState({
        highlightCreate: {
          top: top,
          bottom: bottom,
          left: left,
          right: right,
          offsetTop: document.getElementById("pdfViewerContainer").scrollTop
        }
      });
      this.generateStyle(this.state.highlightCreate);
    }
  }
  onHighlightZoneUp(){
    var finalStyle = _.cloneDeep(this.state.styleDrawHighlight);
    finalStyle.marginTop = parseInt(finalStyle.marginTop.split("px").join(""), 10) + parseInt(this.state.highlightCreate.offsetTop, 10) + "px";
    finalStyle.background = "blue";

    this.props.showHighlight(false)
    this.props.addHighlight(finalStyle, this.props.pageNumber);
  }
}
