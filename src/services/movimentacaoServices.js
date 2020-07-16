const mongoose = require('../database');

module.exports = {
    graphExpression: graphExpression,
  };

const dateGreat= new Date();

function graphExpression(req, day){
    if(day){
        dateGreat.setDate(dateGreat.getDate()-30);
    }else{
        dateGreat.setDate(dateGreat.getDate()-365);
    }

    var groupObject = { month: {$month: "$data"}, year: {$year: "$data"}}

    if(day){
        groupObject = { day: {$dayOfMonth: "$data"}, month: {$month: "$data"}, year: {$year: "$data"}}
    }

    return [{
        $match: {  
            $and : [
                {usuario : new mongoose.Types.ObjectId(req.userId)},
                {data: {$gte: dateGreat}},
                {data: {$lt: new Date()}}
            ]
        }
    },
    { 
        $group: {
        _id: groupObject,
        acresimo:   { 
            $sum: { 
                $switch: { 
                    branches: [ 
                        { 
                            "case": { "$eq": [ "$tipo", 'ACRESCIMO' ] }, 
                            "then": "$valor"
                        }
                    ], 
                    "default": 0 
                }
            }
        },
        decrescimo: { 
                    $sum: { 
                        $switch: { 
                            branches: [ 
                                { 
                                    "case": { "$eq": [ "$tipo", 'DECRESCIMO' ] }, 
                                    "then": "$valor"
                                }
                            ], 
                            "default": 0 
                        }
                    }
                }
            }
        },
        {
            $sort: { data : 1 }
        }                                       
    ];
}