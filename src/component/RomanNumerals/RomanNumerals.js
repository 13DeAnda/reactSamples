import React from 'react';
import './RomanNumerals.css';
import { Grid } from 'react-bootstrap';
class RomanNumerals extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      started: false,
    };
  }

  romanToNumber = (arg) =>{
    this.setState({started: true});
    var romanNumbers = [
      {roman: "C", number: 1000, extractor: null, isExtractor: false},
      {roman: "D", number: 500, extractor:{roman: "C", number: "100"}, isExtractor: false},
      {roman: "C", number: 100, extractor:{roman: "X", number: "10"}, isExtractor: true},
      {roman: "L", number: 50, extractor:{roman: "X", number: "10"}, isExtractor: false},
      {roman: "X", number: 10, extractor:{roman: "I", number: "1"}, isExtractor: true},
      {roman: "V", number: 5, extractor:{roman: "I", number: "1"}, isExtractor: false},
      {roman: "I", number: 1, extractor: null, isExtractor: true}
    ];

    var finalConvertedNumber = 0;
    var numberToConvert = parseInt(arg);
    

    for(var i = 0; i < arg.length; i++){
      var letter = arg[i];
      console.log("the arg", arg[i]);
      for(var j = 0; j < romanNumbers.length; j++){
        var romanObj = romanNumbers[j];
        //if it has a next number check if the next number matches the extractor
        console.log("thorugh", romanObj, arg[i+1])
        if(letter === romanObj.roman && 
           arg[i+1] && 
           romanObj.isExtractor && 
           romanObj.extractor && 
           romanObj.extractor === arg[i+1]){

          finalConvertedNumber +=  (arg[i+1].number - romanObj.number);
          i++;
          break;
        }
        // else if(letter === romanObj.roman){
        //   finalConvertedNumber +=romanObj.number;
        //   break;
        // }
      }
      
    }
    console.log("the final", finalConvertedNumber);
  }

  render() {
    return (
      <Grid className="container-fluid RomanNumerals">
        {!this.state.started? this.romanToNumber('IV') : null}
      </Grid>
    );
  }
}
export default RomanNumerals;
