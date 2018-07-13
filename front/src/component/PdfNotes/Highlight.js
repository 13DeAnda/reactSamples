import React from 'react';
import './PdfNotes.css';

export default class Highlight extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
     <div  className='finalHighlight'  id="finalHighlight" style={this.props.styleToPass}></div>
    );
  }

}
