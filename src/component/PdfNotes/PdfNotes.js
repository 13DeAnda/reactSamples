import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Document, Page } from 'react-pdf';
import './PdfNotes.css';
import '../../shared/shared.css';
import _ from 'lodash';


export default class PdfNotes extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
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

  nextPage(){
    if(this.state.pageNumber < this.state.numPages){
      this.setState({pageNumber: ++this.state.pageNumber});
    }
  }

  previousPage(){
    if(this.state.pageNumber > 1){
      this.setState({pageNumber: --this.state.pageNumber});
    }
  }

  onChange (e){
    this.setState({textToConvert : e.target.value, message: null}); 
  }


}
