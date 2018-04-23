import React from 'react';
import './RomanNumerals.css';
import { Grid } from 'react-bootstrap';
class RomanNumerals extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      started: false,
      romanNumbers: {
        M: {number: 1000, extractor: {roman: "C", number: 100}, isExtractor: false},
        D: {number: 500, extractor:{roman: "C", number: 100}, isExtractor: false},
        C: {number: 100, extractor:{roman: "X", number: 10}, isExtractor: true},
        L: {number: 50, extractor:{roman: "X", number: 10}, isExtractor: false},
        X: {number: 10, extractor:{roman: "I", number: 1}, isExtractor: true},
        V: {number: 5, extractor:{roman: "I", number: 1}, isExtractor: false},
        I: {number: 1, extractor: null, isExtractor: true}
      }
    };
  }

  romanToNumber = (valueToConvert) =>{
    this.setState({started: true});
    console.log(valueToConvert);
    var finalConvertedNumber = 0;

    for(var i = 0; i < valueToConvert.length; i++){
      var letter = valueToConvert[i];
      var nextLetter = valueToConvert[i+1];

      var letterObj = this.state.romanNumbers[letter];
      var nextLetterObj = nextLetter? this.state.romanNumbers[nextLetter] : null;

      if(nextLetter && 
        letterObj.isExtractor && 
        nextLetterObj.extractor && 
        nextLetterObj.extractor.roman === letter){

          finalConvertedNumber += (nextLetterObj.number - letterObj.number);
          i++;
      }
      else{
        finalConvertedNumber += letterObj.number;
      }
    }
    console.log("the final", finalConvertedNumber);
  }

  render() {
    return (
      <Grid className="container-fluid RomanNumerals">
        {!this.state.started? this.romanToNumber('CII') : null}
      </Grid>
    );
  }
}
export default RomanNumerals;
