import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Chatroom from '../views/Chatroom.vue'
import Home from '../views/Home.vue'
import {store} from '../store/store'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/chatroom',
    name: 'Chatroom',
    component: Chatroom,
    meta: {requiresAuth: true}
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {requiresAuth: true}
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  const user = store.state.user
  console.log(user)
  console.log(to)
  if (to.name !== 'Home' && user === '') {
    next({name: 'Home'})
    console.log(user);
  }
  else
    next()
})

export default router
