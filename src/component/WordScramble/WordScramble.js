import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import './WorldScramble.css';
import { Grid, Col, Row } from 'react-bootstrap';

class WordScramble extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userWord: "",
      scrambledWord: "",
      scrambledWordObj: [],
      scrambledWordObjCopy: [],
      correctWord: "",
      score: 0
    };
  }

  getWord = () =>  {
    var that = this;
    axios.get('http://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=adverb&excludePartOfSpeech=verb&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=8&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5')
      .then(function(response){
        console.log("the word", response.data.word);
        that.scrambleText(response.data.word);
      })
  }

  scrambleText = (word) =>{
    var scrambledWord = "";
    var usedIndex = {};
    this.state.scrambledWordObj = [];

    while(scrambledWord.length !== word.length){
      var randomIndex = Math.floor(Math.random() * word.length) + 0;
      if(!usedIndex[randomIndex]){
        usedIndex[randomIndex] = true;
        scrambledWord += word[randomIndex];
        this.state.scrambledWordObj.push({letter: word[randomIndex], used: false})
      }
    }
    this.setState({scrambledWord: scrambledWord, 
                   correctWord: word, 
                   scrambledWordObjCopy: this.state.scrambledWordObj});
  }

  onChange = (e) => {
    const newText = e.target.value;
    this.checkForLetter(newText);
  }

  checkForLetter = (newText) => {
    this.state.scrambledWordObj = _.cloneDeep(this.state.scrambledWordObjCopy);
    var that = this;
    _.forEach(newText, function(letter){
      _.forEach(that.state.scrambledWordObj, function(item){
        if(!item.used && item.letter === letter){
          item.used = true;
          return false
        }
      });     
    });

    this.setState({userWord: newText});
    this.checkIfCorrect(newText);
  }

  checkIfCorrect = (newText) =>{

    if(newText === this.state.correctWord){
      this.setState({score: this.state.score++, message: "correct!"});
      setTimeout(function() { 
        console.log("the timeout ended");
      }.bind(this), 6000);
    }
    else if(newText.length >= this.state.correctWord){
      this.setState({message: "Incorrect"});
    }
  }
  render() {
    {this.state.scrambledWord.length === 0? this.getWord() : null};
    return (
      <Grid className="container-fluid WordScramble">
        <Row className="text-center">
          {this.state.message} score:: {this.state.score}
        </Row>
        <Row className="text-center">
            <button onClick={this.getWord}> Skip Word </button> 
        </Row>
        <Row className="text-center"> 
          <input type="text" value={this.state.userWord} onChange={this.onChange}/>
        </Row>
       <Row className="scrambledWordContainer text-center">
          {this.state.scrambledWordObj.map(function(item, index){
            return <div className = {item.used? 'letterBox foundLetter' : 'letterBox'} key={index}>{item.letter} </div>
          })}
        </Row>
      </Grid>
    );
  }
}
export default WordScramble;
