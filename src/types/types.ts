declare module 'EnglishHelper' {
	import { Timestamp } from '@firebase/firestore';
	export interface chore {
		activities?: activity[];
		createdAt?: Timestamp;
		editedAt?: string;
		endDate?: Timestamp;
		id?: string;
		isCompleted?: boolean;
		title?: string;
		userUid?: string;
	}
	export interface activity {
		book: string;
		done: boolean;
		exercise: string;
		page: string | number;
	}
}
