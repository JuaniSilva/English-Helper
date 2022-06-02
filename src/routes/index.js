import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: '/',
			component: () => import('../views/Home.vue')
		},
		{
			path: '/register',
			name: 'register',
			component: () => import('../views/Register.vue')
		},
		{
			path: '/sign-in',
			name: 'login',
			component: () => import('../views/SignIn.vue')
		},
		{
			path: '/homework',
			name: 'homework',
			component: () => import('../views/Homework.vue')
		},
		{
			path: '/payments',
			component: () => import('../views/Payments.vue'),
			meta: {
				requiresAuth: true
			}
		}
	]
});
async function getCurrentUser() {
	return new Promise((resolve, reject) => {
		const removeListener = onAuthStateChanged(
			getAuth(),
			(user) => {
				removeListener();
				resolve(user);
			},
			reject
		);
	});
}
router.beforeEach(async (to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (await getCurrentUser()) {
			next();
		} else {
			alert('You dont have access! Please Login or Register');
			next('/sign-in');
		}
	} else {
		next();
	}
});

export default router;
