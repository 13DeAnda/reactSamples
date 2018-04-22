import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import './WorldScramble.css';
import { Grid, Row, Modal, Button } from 'react-bootstrap';
import ReactInterval from 'react-interval';
class WordScramble extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userWord: "",
      scrambledWord: "",
      scrambledWordObj: [],
      scrambledWordObjCopy: [],
      usedLetters: [],
      correctWord: "",
      score: 0,
      timerCount: 0,
      enabled: false,
      message: ""
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
    console.log("scrambling text again");
    var scrambledWord = "";
    var usedIndex = {};
    var scrambledWordTemp = [];

    while(scrambledWord.length !== word.length){
      var randomIndex = Math.floor(Math.random() * word.length) + 0;
      if(!usedIndex[randomIndex]){
        usedIndex[randomIndex] = true;
        scrambledWord += word[randomIndex];
        scrambledWordTemp.push({letter: word[randomIndex], used: false})
      }
    }

    var toUpdate = {scrambledWord: scrambledWord, 
                   correctWord: word, 
                   scrambledWordObjCopy: scrambledWordTemp,
                   scrambledWordObj: scrambledWordTemp,
                   gameOver: false};

    if(!this.state.enabled){
      toUpdate.enabled = true;
      toUpdate.timerCount = 60;
    }
    this.setState(toUpdate);
  }

  onChange = (e) => {
    const newText = e.target.value;
    this.checkForLetter(newText);
  }

  checkForLetter = (newText) => {
    var inWordText = "";
    var usedLetters = [];
    var scrambledWordObjTemp = _.cloneDeep(this.state.scrambledWordObjCopy);
    _.forEach(newText, function(letter){

      _.forEach(scrambledWordObjTemp, function(item){
        if(!item.used && item.letter === letter){
          item.used = true;
          usedLetters.push({letter: item.letter});
          inWordText += item.letter;
          return false
        }
      });     
    });
    this.setState({userWord: inWordText, usedLetters: usedLetters, scrambledWordObj: scrambledWordObjTemp});
    this.checkIfCorrect(newText);
  }

  checkIfCorrect = (newText) =>{
    if(newText === this.state.correctWord){
      var score = _.cloneDeep(this.state.score);
      this.setState({score: ++score, message: "correct"});
      setTimeout(function() { 
        this.setState({message: "", usedLetters: [], userWord: ""});
        this.getWord();
      }.bind(this), 2000);
    }
    else if(newText.length === this.state.correctWord.length){
      this.setState({message: "incorrect"});
      setTimeout(function() { 
        this.setState({message: ""});
      }.bind(this), 2000);
    }
  }

  interval = () =>{
    if(this.state.timerCount > 0 ){
      this.setState({timerCount: this.state.timerCount - 1});
    }
    else{
      this.setState({enabled: false, gameOver: true});
    }
  }

  render() {
    return (
      <Grid className="container-fluid WordScramble">
        {this.state.scrambledWord.length === 0 && !this.state.enabled? this.getWord() : null}
        <Row className="text-rigth">
            <div className='counterContainer'>
              Time left: {this.state.timerCount}
              <ReactInterval timeout={1000} enabled={this.state.enabled} callback={this.interval} />
            </div>
            <button className='skipButton' onClick={this.getWord}> Skip Word </button> 
        </Row>
        <Row className="text-center"> 
          <input type="text" className='userTextBox' placeholder='Type your word' value={this.state.userWord} onChange={this.onChange}/>
        </Row>
       <Row className="scrambledWordContainer text-center">
          {this.state.usedLetters.map(function(item, index){
            return <div className ='letterBox foundLetter' key={index}>{item.letter} </div>
          })}

          {this.state.scrambledWordObj.map(function(item, index){
            return <div className = {item.used? 'hide' : 'letterBox'} key={index}>{item.letter} </div>
          })}
        </Row>
        <Row className="text-center score">
          matches:  {this.state.score}
        </Row>
        <Row className={this.state.message}>
          {this.state.message.length >0?
            this.state.message: null}
        </Row>

        <Modal show={this.state.gameOver} onHide={this.getWord}>
          <Modal.Body className='text-center score'>
              your score: {this.state.score} <br/>
              <Button className='restartButton' onClick={this.getWord}>Start Over</Button>
          </Modal.Body>
        </Modal>
      </Grid>
    );
  }
}
export default WordScramble;
