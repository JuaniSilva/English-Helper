import { getAuth } from 'firebase/auth';
import { computed, ref } from 'vue';

export function getCurrentUser() {
	const auth = getAuth();

	const user = computed(() => {
		return auth.currentUser;
	});

	user.value = auth.currentUser;

	return { user };
}
