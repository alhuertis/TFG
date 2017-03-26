
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LexicalResourceSchema = new Schema({

  GlobalInformation: {
   feat: [
    {
     att: String,
     val: String,
    }
   ],
  },
  Lexicon: {
   feat: [
    {
     att: String,
     val: String
    }
   ],
   LexicalEntry: [
    {
     id: String,
     feat: [
      {
       att: String,
       val: String
      }
     ],
     Lemma: {
      feat: [
       {
        att: String,
        val: String
       }
      ]
     },
     WordForm: [
      {
       feat: [
        {
         att: String,
         val: String
        }
       ]
      }
     ],
     Steam: [
      {
       feat: [
        {
         att: String,
         val: String
        }
       ]
      }
     ],
     MorphologicalPattern: [
      {
       feat: [
        {
		  att: String,
          val: String
        }
       ],
       TransformSet: [
        {
         feat: [
          {
           att: String,
           val: String
          }
         ],
         Process: [
          {
           feat: [
            {
             att: String,
             val: String
            }
           ]
          }
         ],
         GrammaticalFeatures: [
          {
           feat: [
            {
             att: String,
             val: String
            }
           ]
          }
         ]
        }
       ]
      }
     ],
     Sense: [
      {
       id: String,
       feat: [
        {
         att: String,
         val: String
        }
       ],
       SenseExample: [
        {
         feat: [
          {
           att: String,
           val: String
          }
         ]
        }
       ],
       PredicativeRepresentation: [
        {
         predicate: String,
         correspondences: String,
         feat: [
          {
           att: String,
           val: String
          }
         ],
         SemanticPredicate: [
          {
           id: String,
           label: String,
           feat: [
            {
             att: String,
             val: String
            }
           ],
           Definition: [{
            feat: [
            {
             att: String,
             val: String
            }
            ]
           }
           ],
           SemanticArgument: [
            {
             id: String,
             label: String,
             feat: [
              {
               att: String,
               val: String
              }
             ],
             fs: [
              {
               feat: [
                {
                 att: String,
                 val: String
                }
               ]
              }
             ]
            }
           ]
          }
         ]
        }
       ],
       Definition: [],
       fs: [
        {
         feat: [
          {
           att: String,
           val: String
          }
         ]
        }
       ]
      }
     ]
    }
   ]
  }
 });


module.exports= mongoose.model('Lr', LexicalResourceSchema);