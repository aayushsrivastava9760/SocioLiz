# SocioLiz

A MERN stack social PWA(Progressive Web App) where users can post , follow others and chat with them .

![GitHub last commit](https://img.shields.io/github/last-commit/aayushsrivastava9760/SozioLiz?style=flat-square)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## Demo

The app has been hosted on Netlify [here](https://socioliz.netlify.app/) . P.S: You might have to wait for a few seconds for the netlify site to respond.

![Login Page](https://user-images.githubusercontent.com/81965095/159630405-c77ca550-5cec-4562-b15f-35e5f83e4b7d.jpeg)

<hr>

![Register Page](https://user-images.githubusercontent.com/81965095/159630665-dc110ba0-87eb-4619-9c60-1fd3a909d8de.jpeg)

<hr>

![Home Page](https://user-images.githubusercontent.com/81965095/161415419-619c4f17-851f-4a00-8a17-d1ef52081f5b.jpeg)

<hr>

![comments](https://user-images.githubusercontent.com/81965095/161415500-9a27544b-9018-474a-b892-778f84d11c50.jpeg)

<hr>

![User's Profile Page](https://user-images.githubusercontent.com/81965095/161415549-bcbc88be-dd6b-46d7-b142-5df93f412b11.jpeg)

<hr>

![Others Profile Page](https://user-images.githubusercontent.com/81965095/161416133-97c95b9e-b279-4da9-ac4c-e96fa2fcab4c.jpeg)

<hr>

![Search Page](https://user-images.githubusercontent.com/81965095/161416162-660d3971-1ffe-48d3-891b-bcaf8d177683.jpeg)

<hr>

![Messenger Page](https://user-images.githubusercontent.com/81965095/161416192-9230f7e8-2d8e-4f0a-8afb-8c5f0e38b27f.jpeg)




### Features

1. Users can **register** and **login** .
2. Uses **hashed password** which are more reliable and safe .
3. Users can make **posts** , **follow/unfollow** other users and **realtime chat** with friends .
4. Users can also **post images** .
5. Users can **search** for other users.
6. Users can update/change their **Profile Picture**, **Cover Picture** and **Personal Info** about themelves .
7. Users can **comment** on the posts .

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

6. Navigate to `social-frontend/src/utils/constants` and replace `https://api-socioliz.herokuapp.com/api` with `http://localhost:8800/api` .

7. Navigate to `social-frontend/src/pages/messenger/Messenger` and replace `https://socioliz-socket.herokuapp.com/` with `ws://localhost:8900` .


### Running Locally

1. Start the backend server .

```
npm start
```

2. Start the socket server .

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
