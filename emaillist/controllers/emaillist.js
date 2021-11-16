
const model = require('../models/emaillist');
module.exports = {
    index: async function(req, res){
        const result = await model.findAll(function(){});
            console.log(result);
            res.render('index',{
                list: result || []
            });
        }
}