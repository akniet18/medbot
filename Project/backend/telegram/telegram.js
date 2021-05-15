// const { Telegraf } = require("telegraf");
// const config = require("../config/default");

// // const UserModel = require("../models/user_doors");

// let token = " TOKEN ";
// let MedBot = new Telegraf(token);

// MedBot.start(async (ctx) => {  
//     console.log('bot start pressed by: '+ctx.from.username);
//     let user = await UserModel.findOne({ chat_id: ctx.chat.id });
   
//     if(!user){
//         const newUser = {
//             chat_id: ctx.chat.id,
//             username: ctx.from.username
//         };

//         user = new UserModel(newUser);
//         user.save((err, saved) => {
//             if(err) console.log(err, ' ,error in telegram/index.js');
//             if (saved) console.log('user saved');
//         });

//     }

//     MedBot.telegram.sendMessage(ctx.chat.id, 'Здравствуйте, я MeБот, который будет отправлять вам информацию об успешно завершенных лидах Дверей-невидимок.');

// });

// MedBot.on('text', async(ctx) => {
    
//     switch(order_db.step){
//     }
// });






// MedBot.launch()

// module.exports = {
//     MedBot
// };