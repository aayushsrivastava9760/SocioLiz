# SocioLiz

A MERN stack based social website where users can post , follow others and chat with them .

### Features

1. Users can **register** and **login** .
2. Uses **hashed password** which are more reliable and safe .
3. Users can make **posts** , **follow/unfollow** other users and **realtime chat** with friends .
4. Users can also **post images** .
5. Users can **search** for other users.

### Packages

- [express](https://expressjs.com/)
- [mongoose](https://mongoosejs.com/docs/)
- [cors](https://expressjs.com/en/resources/middleware/cors.html)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [socket.io](https://socket.io/)
- [socket.io-client](https://www.npmjs.com/package/socket.io-client)
- [axios](https://axios-http.com/docs/intro)

## Getting Started

### Prerequisites

1. Must have basic knowledge of **Node**, **React**, **Express**, **MongoDB** .
2. Basic idea about **socketio** .
3. Familiarity with **npm** and **npm packages** .

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

7. Navigate to `social-frontend/src/pages/messenger/Messenger` and replace `https://socioliz-socket.herokuapp.com/` with `ws://localhost:8900` .


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

### Resources

- https://axios-http.com/docs/intro
- https://socket.io/get-started/chat
- https://levelup.gitconnected.com/how-to-deploy-a-react-app-with-netlify-set-up-continuous-deployment-via-github-53859dcdaf40
- https://masteringjs.io/tutorials/mongoose/find
