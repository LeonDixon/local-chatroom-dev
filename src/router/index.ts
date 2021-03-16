import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Chatroom from '../views/Chatroom.vue'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/chatroom',
    name: 'Chatroom',
    component: Chatroom
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
