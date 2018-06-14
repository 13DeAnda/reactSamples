import _ from 'lodash';

export default function  concatJsonIntoSring(object){
  var finalString = "";

  _.forEach(object, function(value, key){
    var newKey = key.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
    finalString+= newKey + ":" + value + "; ";
  });

  return finalString;
}
