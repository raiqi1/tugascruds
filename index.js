const  express= require('express');
const logger = require('morgan');
const productRouter = require('./app/products/routes')
const app = express();
const path = require('path');
const productRouterV2 = require('./app/product_v2/routes');

app.use(logger('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/public',express.static(path.join(__dirname,'uploads')));

app.use('/api/v1/',productRouter)
app.use('/api/v2/',productRouterV2)
app.use((req,res,next) => {
    res.send({
        status:'failed',
        message:'Resource' + req.originalUrl + 'Not Found'
    })
})

app.listen(3000,() => console.log('Server is running at http://localhost:3000'))