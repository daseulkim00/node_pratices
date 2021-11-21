const fs = require('fs');
const path = require('path');
const models = require('../models');

module.exports ={
    index: async function(req, res, next) {
        const results = await models.Gallery.findAll({
            attributes: ['no', 'url', 'comment'],
            order: [
                ['no', 'desc']
            ]
        });

        res.render('gallery/index', {results});
    },
    upload: async function(req,res,next){
        try{
            const file = req.file;
            // console.log(file);
            if(file){
            const contents = fs.readFileSync(file.path);
                                    // 개발하는거랑 배포하는거랑 위치가 달라서 아래처럼 적어준다.
            const storeDirectory = path.join(path.dirname(require.main.filename), process.env.STATIC_RESOURCES_DIRECTORY, process.env.UPLOADIMAGE_STORE_LOCATION);
            const storePath = (path.join(storeDirectory, file.filename)) + path.extname(file.originalname);
            const url = path.join(process.env.UPLOADIMAGE_STORE_LOCATION, file.filename) + path.extname(file.originalname);

            fs.existsSync(storeDirectory) || fs.mkdirSync(storeDirectory);
            // 파일 저장(동기)
            fs.writeFileSync(storePath,content, {flag:'w+'});
            //
            fs.unlinkSync(file.path);

            //console.log(storeDirectory, storePath, url);

            await models.Gallery.create({
                url: url.replace(/\\/gi, '/'),
                comment: req.body.comment || ''
            });

            }
            res.redirect('/gallery');

        }catch(e){
            next(e);
        }
    }
}