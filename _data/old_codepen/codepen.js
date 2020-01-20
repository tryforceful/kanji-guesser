//var and const
let API_key = "85d30cecd3fb1532a0f06036bfa751af";

let cache = {
  kanji: null,
  vocab: null
};

var getJSON = function(url, callback) {
  callback(null, null);
  return;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

let getKanji = function() {
  getJSON("https://www.wanikani.com/api/user/" + API_key + "/kanji", function(
    err,
    data
  ) {
    if (err !== null) {
      alert("Something went wrong: " + err);
    } else {
      processKanji(data);
    }
    _postGetKanji();
  });
};

function _postGetKanji() {
  getJSON(
    "https://www.wanikani.com/api/user/" + API_key + "/vocabulary",
    function(err, data) {
      if (err !== null) {
        alert("Something went wrong: " + err);
      } else {
        processVocab(data);
      }
      _postGetVocab();
    }
  );
}

let processKanji = function(data) {
  console.log(data.requested_information[0]);

  let output = data.requested_information;
  cache.kanji = output;
  return;
  //////////

  document.getElementsByTagName("h1")[0].innerHTML =
    data.user_information.username;

  let stringOfKanji = "";
  for (let i = 0; i < output.length; i++) {
    stringOfKanji += output[i].character + " ";
  }

  document.getElementsByTagName("h2")[0].innerHTML = stringOfKanji;
};

let processVocab = function(data) {
  console.log(data.requested_information.general[0]);

  let output = data.requested_information.general;
  cache.vocab = output;
  return;
  /////////////////////

  let stringOfVocab = "";
  for (let i = 0; i < output.length; i++) {
    stringOfVocab += output[i].character + " ";
  }

  document.getElementsByTagName("h2")[1].innerHTML = stringOfVocab;
};

//  Returns array r
//  r[0] is the original string with kanji substituted with underscores
//  r[1], r[2]... are the individual kanji characters that were pulled out of the string
let tokenize_word = function(word) {
  let tokenized = "";
  let kanjiArray = [];

  for (let i = 0; i < word.length; ++i) {
    let charr = word[i];
    if (isKanji(charr)) {
      kanjiArray.push(charr);
      tokenized += "_";
    } else {
      tokenized += word[i];
    }
  }

  return { word: tokenized, kanji: kanjiArray };
};

let isKanji = function(char) {
  return char == "映" || char == "画" ? true : false;
};

function _postGetVocab() {
  document.getElementById("loading").innerHTML = "";

  let word = "映画";
  let r = tokenize_word(word);
  let replaced_word = r.word;
  let guess_kanji_array = r.kanji;

  console.log(r);
  console.log(replaced_word, guess_kanji_array);
}

// main script
function main() {
  getKanji();
}

console.clear();
main();
// end main script
