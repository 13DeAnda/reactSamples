import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import './PdfNotes.css';
import '../../shared/shared.css';

import Highlight from './Highlight';
import PdfViewer from './PdfViewer';

export default class PdfNotes extends React.Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.showHighlight = this.showHighlight.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addHighlight = this.addHighlight.bind(this);

    this.state = {
      userHighlights: [],
      displayHighlightZone: false
    };
  }

  render() {
    return (
      <Grid className="RomanNumerals">
        <Row>
          <Col className='sidePdfNotes text-center' sm={4}>
            <h3> Notes </h3>
            {this.state.userHighlights.length === 0?
              <div className ='text-center'> N/A </div>: null}
            {this.state.userHighlights.map(function(highlight, index){
              return (
                <Row key={index}>
                  <Col sm={2} className='highlightPage'><a onClick={() => this.addHighlight(highlight.style, true)}> {highlight.page}</a> </Col>
                  <Col sm={2}>{highlight.note? highlight.note : 'N/A'}</Col>
                </Row>
              )
            }, this)}

            {this.state.displayHighlightZone? null:
              <a className='text-right' onClick={()=>this.showHighlight(false)}> Add highlight </a>
            }
            {this.state.displayHighlightZone?
              <textarea value={this.state.textToAdd}
                        className='highlightNote'
                        placeholder='add highlight note'
                        onChange={this.onChange}/>
            :null}

          </Col>
          <Col sm={6}>
            <PdfViewer displayHighlightZone={this.state.displayHighlightZone}/>
          </Col>
        </Row>
      </Grid>
    );
  }

  showHighlight(value){
    this.setState({displayHighlightZone: value})
  }
  addHighlight(finalStyle, justDisplay){
    var pdfContainer = document.getElementsByClassName("react-pdf__Page__textContent")[0];
    ReactDOM.render(<Highlight styleToPass= {finalStyle} />, pdfContainer);

    if(!justDisplay){
      var highlights = _.cloneDeep(this.state.userHighlights);
      var newHighlight = {page: this.state.pageNumber, style: finalStyle,  note: this.state.textToAdd};

      highlights.push(newHighlight);
      this.setState({userHighlights: highlights});
    }

  }
  onChange (e) {
    this.setState({textToAdd : e.target.value});
  }
}
