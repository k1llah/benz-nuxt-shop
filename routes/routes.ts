import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'main',
      path: '/',
      component: () => import('~/pages/index.vue'),
    },
    {
      name: 'Purchases',
      path: '/purchases',
      component: () => import('~/pages/View_favorites.vue'),
    },
    {
      name: 'Profile',
      path: '/profile',
      component: () => import('~/pages/profile_user.vue'),
    },
    {
      name: 'Sign_up',
      path: '/sign_up',
      component: () => import('~/pages/View_signUp.vue'),
    },
    {
      name: 'Sneakers_page',
      path: '/sneakers_page',
      component: () => import('~/pages/CardList.vue'),
    },
    {
      name: 'gender',
      path: '/gender',
      component: () => import('~/pages/gender.vue'),
    },
    {
      name: 'description',
      path: '/description',
      component: () => import('~/pages/View_sneakerDs.vue'),
    },
    {
      name: 'feedback',
      path: '/feedback',
      component: () => import('~/pages/View_feedback.vue'),
    },
    {
      name: 'order',
      path: '/order',
      component: () => import('~/pages/View_order.vue'),
    },
    {
      name: 'admin',
      path: '/admin',
      component: () => import('~/pages/View_admin.vue'),
    },
    {
      name: 'feedback_admin',
      path: '/feedback_admin',
      component: () => import('~/components/adminComponents/feedbackComponents/feedbackModerate.vue'),
    },
    {
      name: 'post_page',
      path: '/post_page',
      component: () => import('~/pages/View_post.vue'),
    },
    {
      name: 'ideas_admin',
      path: '/ideas_admin',
      component: () => import('~/components/adminComponents/postComponents/postIdeasModerate.vue'),
    },
    {
      name: 'all_posts',
      path: '/all_posts',
      component: () => import('~/pages/View_all_posts.vue'),
    },
  ],
});