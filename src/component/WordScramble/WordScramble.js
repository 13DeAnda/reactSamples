import React from 'react';
import axios from 'axios'
class WordScramble extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userWord: "",
      scrambledWord: "",
      scrambledWordObj: [],
      correctWord: "",

    };
  }

  getWord = () =>  {
    var that = this;
    axios.get('http://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=adverb&excludePartOfSpeech=verb&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=8&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5')
      .then(function(response){
        console.log("the response", response.data.word);
        that.setState({correctWord: response.data.word});
        that.scrambleText(response.data.word);
      })
  }

  scrambleText = (word) =>{
    var scrambledWord = "";
    var usedIndex = {};

    while(scrambledWord.length !== word.length){
      var randomIndex = Math.floor(Math.random() * word.length) + 0;
      if(!usedIndex[randomIndex]){
        usedIndex[randomIndex] = true;
        scrambledWord += word[randomIndex];
        this.state.scrambledWordObj.push({letter: word[randomIndex], used: false})
      }
    }
    this.setState({scrambledWord: scrambledWord});
  }

  onChange = (e) => {
    const newText = e.target.value;  
    this.setState({userWord : newText}); 
  }
  render() {

    return (
      <div>
        <div>
          <button onClick={this.getWord}> Get Word </button> <br/>
          {this.state.correctWord} <br/>
          {this.state.scrambledWord}
        </div>

        <div>
          {this.state.scrambledWordObj.map(function(item, index){
            return <div key={index}>{item.letter}</div>
          })}
        </div>
      </div>
    );
  }
}
export default WordScramble;
