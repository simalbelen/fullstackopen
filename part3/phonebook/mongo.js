const mongoose = require("mongoose");

//const password = import.meta.env.VITE_MONGODB_PASSWORD
if (process.argv.length < 3) {
    console.log("give password as argument");
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.rxswet5.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model("Person", personSchema);


const name = process.argv[3];
const number = process.argv[4];

if (name && number){
    const person = new Person({
        name: name,
        number: number,
    });
    
    person.save().then((result) => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    });
} else {
    let response = "phonebook:"
    Person
    .find({})
    .then(persons=> {
        persons.forEach(person => {
            response = response.concat(`\n${person.name} ${person.number}`)
        });
        console.log(response)
        mongoose.connection.close()
    })
    
}


