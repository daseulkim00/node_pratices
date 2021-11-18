// const errorRoute = require('./error');

const applicationRouter = {
    setup: function(application) {
        
        //const site = models.Site.findOne();

        application
            .all('*', function(req, res, next){
                res.locals.req = req;
                res.locals.res = res;
                next();
            })

            .use('/',  require('./main'))
            .use('/user', require('./user'))

            // .use(errorRoute.error404)
            // .use(errorRoute.error500)

            .siteTitle = 'MySite';
    }
}

module.exports = { applicationRouter }