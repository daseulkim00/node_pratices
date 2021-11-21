const models = require('../models');
const { Op } = require('sequelize');

module.exports = {
    create: async function(req,res,next){  // 이름중요한게아니라 순서가 상관있다
        try{
            const result =  await models.Guestbook.create(req,body);
            res.send({
                result:'success',
                data: result,
                message: null
            });
        }catch(e){
            next(e);
        }
    },
    read: async function(req, res, next) {
        try {
            const startNo = req.query.sno || 0;
            const results = await models.Guestbook.findAll({
                attributes: ['no', 'name', 'message'],
                where: (startNo > 0) ? {no: {[Op.lt]: startNo}} : {},
                order: [
                    ['no', 'desc']
                ],
                limit: 3        
            });

            res.send({
                result: 'success',
                message: null,
                data: results
            });
        } catch(e) {
            next(e);
        }
    },
    delete : async function(req,res,next){
        try{
            await models.Guestbook.destroy({
                where: {
                    // 객체리터널 확장[1+1]이렇게 적어줄수있다. 
                    [Op.and]: [{no:req.params.no}, {password:req.body.password}]
                }
            });

            res.send({
                result: 'success',
                message:null,
                data:req.params.no
            });
        }catch(e){
            next(e);
        }
    }
}