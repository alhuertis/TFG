 'use strict'


 var LexicalResource = require("../models/diccionario");
 if (typeof require !== 'undefined') var XLSX = require('xlsx');



 var workbook = XLSX.readFile("./excel/exportacion_excel23_12_2016.xls");


 var worksheet = workbook.Sheets['Datos'];
 var csv = XLSX.utils.sheet_to_csv(worksheet, {
     FS: '|'
 });
 var LexicalEntry = csv.split("\n");
 var lr ;


function  getDiccionario(req, res){
     	LexicalResource.findOne((err, lr) => {
 		if(err){
 			res.status(500).send({message: 'Error al devolver los datos'});
 		}else{

 		if(!lr){
 			res.status(404).send({message: 'No hay datos'});
 		}else{
            var le= lr.Lexicon.LexicalEntry[0]; 
               console.log(JSON.stringify(le.id)); 
 				res.status(200).send({lr});
 		}

 		}

 	
 	});
}

function  getPalabra(req, res){
    
    var palabra= req.params.palabra;
     	LexicalResource.findOne({'Lexicon.LexicalEntry.Lemma.feat.val':{$regex:palabra}},(err, lr) => {
 		if(err){
 			res.status(500).send({message: 'Error al devolver los datos'});
 		}else{
             
 		if(lr!=null){

          if(lr.Lexicon.LexicalEntry[0].feat[0].val=="verb"){
            var Caracterizacion= lr.Lexicon.LexicalEntry[0].Sense[0].PredicativeRepresentation[0].SemanticPredicate; 
             res.status(200).send({Carac});
          }  
          if(lr.Lexicon.LexicalEntry[0].feat[0].val=="noun"){
                var Caracterizacion= lr.Lexicon.LexicalEntry[0].Sense;  

                for(var i=0; i<Caracterizacion.length;i++){
                    if(Caracterizacion[i].Definition[0].feat[0].val==palabra){
                        var Carac= Caracterizacion[i].fs[0].feat;
                    }
                }
               
          }     
 				res.status(200).send({Caracterizacion});
 			
 		}else{
            res.status(404).send({message: 'No hay datos'});
 		}

 		}

 	
 	});
}


 function saveDiccionario(req, res) {

 
    var save=true;
     for (var i = 2; i < LexicalEntry.length - 1; i++) {

            lr = new LexicalResource();
     //Datos que se puede pasar por parametro
     lr.GlobalInformation.feat.push({
         att: "languageCoding",
         val: "ISO639-3"
     });
     lr.GlobalInformation.feat.push({
         att: "title",
         val: "Diccionario Didáctico Latín"
     });
     lr.GlobalInformation.feat.push({
         att: "URL",
         val: "http://repositorios.fdi.ucm.es/DiccionarioDidacticoLatin/"
     });
     lr.Lexicon.feat.push({
         att: "language",
         val: "spa"
     });


         introducirCategoria(LexicalEntry[i], LexicalEntry[0].split("|"));
            var id="id"+LexicalEntry[i].split("|")[0];
      	
           	LexicalResource.update({'Lexicon.LexicalEntry.id':id},{$setOnInsert: lr}, 
    {upsert: true}, (err, lrStored) =>{
 		if(err){
 			//res.status(500).send({message: 'Error al guardar'}); 
             save=false;
 		}else{
 			//res.status(200).send({lr: lrStored})
 		}
 		
 	});
    

    };

if(save){
    console.log("Diccionario cargado correctamente");
}else
{
    console.log("Error al cargar el diccionario");
}
   

 }



 function introducirCategoria(LexicalEntry, encabezado) {


     var campos = LexicalEntry.split("|");

     switch (campos[3]) {

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
             categoriaVerbo2(campos, encabezado);
             break;

     }
 }

 function categoriaSustantivo(campos) {

     var i = 4;
     var s = 0;
     var sense = new Array();
     var st;
     var sa;

     while (i < campos.length) {
         if (campos[i]) {
             var st = campos[i + 1].split(/\s+/)[0];
             var sa = campos[i + 1].split(/\s+/)[1];
             sense.push({
                 "id": "id" + campos[0] + "." + (s + 1),
                 "Definition": [{
                     "feat": [{
                         "att": "text",
                         "val": campos[i]
                     }]
                 }],
                 "fs": [{
                     "feat": [{
                             "att": "semanticType",
                             "val": st
                         },
                         {
                             "att": "semanticAnimacy",
                             "val": sa
                         }
                     ]
                 }]
             });
             s++;
             i++;
         }
         i++;
     };


     lr.Lexicon.LexicalEntry.push({
         id: "id" + campos[0],
         feat: [{
             att: "partOfSpeech",
             val: "noun"
         }],
         Lemma: {
             feat: [{
                 att: "writtenForm",
                 val: campos[1]
             }]
         },
         Sense: sense
     });

 }


 function categoriaAdjAdvPronPrepConj(campos, tipo) {

     var i = 4;
     var s = 0;
     var sense = new Array();
     var st;
     var sa;

     while (i < campos.length) {
         if (campos[i]) {
             sense.push({
                 "id": "id" + campos[0] + "." + (s + 1),
                 "Definition": [{
                     "feat": [{
                         "att": "text",
                         "val": campos[i]
                     }]
                 }]
             });
             s++;
         }
         i++;
     };


     lr.Lexicon.LexicalEntry.push({
         id: "id" + campos[0],
         feat: [{
             att: "partOfSpeech",
             val: "tipo"
         }],
         Lemma: {
             feat: [{
                 att: "writtenForm",
                 val: campos[1]
             }]
         },
         Sense: sense
     });


 }


 function categoriaVerbo(campos, encabezado) {


     var sense = new Array();
     var i = 5;
     var numSignificado = 1;
     var SenseId;
     var numArgumentos = 1;
     var labelArgumentos;
     var SemanticPredicateId;
     var valCase;
     var fs = new Array();
     var feat = new Array();
     var SemanticArgument = new Array();
     var PredicativeRepresentation = new Array();


     while (i < campos.length) {

         SenseId = "id" + campos[0] + "." + (numSignificado);
         var Definition = new Array();
         Definition.push({
             "feat": [{
                 "att": "text",
                 "val": campos[i]
             }]
         })
         i++;

         while (i < campos.length && encabezado[i] != "Significado " + numSignificado) {

             if (encabezado[i] == "Numero de Argumentos (Verbos)/Ejemplo") {
                 var SenseExemple = new Array();
                 SenseExemple.push({
                     "feat": [{
                         "att": "text",
                         "val": campos[i]
                     }]
                 })
             }
             labelArgumentos = campos[i];
             SemanticPredicateId = "marco" + campos[0] + "." + (numSignificado);
             i = i + 2;

             numArgumentos++;
             while (i < campos.length && encabezado[i] != castArgumento(numArgumentos)) {

                 valCase = campos[i - 1];
                 if (campos[i] && encabezado[i].includes("Caracterización Argumental")) {
                     var st = campos[i].split(/\s+/)[0];
                     var sa = campos[i].split(/\s+/)[1];
                     fs.push([{
                         "feat": [{
                                 "att": "semanticType",
                                 "val": st
                             },
                             {
                                 "att": "semanticAnimacy",
                                 "val": sa
                             }
                         ]
                     }]);
                 }
                 i++;
             }

             SemanticArgument.push({
                 "label": "ARG" + numArgumentos,
                 "feat": [{
                     "att": "case",
                     "val": valCase
                 }],
                 "fs": fs
             });


             i++;
         }
         numArgumentos = 1;
         sense.push({
             "id": SenseId,
             "PredicativeRepresentation": {
                 "SemanticPredicate": {
                     "id": SemanticPredicateId,
                     "label": labelArgumentos,
                     "SemanticArgument": SemanticArgument
                 }
             },
             "SenseExemple": SenseExemple,
             "Definition": Definition
         });
         numSignificado++;
     }



     lr.Lexicon.LexicalEntry.push({
         id: "id" + campos[0],
         feat: [{
             att: "partOfSpeech",
             val: "verb"
         }],
         Lemma: {
             feat: [{
                 att: "writtenForm",
                 val: campos[1]
             }]
         },
         Sense: sense
     });

 }


 function castArgumento(numArg) {

     var titulo;
     switch (numArg) {
         case 1:
             titulo = "Numero de Argumentos (Verbos)/Primer argumento";
             break;

         case 2:
             titulo = "Numero de Argumentos (Verbos)/Segundo argumento";
             break;

         case 3:
             titulo = "Numero de Argumentos (Verbos)/Tercer argumento";
             break;

     }

     return titulo;
 }

 function categoriaVerbo2(campos, encabezado) {



     var i = 5;
     var sense = new Array();

     while (i < campos.length) {


         if (encabezado[i].split(" ")[0] == "Significado") {

           
                 var SemanticArgument = new Array();
                 var Definition = new Array();
                 var numSignificado = encabezado[i].split(" ")[1];
                 var SenseId = "id" + campos[0] + "." + (encabezado[i].split(" ")[1]);
                 Definition.push({
                     "feat": [{
                         "att": "text",
                         "val": campos[i]
                     }]
                 })
             

         }

         if (encabezado[i] == "Numero de Argumentos (Verbos)") {

             var SemanticPredicateLabel = campos[i];
             var SemanticPredicateId = "marco" + campos[0] + "." + (numSignificado);
         }

         if (encabezado[i].split("/")[0] == "Numero de Argumentos (Verbos)") {

             switch (encabezado[i].split("/").length) {
                 case 2:


                     switch (encabezado[i].split("/")[1].trim()) {
                        
                         case "Primer argumento":
                             var fs = new Array();
                             var labelArgumentos;
                             var numArgumentos;
                             var valCase = campos[i];
                             numArgumentos = 1;
                             labelArgumentos = "ARG" + numArgumentos;
                             break;

                         case "Segundo argumento":
                             var fs = new Array();
                             var labelArgumentos;
                             var numArgumentos;
                             
                             var valCase = campos[i];
                             numArgumentos = 2;
                             labelArgumentos = "ARG" + numArgumentos;
                             break;
                         case "Tercer argumento":
                             var fs = new Array();
                             var labelArgumentos;
                             var numArgumentos;

                             var valCase = campos[i];
                             numArgumentos = 3;
                             labelArgumentos = "ARG" + numArgumentos;
                             break;
                         case "Ejemplo":
                            
                             var SenseExemple = new Array();
                             SenseExemple.push({
                                 "feat": [{
                                     "att": "text",
                                     "val": campos[i]
                                 }]
                             })
                              
            

                             sense.push({
                                 "id": SenseId,
                                 "PredicativeRepresentation": [{
                                     
                                     "SemanticPredicate": [{
                               
                                         "id": SemanticPredicateId,
                                         "label": SemanticPredicateLabel,
                                         "SemanticArgument": SemanticArgument
                                     }]
                                     
                                 }],
                                 "SenseExample": SenseExemple,
                                 "Definition": Definition
                             });

                               //console.log(JSON.stringify(sense[0].PredicativeRepresentation.SemanticPredicate.SemanticArgument[0].fs));
                            
                               
                             break;
                     }
                     break;

                 case 3:

                     if (campos[i]) {

                         var st = campos[i].split(/\s+/)[0];
                         var sa = campos[i].split(/\s+/)[1];
                        
                         fs.push({
                             feat: [{ att: "semanticType",    val: st },
                                      { att: "semanticAnimacy", val: sa }]
                         });

                         
                        
                     }

                     if(encabezado[i].split("/")[2].trim()=="Caracterización Argumental 5"){
                         
                         var feat=new Array;
                         if(valCase.split(" ó ")){
                             for(var j=0; j<valCase.split(" ó ").length;j++){
                               if(j==0){
                                feat.push({
                                 "att": "case",
                                 "val": valCase.split(" ó ")[j]
                                });
                               }else{
                                feat.push({
                                 "att": "text",
                                 "val": valCase.split(" ó ")[j]
                                });
                               }
                             }
                         }else{
                              feat.push({
                                 "att": "case",
                                 "val": valCase
                             });
                         }
                             SemanticArgument.push({
                             "label": labelArgumentos,
                             "feat": feat,
                             "fs": fs
                         });

                       
                     }
                     break;


             }

         }


         i++;

     }

     //console.log(JSON.stringify(sense));
      
     lr.Lexicon.LexicalEntry.push({
         id: "id" + campos[0],
         feat: [{
             att: "partOfSpeech",
             val: "verb"
         }],
         Lemma: {
             feat: [{
                 att: "writtenForm",
                 val: campos[1]
             }]
         },
         Sense: sense
     });

   // console.log(JSON.stringify(lr.Lexicon.LexicalEntry[0].Sense[0].PredicativeRepresentation[0].SemanticPredicate[0].SemanticArgument[0]));
     
   // console.log(JSON.stringify(sense[0].PredicativeRepresentation[0].SemanticPredicate[0].SemanticArgument[0]));
//console.log("___________________________________________");
      
 }




 module.exports = {

    saveDiccionario,
     getDiccionario,
     getPalabra
 }