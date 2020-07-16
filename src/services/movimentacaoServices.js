const mongoose = require('../database');

module.exports = {
    graphExpression: graphExpression,
  };


function graphExpression(req, day){
    
    const dateGreat= new Date();

    if(day){
        dateGreat.setDate(dateGreat.getDate()-30);
    }else{
        dateGreat.setDate(dateGreat.getDate()-365);
    }

    console.log(dateGreat);

    var groupObject = { month: {$month: "$data"}, year: {$year: "$data"}}
    var sortObject = { month: 1, year: 1}

    if(day){
        groupObject = { day: {$dayOfMonth: "$data"}, month: {$month: "$data"}, year: {$year: "$data"}}
        sortObject = { day:1, month: 1, year: 1}
    }

    return [
        {
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
            $sort: sortObject
        }                                       
    ];
}