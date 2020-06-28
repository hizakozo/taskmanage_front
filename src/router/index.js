import Vue from 'vue'
import VueRouter from 'vue-router'
import signIn from '../views/SignIn';
import signUp from "../views/SignUp";
import projects from "../views/Projects";
import tickets from "../views/Tickets";
import invite from "../views/Invite";

Vue.use(VueRouter)

  const routes = [
    {
      path: '/signIn',
      name: 'signIn',
      component: signIn
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: signUp
    },
    {
      path: '/projects',
      name: 'projects',
      component: projects
    },
    {
      path: '/tickets/:projectId',
      name: 'tickets',
      component: tickets
    },
    {
      path: '/invite/:projectId',
      name: 'invite',
      component: invite
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
