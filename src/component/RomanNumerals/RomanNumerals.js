import React from 'react';
import './RomanNumerals.css';
import _ from 'lodash';
import { Grid } from 'react-bootstrap';
class RomanNumerals extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      started: false,
      romanNumbers: {
        M: {number: 1000, extractor: {roman: "C", number: 100}, isExtractor: false},
        D: {number: 500, extractor:{roman: "C", number: 100}, isExtractor: false},
        C: {number: 100, extractor:{roman: "X", number: 10}, isExtractor: true, grouped: "D"},
        L: {number: 50, extractor:{roman: "X", number: 10}, isExtractor: false},
        X: {number: 10, extractor:{roman: "I", number: 1}, isExtractor: true, grouped:"L"},
        V: {number: 5, extractor:{roman: "I", number: 1}, isExtractor: false},
        I: {number: 1, extractor: null, isExtractor: true, grouped: "V"}
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

  numberToRoman = (valueToConvert) =>{
    this.setState({started: true});
    console.log(valueToConvert);
    var residue = valueToConvert;
    var romanNumber = "";
    _.forEach(this.state.romanNumbers, function(item, key){
      if(residue % item.number < residue){
        var repeated = Math.floor(residue/item.number);
        residue = residue % item.number;
        console.log(key, residue, repeated);
        if(repeated < 4){
          for(var i =0; i < repeated; i++){
            romanNumber += key;
          }
        }
        else{
          romanNumber += key + item.grouped;
        }
        
      }
    });
    console.log("the romanNumber", romanNumber);
  }

  render() {
    return (
      <Grid className="container-fluid RomanNumerals">
        {!this.state.started? this.numberToRoman(1666) : null}
      </Grid>
    );
  }
}
export default RomanNumerals;
