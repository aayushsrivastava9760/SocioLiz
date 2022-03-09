# SocioLiz
A MERN stack based social website where users can post , follow others and chat with them .

## Getting Started

### Prerequisites

1. Must have basic knowledge of **Node**, **React**, **Express**, **MongoDB** .
2. Basic idea about **socketio** .

### Installing

1. Clone the repo .

```
git clone https://github.com/aayushsrivastava9760/SocioLiz.git
```

2. Install the dependencies for the **Backend** .

```
npm i
```

3. Install the dependencies for the **Frontend** .

```
cd social-frontend
npm i
```

4. Install the dependencies for the **socket** .

```
cd socket
npm i
```

5. Create a `.env` file in the backend and add your connection string from mongoDB .

```
MONGO_URL=<your_connection_string>
```

6. Navigate to `social-frontend/src/utils/constants` and replace `https://socioliz-api.herokuapp.com/api` with `http://localhost:8800/api` .

7. Navigate to `social-frontend/src/pages/messenger/Messenger` and replace `https://dry-cliffs-41954.herokuapp.com/` with `ws://localhost:8900` .


### Running Locally

1. Start the backend server .

```
npm start
```

2. Start the sokcet server .

```
cd socket
npm start
```

3. Start the frontend .

```
cd social-frontend
npm start
```

## Author

- **Aayush Srivastava**

### Aknowledgements

- Heroku buildpack used for deplotment of socket server [timanovsky/subdir-heroku-buildpack](https://github.com/timanovsky/subdir-heroku-buildpack)
- Inspired by [Safak](https://github.com/safak)

## frontend

- Routing
- follow user--->follow up with a 'hi' message
- show up messages like failed to login due to wrong password or something
- searching user

## backend

- jwt (lets see)
- better uploading of pictures
- user search api

## socket

- Socket server deployed on Heroku `https://dry-cliffs-41954.herokuapp.com/`
- Heroku buildpack used for deplotment of socket server `https://github.com/timanovsky/subdir-heroku-buildpack`
