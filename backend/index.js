const express = require("express");
const app = express();
const backend = 'http://34.245.213.76:3000'


app.get("/dashboard", (request, response) => {
    const articleList = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First article ',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
      ];
      

    response.json({articleList})
});

app.post("/login", (request, response) => {
    const username = request.body.username
    const password = request.body.password

    if (username || password) {
        response.send("Please provide a username or password ");
    }

    if (username && password) {
        const loginDetails = {username:username, password:password}
        response.send("You are logged in");
    }


});

app.listen(3000, () => {
    console.log("Listen on the port 3000...");
});


