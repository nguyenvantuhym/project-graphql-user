const mongoose = require('mongoose');

const User = require('./user.model');


const saltRounds = 10;

class Database {
    constructor()
    {
        this._connect();
        //console.log("hello");
        //this.newAccount();

    }

    async _connect()
    {
        const URL = `mongodb+srv://admin:admin@cluster0-kwozd.mongodb.net/training?retryWrites=true&w=majority`; 
        await  mongoose.connect(URL,{ useNewUrlParser: true })
        .then((err,client)=>{
                
                console.log('Database connection successful');
            })
        .catch((err)=>console.log('Database connection error!!' + err));

    }
    async deleteUserByid(id){
        return await User.findByIdAndRemove(id);
    }
    async getUserByID(id){
        return await User.findById(id);
    }
    
    async updateUser(id, data)
    {
        console.log(data);
        return await User.findByIdAndUpdate(id, data);
    }

    async addUser(user){
        let newuser = new User(user);
        newuser.save();
        return newuser;
    }
    
    async getalluser()
    {
       
            const data = await User.find();
            return data;
        
    }

}

module.exports = new Database();