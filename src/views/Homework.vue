<script setup>
import { onMounted, ref } from 'vue';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

const chores = ref([
    // {
    //     class: 'Class 12/05',
    //     text: 'ejemplo piola',
    //     endDate: '19/05',
    //     activities: [
    //         {
    //             exercise: 'Part 1',
    //             book: 'Workbook',
    //             page: '12'
    //         }
    //     ],
    //     isCompleted: true,
    //     id: 1
    // },
    // {
    //     class: 'Class 12/05',
    //     text: 'ejemplo piola',
    //     endDate: '19/05',
    //     activities: [
    //         {
    //             exercise: 'Part 1',
    //             book: 'Workbook',
    //             page: '12'
    //         }
    //     ],
    //     isCompleted: false,
    //     id: 2
    // },
    // {
    //     class: 'Class 12/05',
    //     text: 'ejemplo piola',
    //     endDate: '19/05',
    //     activities: [
    //         {
    //             exercise: 'Part 1',
    //             book: 'Workbook',
    //             page: '12'
    //         }
    //     ],
    //     isCompleted: true,
    //     id: 3
    // }
]);

const db = getFirestore();
onMounted(async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'chores'));

        querySnapshot.forEach((doc) => {
            chores.value.push(doc.data());
        });
    } catch (error) {}
});

async function addChore() {
    try {
        const docRef = await addDoc(collection(db, 'chores'), {
            class: 'Class 12/05',
            endDate: '19/05',
            activities: [
                {
                    exercise: 'Part 1',
                    book: 'Workbook',
                    page: '12'
                }
            ],
            isCompleted: true,
            id: 1
        });
        console.log('Document written with ID: ', docRef.id);
    } catch (e) {
        console.error('Error adding document: ', e);
    }
}

function handleStatus(targetChore) {
    const choreIndex = chores.value.findIndex(
        (chore) => chore.id == targetChore.id
    );
    targetChore.isCompleted = !targetChore.isCompleted;

    chores.value[choreIndex] = targetChore;
}
</script>
<template>
    <section>
        <h1>HOMEWORK</h1>
        <v-btn @click="addChore">ADD CHORE</v-btn>
        <v-expansion-panels variant="accordion" class="panels">
            <v-expansion-panel
                v-for="(chore, i) in chores"
                :key="i"
                class="panel"
            >
                <v-expansion-panel-title class="panel-title">
                    <template v-slot:default="exapnded">
                        <div class="panel-content">
                            <h6>{{ chore.class }}</h6>
                            <v-chip
                                v-if="chore.isCompleted"
                                class="ma-1 tag"
                                close
                                color="green"
                                label
                                text-color="white"
                            >
                                <v-icon start icon="mdi-check"></v-icon>
                                Done
                            </v-chip>
                        </div>
                    </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="panel-text">
                    <span class="due-date"
                        ><v-chip v-if="chore.endDate" class="ma-2">
                            Due to: {{ chore.endDate }}
                        </v-chip></span
                    >
                    <ul>
                        <li v-for="(activity, i) in chore.activities">
                            {{ activity.exercise }} - {{ activity.book }} - Page
                            {{ activity.page }}
                        </li>
                    </ul>
                    <footer>
                        <v-btn
                            v-if="!chore.isCompleted"
                            size="small"
                            color="info"
                            @click="handleStatus(chore)"
                        >
                            Mark as done
                        </v-btn>
                        <v-btn
                            v-else
                            size="small"
                            color="error"
                            @click="handleStatus(chore)"
                        >
                            Mark as incompleted
                        </v-btn>
                    </footer>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </section>
</template>

<style lang="scss" scoped>
section {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 800px;
    h1 {
        text-align: center;
    }
    .panel {
        .panel-title {
            .panel-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                h6 {
                    font-size: 14px;
                }
                .tag {
                    background-color: #ffffff;
                    margin: 0 1rem;
                }
            }
        }
        .panel-text {
            position: relative;
            padding: 0.5rem;
            .due-date {
                position: absolute;
                top: 4px;
                right: 24px;
            }
            footer {
                margin-top: 2rem;
                display: flex;
                width: 100%;
                justify-content: flex-end;
            }
        }
    }
}
</style>
