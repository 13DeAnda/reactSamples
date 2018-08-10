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
    this.addHighlight = this.addHighlight.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.saveHighlight = this.saveHighlight.bind(this);
    this.updatePdfPage = this.updatePdfPage.bind(this);

    this.state = {
      userNotes: [],
      displayHighlightZone: false
    };
  }

  render() {
    var {userNotes, displayHighlightZone, textToAdd, pdfPage, addNoteError} = this.state;
    return (
      <Grid className="pdfNotes">
        <Row>
          <Col className='sidePdfNotes text-center' sm={4}>
            <Row className='notesHeader'>
              <Col sm={6} className='text-left'>
                <b>Notes</b>
              </Col>
              <Col sm={6} className='text-right'>
                {displayHighlightZone? null:
                  <a onClick={()=>this.showHighlight(true)} disabled={!textToAdd}>
                    Add Note </a>
                }
              </Col>
            </Row>
            <Row className="notesContainer">
              {displayHighlightZone?
                <div>
                <div className='text-right'>
                  <a className='text-right'
                     onClick={()=>this.showHighlight(false)}
                     disabled={!textToAdd}> X </a>
                </div>

                  <textarea value={textToAdd}
                          className='highlightNote'
                          placeholder='add highlight note'
                          onChange={this.onChange}/>

                  {addNoteError? <div className='error'> {addNoteError} </div>:null}
                  <button onClick={this.saveHighlight}> save </button>
                </div>
              :null}
              {userNotes.length === 0?
                <div className ={displayHighlightZone? 'hidden' : 'text-center'}> N/A </div>:
                userNotes.map(function(highlight, index){
                  return (
                    <Row key={index}>
                      <Col sm={2} className='highlightPage'>
                        <a onClick={() => this.addHighlight(highlight.style, highlight.page, true)}> {highlight.page}</a>
                      </Col>
                      <Col sm={8}>{highlight.note? highlight.noteBrief : 'N/A'}</Col>
                      <Col sm={1}> <a onClick={() => this.deleteNote(index)}>X</a></Col>
                    </Row>
                  )
                }, this)}
            </Row>

          </Col>
          <PdfViewer displayHighlightZone={displayHighlightZone}
                     addHighlight={this.addHighlight}
                     saveHighlight={this.saveHighlight}
                     updatePdfPage={this.updatePdfPage}
                     pdfPage={pdfPage}/>
        </Row>
      </Grid>
    );
  }
  //logic
  showHighlight(value){
    this.setState({displayHighlightZone: value, pdfPage: null});
  }
  addHighlight(finalStyle, page){
    if(finalStyle){
     var pdfContainer = document.getElementsByClassName("react-pdf__Page__textContent")[0];
     ReactDOM.render(<Highlight styleToPass= {finalStyle} />, pdfContainer);
     // forcing a rendered component into a the pdf
     this.setState({
        tempHighlight:{finalStyle: finalStyle, page: page},
        pdfPage: page
     });
    }
  }

  deleteNote(index){
    var newNotes = this.state.userNotes.length >1?  _.cloneDeep(this.state.userNotes) : [];

    newNotes.splice(index +1, this.state.userNotes.length);
    this.setState({userNotes: newNotes});
  }

  saveHighlight(){
    var textToAdd = this.state.textToAdd;

    if((textToAdd && textToAdd.length > 0) || this.state.tempHighlight){
      var notes = _.cloneDeep(this.state.userNotes);
      var brief = textToAdd.length > 10? textToAdd.slice(0,10) +"..." : textToAdd;
      var page = this.state.tempHighlight? this.state.tempHighlight.page: this.state.pdfPage;

      var newNote = { note: textToAdd,
                      noteBrief: brief,
                      page: page
                    };

      if(this.state.tempHighlight){
        newNote.highlight = _.cloneDeep(this.state.tempHighlight);
        newNote.style =  _.cloneDeep(this.state.tempHighlight.finalStyle);

      }

      notes.push(newNote);

      this.setState({userNotes: notes,
                     displayHighlightZone: false,
                     tempHighlight: null,
                     textToAdd: "",
                     pdfPage: "refresh"
      });

    }
    else{
      this.setState({addNoteError: "*Please make sure to add at least a highlight or text"});
    }
  }

  updatePdfPage(page){
    if(this.state.pdfPage !== page){
      this.setState({pdfPage: page});
    }
  }

  onChange (e) {
    this.setState({textToAdd : e.target.value});
  }

}
