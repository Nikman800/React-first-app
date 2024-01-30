// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

function generateId() {
    return Math.floor(Math.random() * 1000000);
}

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});

const users = {
    users_list: [
        {
            id: "xyz789",
            name: "Charlie",
            job: "Janitor"
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer"
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor"
        },
        {
            id: "yat999",
            name: "Dee",
            job: "Aspring actress"
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender"
        }
    ]
};

const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
    user.id = generateId(); // Assign a unique ID to the user
    users["users_list"].push(user);
    return user;
};

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    let result = users["users_list"];
    if (name) {
        result = result.filter(user => user.name === name);
    }
    if (job) {
        result = result.filter(user => user.job === job);
    }
    res.send({ users_list: result });
});


app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

// Backend
app.post('/users', (req, res) => {
    const newUser = { id: generateId(), ...req.body };
    users.users_list.push(newUser);
    res.status(201).json(newUser); // Return the newly created user object with its new ID
  });

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const index = findUserById(id);
    if (index !== -1) {
        users.users_list.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('User not found');
    }
});