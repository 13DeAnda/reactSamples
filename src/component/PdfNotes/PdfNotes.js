import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Document, Page } from 'react-pdf';
import './PdfNotes.css';
import '../../shared/shared.css';


export default class PdfNotes extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.addHighlight = this.addHighlight.bind(this);
    this.state = {
      pdfPath: "",
      numPages: null,
      pageNumber: 2
    };
  }
  onDocumentLoad = (res) => {
    this.setState({numPages: res.numPages});
  }

  render() {
    return (
      <Grid className="container-fluid RomanNumerals">
        <Row>
          <Col sm={4}>
            this is the menu
            <button onClick={this.addHighlight}> Add highlight </button>
          </Col>
          <Col sm={6}>
            <Row className='text-center'>
              <Col xsOffset={4} sm={2} md={2}> <button onClick={this.previousPage}> previous </button> </Col>
              <Col sm={3} md={3} className='text-center'> Page {this.state.pageNumber} of {this.state.numPages} </Col>
              <Col sm={2} md={2}> <button onClick={this.nextPage}> next </button> </Col>
            </Row>
            <Row>
              <Document
                file="relativity.pdf"
                onLoadSuccess={this.onDocumentLoad}>
                <Page pageNumber={this.state.pageNumber} />
              </Document>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }

  addHighlight(){
    var highlightText = "<div class='highlight'> HELLO </div>";
    var highlightElement = new DOMParser().parseFromString(highlightText, 'text/html');

    var pdfContainer = document.getElementsByClassName("react-pdf__Page__textContent")[0];
    pdfContainer.appendChild(highlightElement.documentElement);
    console.log("hihglight must have been added");
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

  onChange (e){
    this.setState({textToConvert : e.target.value, message: null});
  }


}
