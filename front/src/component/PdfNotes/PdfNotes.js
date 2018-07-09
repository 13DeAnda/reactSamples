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

    this.state = {
      userHighlights: [],
      displayHighlightZone: false
    };
  }


  render() {
    var {userHighlights, displayHighlightZone, textToAdd, pdfPage, addNoteError} = this.state;
    return (
      <Grid className="PdfNotes">
        <Row>
          <Col className='sidePdfNotes text-center' sm={4}>
            <h3> Notes </h3>
            {userHighlights.length === 0?
              <div className ='text-center'> N/A </div>:
              userHighlights.map(function(highlight, index){
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

            {displayHighlightZone? null:
              <a className='text-right'
                 onClick={()=>this.showHighlight(true)}
                 disabled={!textToAdd}> Add highlight </a>
            }
            {displayHighlightZone?
              <div>
                <textarea value={textToAdd}
                        className='highlightNote'
                        placeholder='add highlight note'
                        onChange={this.onChange}/>

                {addNoteError? <div className='error'> {addNoteError} </div>:null}
                <button onClick={this.saveHighlight}> save </button>
              </div>
            :null}

          </Col>
          <Col sm={6}>
            <PdfViewer displayHighlightZone={displayHighlightZone}
                       addHighlight={this.addHighlight}
                       saveHighlight={this.saveHighlight}
                       pdfPage={pdfPage}/>
          </Col>
        </Row>
      </Grid>
    );
  }

  showHighlight(value){
    this.setState({displayHighlightZone: value, pdfPage: null});
  }
  addHighlight(finalStyle, page){
    if(finalStyle){
     var pdfContainer = document.getElementsByClassName("react-pdf__Page__textContent")[0];
     ReactDOM.render(<Highlight styleToPass= {finalStyle} />, pdfContainer);
     this.setState({
        tempHighlight:{finalStyle: finalStyle, page: page},
        pdfPage: page
     });
    }
  }

  deleteNote(index){
    var newNotes = this.state.userHighlights.length >1?  _.cloneDeep(this.state.userHighlights) : [];

    newNotes.splice(index +1, this.state.userHighlights.length);
    this.setState({userHighlights: newNotes});
  }

  saveHighlight(){
    var textToAdd = this.state.textToAdd;
    if((textToAdd && textToAdd.length > 0) || this.state.tempHighlight){
      var highlights = _.cloneDeep(this.state.userHighlights);

      var brief = textToAdd.length > 10? textToAdd.slice(0,10) +"..." : textToAdd;

      if(this.state.tempHighlight){
        var newHighlight = {page: this.state.tempHighlight.page,
                          style: this.state.tempHighlight.finalStyle,
                          note: textToAdd,
                          noteBrief: brief
                        };
        highlights.push(newHighlight);
      }



      this.setState({userHighlights: highlights,
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

  onChange (e) {
    this.setState({textToAdd : e.target.value});
  }

}
