var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "3Nkerman",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});


function start() {

    inquirer
        .prompt([{
            type: "list",
            message: "What would you like to do?",
            choices: ["See List", "Buy", "End"],
            name: "choice"
        }])
        .then(function (answer) {
            if (answer.choice === "See List") {
                //do post
                showInfo();
            } else if (answer.choice === "Buy") {
                buyItem();
            } else if (answer.choice === "End") {
                console.log("bye");
                connection.end();
            }
        })
        .catch(function (err) {
            console.log(err);
        })
}

function showInfo() {
    inquirer
        .prompt({
            name: "products",
            type: "confirm",
            message: "Are you sure you would like to see detailed item list?"
        })
        .then(function (answer) {
            var query = "SELECT * FROM products";
            connection.query(query, function (err, res) {
                if (err) throw err
                for (var i = 0; i < res.length; i++) {
                    console.log("Product ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + " || Stock: " + res[i].stock_quantity);
                    console.log('------------------------------');
                }
                start();
            });
        });
}

function choices() {
    var choiceArray = [];
    for (var i = 0; i < results.length; i++) {
        choiceArray.push(results[i].product_name);
    }
    return choiceArray;
}


function buyItem() {

    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        function choices() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].product_name);
            }
            return choiceArray;
        }

        var choi = choices();
        inquirer
            .prompt([{
                    name: "choice",
                    type: "rawlist",
                    choices: choi,
                    message: "What item would you like to buy?"
                },
                {
                    name: "buy",
                    type: "input",
                    message: "How much would you like to buy?"
                }
            ])
            .then(function (answer) {
                var chosenItem;
                
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice) {
                        chosenItem = results[i];
                        
                    }
                }
                if (chosenItem < parseInt(answer.choice.stock_quantity)) {
                    console.log(answer);
                    console.log(answer.buy);
                    connection.query(
                        "UPDATE products SET ? WHERE ?", [{
                                stock_quantity: answer.choice.stock_quantity - answer.buy
                            },
                            {
                                product_id: chosenItem.product_id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("Bought succesfully");
                            start();
                        }
                    );
                } else {
                    console.log("We don't have enough in stock!");
                    start();
                }
            });
    });
}
//RAWR >:/