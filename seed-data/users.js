const bcrypt = require('bcrypt');

const saltRounds = 14;

const users = [
    {
        firstName: "Daniel",
        lastName: "Martinez",
        email: "danenrmar@gmail.com",
        phone: "+17862059300",
        passwordHash: bcrypt.hashSync("m1985m", saltRounds),
    },
    {
        firstName: "Estefany",
        lastName: "Claut",
        email: "estefanyclautm@hotmail.com",
        phone: "+17867922937",
        passwordHash: bcrypt.hashSync("c1996c", saltRounds),
    },
    {
        firstName: "Manuel",
        lastName: "Martinez",
        email: "delugo1956@gmail.com",
        phone: "+15618665797",
        passwordHash: bcrypt.hashSync("m1956m", saltRounds),
    },
    {
        firstName: "Carlos",
        lastName: "Martinez",
        email: "sioncent@gmail.com",
        phone: "+13056322980",
        passwordHash: bcrypt.hashSync("c1989c", saltRounds),
    },
];

module.exports = users;
