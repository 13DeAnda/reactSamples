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
    this.deleteNote = this.deleteNote.bind(this);
    this.saveHighlight = this.saveHighlight.bind(this);

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
                  <Col sm={2} className='highlightPage'><a onClick={() => this.addHighlight(highlight.style, highlight.page, true)}> {highlight.page}</a> </Col>
                  <Col sm={8}>{highlight.note? highlight.note : 'N/A'}</Col>
                  <Col sm={1}> <a onClick={() => this.deleteNote(index)}>X</a></Col>
                </Row>
              )
            }, this)}

            {this.state.displayHighlightZone? null:
              <a className='text-right' onClick={()=>this.showHighlight(true)}> Add highlight </a>
            }
            {this.state.displayHighlightZone?
              <div>
                <textarea value={this.state.textToAdd}
                        className='highlightNote'
                        placeholder='add highlight note'
                        onChange={this.onChange}/>
                <button onClick={this.saveHighlight}> save </button>
              </div>
            :null}

          </Col>
          <Col sm={6}>
            <PdfViewer displayHighlightZone={this.state.displayHighlightZone}
                       addHighlight={this.addHighlight}
                       saveHighlight={this.saveHighlight}/>
          </Col>
        </Row>
      </Grid>
    );
  }

  showHighlight(value){
    this.setState({displayHighlightZone: value})
  }
  addHighlight(finalStyle, page){
    if(finalStyle){
     var pdfContainer = document.getElementsByClassName("react-pdf__Page__textContent")[0];
     ReactDOM.render(<Highlight styleToPass= {finalStyle} />, pdfContainer);
     this.setState({
        tempHighlight:{finalStyle: finalStyle, page: page}
     });
    }
  }

  deleteNote(index){
    var newNotes = this.state.userHighlights.length >1?  _.cloneDeep(this.state.userHighlights) : [];

    newNotes.splice(index +1, this.state.userHighlights.length);
    this.setState({userHighlights: newNotes});
  }

  saveHighlight(){
    console.log("trying to save highlights");
      var highlights = _.cloneDeep(this.state.userHighlights);
      var newHighlight = {page: this.state.tempHighlight.page,
                          style: this.state.tempHighlight.finalStyle,
                          note: this.state.textToAdd};

      highlights.push(newHighlight);
      this.setState({userHighlights: highlights,
                     displayHighlightZone: false,
                     tempHighlight: null,
                     textToAdd: ""
      });
    document.getElementById('finalHighlight').style = {};
  }
  onChange (e) {
    this.setState({textToAdd : e.target.value});
  }

}
