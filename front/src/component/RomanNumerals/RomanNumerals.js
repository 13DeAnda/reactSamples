import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import './RomanNumerals.css';
import _ from 'lodash';


export default class RomanNumerals extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.romanToNumber = this.romanToNumber.bind(this);
    this.numberToRoman = this.numberToRoman.bind(this);
    this.convert = this.convert.bind(this);

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

  render() {
    return (
      <Grid className="RomanNumerals container text-center" >
        <Row className='title'> Convert Roman Numbers </Row>
        <Row>
          <input type="text" value={this.state.textToConvert} placeholder= "ex: XV or ex: 15" onChange={this.onChange} className='textInput'/><br/>
          <button onClick={this.convert}
                  className='convertButton'> Convert Numer </button><br/>
          <Row className={this.state.message? 'convertedValue error' : 'convertedValue'} >
            {this.state.message? this.state.message :this.state.converted}
          </Row>
        </Row>
      </Grid>
    );
  }

  //logic
  romanToNumber (valueToConvert){
    valueToConvert = valueToConvert.toUpperCase();
    var finalConvertedNumber = 0;

    for(var i = 0; i < valueToConvert.length; i++){
      var letter = valueToConvert[i];
      var nextLetter = valueToConvert[i+1];

      var letterObj = this.state.romanNumbers[letter];
      if(!letterObj){
        this.setState({message: "Invalid Input", converted: null});
        return "Invalid Input";
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

  numberToRoman (valueToConvert){
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

  convert (valueToConvert){
    var value = "";
    if(isNaN(this.state.textToConvert)){
      value = this.romanToNumber(this.state.textToConvert)
    }
    else{
      value = this.numberToRoman(this.state.textToConvert);
    }

    this.setState({converted: value});
    return value;
  }

  onChange (e){
    this.setState({textToConvert : e.target.value, message: null, converted: null});
  }

}
