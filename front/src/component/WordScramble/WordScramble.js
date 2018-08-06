import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import '../../shared/shared.css';
import './WorldScramble.css';
import { Grid, Row, Modal} from 'react-bootstrap';
import ReactInterval from 'react-interval';
export default class WordScramble extends React.Component {

  constructor(props) {
    super(props);
    this.scrambleText = this.scrambleText.bind(this);
    this.onChange = this.onChange.bind(this);
    this.checkForLetter = this.checkForLetter.bind(this);
    this.checkIfCorrect = this.checkIfCorrect.bind(this);
    this.interval = this.interval.bind(this);
    this.getWord = this.getWord.bind(this);
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

  componentDidMount(){
    this.getWord("responsible");
  }

  render() {
    var {enabled, scrambledWord, scrambledWordObj,
         message, usedLetters, userWord, timerCount, score} = this.state
    return (
      <Grid className="container WordScramble text-center">
        <Row className={scrambledWord? 'text-right' : 'hidden'}>
            <div className='counterContainer'>
              Time left: {timerCount}
              <ReactInterval timeout={1000} enabled={enabled} callback={this.interval} />
            </div>
            <button className='skipButton' onClick={this.getWord}> Skip Word </button>
        </Row>
        <Row className={scrambledWord? '' : 'hidden'}>
          <input type="text" className='userTextBox' placeholder='Type your word' value={userWord} onChange={this.onChange}/>
        </Row>
       <Row className="scrambledWordContainer">
          {usedLetters.map(function(item, index){
            return <div className ='letterBox foundLetter' key={index}>{item.letter} </div>
          })}

          {scrambledWordObj.map(function(item, index){
            return <div className = {item.used? 'hidden' : 'letterBox'} key={index}>{item.letter} </div>
          })}
        </Row>
        <Row className={score.length > 0 ? 'score' : 'hidden'}>
          matches:  {score}
        </Row>
        <Row className={message}>
          {message.length >0?
            message: null}
        </Row>

        <Modal show={this.state.gameOver} onHide={this.getWord}>
          <Modal.Body className='score text-center'>
              <div className="content"> Your Score: {this.state.score} </div> <br/>
              <button className='restartButton' onClick={this.getWord}>Start Over</button>
          </Modal.Body>
        </Modal>
      </Grid>
    );
  }
  //logic
  getWord(word) {
    //expects a word when its called on test only
    if(word && typeof word === "string"){
      this.scrambleText(word);
    }
    else{
      var that = this;
      axios.get('http://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=adverb&excludePartOfSpeech=verb&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=8&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5')
      .then(function(response){
        if(response.state === 200){
          that.scrambleText(response.data.word);
        }
      })
      .catch(function (error) {
        that.setState({message: "An error occurred with the API request",
                       correctWord: null,
                       scrambledWordObj: [],
                       scrambledWord: null});
      });
    }
  }

  scrambleText (word){
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
    return scrambledWord;
  }

  checkForLetter(newText){
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

  checkIfCorrect(newText){
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

  interval(){
    if(this.state.timerCount > 0 ){
      this.setState({timerCount: this.state.timerCount - 1});
    }
    else{
      this.setState({enabled: false, gameOver: true});
    }
  }

  onChange(e){
    const newText = e.target.value;
    this.checkForLetter(newText);
  }
}
