<template>
    <div>
        <b-form>
            <b-form-group label="title">
                <b-form-input v-model="createForm.title" required/>
            </b-form-group>
            <b-form-group label="explanation">
                <b-form-input v-model="createForm.explanation" required/>
            </b-form-group>
            <b-form-group label="worker">
                <b-form-select v-model="createForm.worker" value-field="id" text-field="name"
                               :options="users"></b-form-select>
            </b-form-group>
            <b-button class="float-right" @click="onCreate" variant="primary">Create</b-button>
        </b-form>
    </div>
</template>

<script>
    export default {
        name: 'TicketCreate',
        props: {
            users: {type: Array},
            projectId: {type: Number},
            statusId: {type: Number}
        },
        data() {
            return {
                createForm: {
                    project_id: parseInt(this.projectId),
                    status_id: this.statusId,
                    title: '',
                    explanation: '',
                    worker: null
                }
            }
        },
        methods: {
            onCreate() {
                this.$emit('ticket-create', this.createForm)
            }
        }
    }
</script>