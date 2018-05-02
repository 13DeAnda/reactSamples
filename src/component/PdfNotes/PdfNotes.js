import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Document, Page } from 'react-pdf';
import './PdfNotes.css';
import _ from 'lodash';


export default class PdfNotes extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onLoadSuccess = this.onLoadSuccess.bind(this);
    this.state = {
      pdfPath: "",
      numPages: 4,
      pageNumber: 2
    };
  }

  render() {
    return (
      <Grid className="container-fluid RomanNumerals">
        <Row className="text-center">
          <Col>
            this will be the notes where it takes it
          </Col>
          <Col>
            <Document
              file="relativity.pdf"
              onLoadSuccess={this.onDocumentLoad}
            >
              <Page pageNumber={this.state.pageNumber} />
            </Document>
            <p>Page {this.state.pageNumber} of {this.state.numPages}</p>
          </Col>

        </Row>
      </Grid>
    );
  }

  onChange (e){
    this.setState({textToConvert : e.target.value, message: null}); 
  }

  onLoadSuccess(value){
    this.setState({ numPages: value });
    console.log("value", value);
  }

}
