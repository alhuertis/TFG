 'use strict'


   var LexicalResource = require("../models/diccionario");
   if(typeof require !== 'undefined') var XLSX = require('xlsx');



 	var workbook = XLSX.readFile("./excel/exportacion_excel23_12_2016.xls");


  var worksheet = workbook.Sheets['Datos'];
  var csv = XLSX.utils.sheet_to_csv(worksheet, {FS: '|'});
  var LexicalEntry = csv.split("\n");
  var lr = new LexicalResource();



  function getDiccionario(req, res){

      //Datos que se puede pasar por parametro
  lr.GlobalInformation.feat.push({att: "languageCoding", val:"ISO639-3"});
  lr.GlobalInformation.feat.push({att: "title", val:"Diccionario Didáctico Latín"});
  lr.GlobalInformation.feat.push({att: "URL", val:"http://repositorios.fdi.ucm.es/DiccionarioDidacticoLatin/"});
  lr.Lexicon.feat.push({att: "language" , val: "spa"});


 for (var i = 2 ; i <  LexicalEntry.length - 1; i++) {

     introducirCategoria(LexicalEntry[i]);
     
  };

  res.status(200).send({"LexicalResource" :lr});

  }
  	


function introducirCategoria(LexicalEntry){

  
    var campos = LexicalEntry.split("|");

    switch(campos[3]){

      case "Sustantivo":
        categoriaSustantivo(campos);
      break;
      case "Adjetivo":
        categoriaAdjAdvPronPrepConj(campos,"adjective");
      break;
      case "Adverbio":
        categoriaAdjAdvPronPrepConj(campos,"adverb");
      break;
      case "Pronombre":
        categoriaAdjAdvPronPrepConj(campos,"pronoun");
      break;
      case "Preposición":
        categoriaAdjAdvPronPrepConj(campos,"preposition");
      break;
      case "Conjunción":
       categoriaAdjAdvPronPrepConj(campos,"conjunction");
      break;
      case "Verbo":
       //categoriaVerbo(campos);
      break;

    }
}

function categoriaSustantivo(campos){

  var i=4;
      var s=0;
      var sense= new Array();
      var st;
      var sa;

      while ( i < campos.length) {
        if(campos[i]){
          var st= campos[i+1].split(/\s+/)[0];
          var sa= campos[i+1].split(/\s+/)[1];
          sense.push({
            "id": "id"+campos[0]+"."+(s+1),
            "Definition": [{
              "feat": [{ "att": "text" , "val": campos[i]}]
            }],
            "fs": [{
              "feat":[{ "att": "semanticType" , "val": st},
                      { "att": "semanticAnimacy" , "val": sa}]
            }]
          });  
          s++;
          i++;
        }
        i++;
      };

     
        lr.Lexicon.LexicalEntry.push({
          id: "id"+campos[0],
          feat:[{ att: "partOfSpeech" ,val: "noun" }],
          Lemma:{ feat:[{ att: "writtenForm" ,val: campos[1] }]},
          Sense: sense
        });

}


     function categoriaAdjAdvPronPrepConj(campos,tipo){

      var i=4;
      var s=0;
      var sense= new Array();
      var st;
      var sa;

      while ( i < campos.length) {
        if(campos[i]){
          sense.push({
            "id": "id"+campos[0]+"."+(s+1),
            "Definition": [{
              "feat": [{ "att": "text" , "val": campos[i]}]
            }]
          });  
          s++;
        }
        i++;
      };

     
        lr.Lexicon.LexicalEntry.push({
          id: "id"+campos[0],
          feat:[{ att: "partOfSpeech" ,val: "tipo" }],
          Lemma:{ feat:[{ att: "writtenForm" ,val: campos[1] }]},
          Sense: sense
        });


     }
    

    function categoriaVerbo(campos){



      var i=4;
      var s=0;
      var sense= new Array();
      var st;
      var sa;
      var cont=0;

     
        lr.Lexicon.LexicalEntry.push({
          id: "id"+campos[0],
          feat:[{ att: "partOfSpeech" ,val: "verb" }],
          Lemma:{ feat:[{ att: "writtenForm" ,val: campos[1] }]},
          Sense: sense
        });

    }


module.exports = {

 getDiccionario
}