import Home from './components/Page/Home/Home';
import Article from './components/Page/Article/Article';
import Posts from './components/Page/Posts/Posts';
import Post from './components/Page/Posts/Post';
import About from './components/Page/About/About';
import Test from './components/Page/Test/Test';

const routes = [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { path: '/article', component: Article },
  { path: '/posts/:cate', component: Posts },
  { path: '/post/:id', component: Post },
  { path: '/about', component: About },
  { path: '/test', component: Test },
  // { path: '*', component: Notfound }
]

export default routes
