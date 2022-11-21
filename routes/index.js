import express from 'express';
import myDB from '../db/MyDB.js';

const router = express.Router();

router.get('/getCurrentUser', (req, res) => {
  console.log('getCurrentUser', req.session);
  res.json({
    isLoggedIn: !!req.session.user,
    user: req.session.user,
  });
});

router.post('/authenticate', async (req, res) => {
  // TODO: validate that the user data is correct
  const user = req.body;
  const success = await myDB.authenticate(user);
  if (success) {
    req.session.user = {user: user.user};
    res.json({isLoggedIn: true, err: null});
  } else {
    req.session.user = null;
    res.json({isLoggedIn: false, err: 'Wrong User or Password'});
  }
});

router.get('/logout', (req, res) => {
  req.session.user = null;
  res.json({isLoggedIn: false, msg: 'Logout successful'});
});

router.post('/signup', async (req, res) => {
  // Save user to db
  const user = req.body;
  const success = await myDB.createUser(user);
  if (!success) {
    res.json({isLoggedIn: false, err: 'User alreay exists'});
    return;
  }
  req.session.user = {user: user.user};
  res.json({isLoggedIn: true, err: null});
});

router.get('/getUser', async (req, res) => {
  console.log('getUser');
  console.log(req);
  const user = await myDB.getUser(req.session.user);
  res.json(user);
});

router.post('/updateProfile', async (req, res) => {
  console.log(req.body);
  const diary = await myDB.updateProfile(req.session.user, req.body);
  res.json({msg: 'Profile updated'});
});

router.post('/updatePost', async (req, res) => {
  console.log(req.body);
  //
  const diary = await myDB.updatePost(req.session.user, req.body);
  res.json({msg: 'Post updated'});
});


router.get('/listPosts', async (req, res) => {
  const posts = await myDB.listPosts();
  res.json(posts);
});

router.post('/createPost', async (req, res) => {
  console.log(req.body);
  await myDB.createPost(req.body, req.session.user);
  res.json({msg: 'Post saved'});
});

router.post('/editDiary', async (req, res) => {
  console.log('updateDiary');
  const diary = await myDB.editDiary(req.query.id, req.body);
  res.json({msg: 'Diary updated'});
});

router.get('/deletePost', async (req, res) => {
  console.log(req.query.id);
  const post = await myDB.deletePost(req.query.id);
  res.json({msg: 'Post deleted'});
});

router.get('/getPost', async (req, res) => {
  console.log(req.query.id);
  const post = await myDB.getPost(req.query.id);
  res.json(post);
});

router.get("/getEmail", async (req, res) => {
  console.log(req.query.id);
  const post = await myDB.getEmail(req.query.id);
  res.json(post);
});

export default router;
