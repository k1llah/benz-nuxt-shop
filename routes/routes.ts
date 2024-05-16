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
      component: () => import('~/pages/favorites.vue'),
    },
    {
      name: 'Profile',
      path: '/profile',
      component: () => import('~/pages/profile-user.vue'),
    },
    {
      name: 'Sign_up',
      path: '/sign_up',
      component: () => import('~/pages/sign-up.vue'),
    },
    {
      name: 'Sneakers_page',
      path: '/sneakers_page',
      component: () => import('~/pages/sneakers-page.vue'),
    },
    {
      name: 'gender',
      path: '/gender',
      component: () => import('~/pages/gender.vue'),
    },
    {
      name: 'description',
      path: '/description',
      component: () => import('~/pages/sneaker-description.vue'),
    },
    {
      name: 'feedback',
      path: '/feedback',
      component: () => import('~/pages/feedback.vue'),
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
      component: () => import('~/pages/post.vue'),
    },
    {
      name: 'ideas_admin',
      path: '/ideas_admin',
      component: () => import('~/components/adminComponents/postComponents/postIdeasModerate.vue'),
    },
    {
      name: 'all_posts',
      path: '/all_posts',
      component: () => import('~/pages/all-posts.vue'),
    },
  ],
});