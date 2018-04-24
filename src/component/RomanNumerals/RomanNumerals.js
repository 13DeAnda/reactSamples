import React from 'react';
import './RomanNumerals.css';
import _ from 'lodash';
import { Grid, Row } from 'react-bootstrap';
import './RomanNumerals.css';

class RomanNumerals extends React.Component {

//BUg 4554

  constructor(props) {
    super(props);
    this.state = {
      textToConvert: "",
      converted: "",
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
    valueToConvert = valueToConvert.toUpperCase();
    var finalConvertedNumber = 0;

    for(var i = 0; i < valueToConvert.length; i++){
      var letter = valueToConvert[i];
      var nextLetter = valueToConvert[i+1];

      var letterObj = this.state.romanNumbers[letter];

      if(!letterObj){
        this.setState({message: "Invalid Input"});
        break;
      }

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
    return finalConvertedNumber;
  }

  numberToRoman = (valueToConvert) =>{
    var residue = valueToConvert;
    var romanNumber = "";
    _.forEach(this.state.romanNumbers, function(item, key){
      if(residue % item.number < residue){
        var repeated = Math.floor(residue/item.number);
        residue = residue % item.number;
        if(repeated < 4 || key === "M"){
          for(var i =0; i < repeated; i++){
            romanNumber += key;
          }
        }
        else{
          romanNumber += key + item.grouped;
        }
        
      }
    });
    return romanNumber;
  }

  convert = (valueToConvert) =>{
    var value = "";
    if(isNaN(this.state.textToConvert)){
      value = this.romanToNumber(this.state.textToConvert)
    }
    else{
      value = this.numberToRoman(this.state.textToConvert);
    }

    this.setState({converted: value});
  }

  onChange = (e) => {
    const newText = e.target.value;  
    this.setState({textToConvert : newText}); 
  }

  render() {
    return (
      <Grid className="container-fluid RomanNumerals">
        <Row className="text-center">
          <input type="text" value={this.state.textToConvert} onChange={this.onChange}/><br/>
          <button onClick={this.convert}> Convert Numer </button><br/>
          {this.state.converted}
        </Row>
      </Grid>
    );
  }
}
export default RomanNumerals;
