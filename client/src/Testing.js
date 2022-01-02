import { customersAPI } from "./api/api";
import { POST } from "./api/fetch";

const Testing = () => {
const FirstNames = ["John", "Benjamin", "Bob", "David", "Ricky", "Brad", "Brian", "Donald", "Tom", "Arie", "Dan", "Tim", "Eli", "Noa", "Robert", "Noam", "Lilach", "Elad", "Michelle", "Eden", "Ziv", "Sara", "Jim", "Rachel", "Raphael"]
const LastNames = ["Or", "Smith", "Aviv", "Aharon", "Ohayon", "Shriky", "Gal", "Rozental", "Blumenfeld", "Bakhshy", "Dagan", "Steiner", "Cohen", "Levi", "Levinson", "Stavi", "Turgeman", "Harash", "Peretz"]

function makeRandomString (length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

function makeRandomDate (start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


const RegisterCustomer = async () => {

    let customer = {
        customer_first_name: FirstNames[Math.random(25)],
        customer_last_name: LastNames[Math.random(19)],
        customer_email: `${makeRandomString(6)}@gmail.com`,
        customer_phone_number: `052${Math.random() * 90000000}`,
        customer_password: makeRandomString(8) + "*B",
        customer_birthdate: makeRandomDate(new Date(2003, 0, 1), new Date())
    }
    let res = await POST(customersAPI.post_register, customer);
    console.log("user added: ", res); //see if it worked

    return res;
}

for (let i = 0; i < 10; i++) {
    RegisterCustomer();
}
}

export default Testing.js;