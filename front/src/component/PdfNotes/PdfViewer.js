import React from 'react';
import { Document, Page } from 'react-pdf';
import { Row, Col } from 'react-bootstrap';

import './PdfViewer.css';
import '../../shared/shared.css';

import HighlightZone from './HighlightZone';

export default class PdfNotes extends React.Component {


  constructor(props) {
    super(props);

    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.onDocumentLoad = this.onDocumentLoad.bind(this);

    this.state = {
      pdfPath: "",
      highlightZoneSize: null,
      pageNumber: 2
    };
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.pdfPage && nextProps.pdfPage === "refresh"){
      this.setState({pageNumber: this.state.pageNumber +1});

      setTimeout(function() {
        this.setState({pageNumber: this.state.pageNumber -1});
      }.bind(this), 100);
    }
    else if(nextProps.pdfPage && nextProps.pdfPage !== this.state.pageNumber){
      this.setState({pageNumber: this.state.pageNumber})
    }
  }
  componentWillUpdate(nextProps, nextState){

    if(!this.props.pdfPage || (nextState.pageNumber !== this.state.pageNumber)){
      this.props.updatePdfPage(this.state.pageNumber);
    }

  }

  render() {
    var {pageNumber, highlightZoneSize, numPages} = this.state;
    const {displayHighlightZone} = this.props;
    return (
      <Col sm={8} className="pdfViewer">
            <Row className='pdfControlers text-center'>
              <Col smOffset={3} sm={2} > <button onClick={this.previousPage}> previous </button> </Col>
              <Col sm={4} > Page {pageNumber} of {numPages}</Col>
              <Col sm={2}> <button onClick={this.nextPage}> next </button> </Col>
            </Row>
            <Row className='pdfContainer'>
              {displayHighlightZone?
                <HighlightZone highlightZoneSize={highlightZoneSize}
                               addHighlight={this.props.addHighlight}
                               pageNumber={pageNumber}/>
              :null}
              <div className="pdfViewerContainer" id="pdfViewerContainer">
                <Document
                  file="relativity.pdf"
                  onLoadSuccess={this.onDocumentLoad}>
                  <Page pageNumber={pageNumber} />
                </Document>
              </div>
            </Row>
      </Col>
    );
  }

  onDocumentLoad = (res) => {
    setTimeout(function() {
      var headerHeight = document.getElementsByClassName("navbar")[0].clientHeight;
      var pdfControlersHeight = document.getElementsByClassName("pdfControlers")[0].clientHeight;

      document.getElementById("pdfViewerContainer").style.height = window.innerHeight -headerHeight - pdfControlersHeight - 50+ "px";

      var pdfHeight = document.getElementById("pdfViewerContainer").clientHeight;

      var pdfWidth = document.getElementById("pdfViewerContainer").clientWidth;
      this.setState({numPages: res.numPages, highlightZoneSize: [pdfHeight, pdfWidth]});
    }.bind(this), 1000);
  }

  nextPage(){
    if(this.state.pageNumber < this.state.numPages){
      var newPage = this.state.pageNumber;
      this.setState({pageNumber: ++newPage});
    }
  }

  previousPage(){
    if(this.state.pageNumber > 1){
      var newPage = this.state.pageNumber;
      this.setState({pageNumber: --newPage});
    }
  }
}
