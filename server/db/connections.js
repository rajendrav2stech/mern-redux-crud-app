import mongoose from 'mongoose'


const DB = process.env.DATABASE
mongoose.connect(DB, {
    // useCreateIndex: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    // if (err) throw err;
    console.log('DB Connection')
})




// Client Connection

