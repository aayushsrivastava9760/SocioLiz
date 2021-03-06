# SocioLiz

A MERN stack Social Web App where users can post , follow others and chat with them .

![GitHub last commit](https://img.shields.io/github/last-commit/aayushsrivastava9760/SocioLiz?style=flat-square)
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
8. Register/Login takes valid input and give error messages for invalid or non-matchable credentials .

## App Usage

### Pages

#### 1. Home Page

This is the first page which appears after logging in and it contains all the posts of the user and whoever the user follows .

#### 2. Profile Page

This page displays the user's profile . The user can change the default cover picture and profile picture from this page . The personal info and a short description can also be added through this page . This page diplays all of user's posts . The rightbar also displays the friends of the user ( whoever the user follows ) .

#### 3. Search Page

This page can be accessed by clicking on the search bar on the navbar . 

#### 4. Messenger Page

This page can be accessed by clicking on the messenger icon on the navbar . The user can chat / real-time chat with those users who are added on messenger ( each profile page gives you the option to add user on messenger ) . If two users are online then they can see each other as online on the right side of the messenger page .

### Feature Access

#### 1. Sharing a Post

A user can share a post from his/her profile and home page . The user can write a post and can also add an image with the post by clicking on the photo or video button ( for now only images can be shared ) . On selecting an image the user is also given the option to cancel the selected image ( a small black cross appears over the selected image ) . On clicking the share button the post is shared .

#### 2. Comments

Each post has a 'comments' button , on clicking this button the comments section becomes visible and all the comments can be seen . The user can also enter a comment by writing in the input area and clicking the send icon .

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

## Contributing

For first-time contributors, be sure to read the contribution guidelines [here](CONTRIBUTING.md).

### NOTE

The app is still under production phase so if bugs are found kindly create an issue regarding the same stating the method to reproduce the bug or relevant screenshot .

## Author

- **Aayush Srivastava**

### Aknowledgements

- Heroku buildpack used for deployment of socket server [timanovsky/subdir-heroku-buildpack](https://github.com/timanovsky/subdir-heroku-buildpack)

### Resources

- https://axios-http.com/docs/intro
- https://socket.io/get-started/chat
- https://levelup.gitconnected.com/how-to-deploy-a-react-app-with-netlify-set-up-continuous-deployment-via-github-53859dcdaf40
- https://masteringjs.io/tutorials/mongoose/find
