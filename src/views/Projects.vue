<template>
    <div class="mt-5">
        <b-button v-b-modal.modal>Create New Project</b-button>
        <b-modal hide-footer id="modal" title="Create Project">
            <div>
                <b-form @submit="onCreate">
                    <b-form-group label="name">
                        <b-form-input v-model="form.project_name" required/>
                    </b-form-group>
                    <b-form-group label="description">
                        <b-form-input v-model="form.description" required/>
                    </b-form-group>
                    <b-button class="float-right" type="submit" variant="primary">Create</b-button>
                </b-form>
            </div>
        </b-modal>
        <div v-for="project in projects">
            <router-link  :to="{ name: 'tickets', params: { projectId: project.id }}" >
                <b-card class="m-4 float-left" :title="project.name">{{project.description}}</b-card>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'projects',
        data() {
            return {
                projects: this.getProjects(),
                form: {
                    project_name: '',
                    description: ''
                }
            }
        },
        methods: {
            getProjects() {
                this.callGet('/projects')
                    .then(data => {
                        if (data) {
                            this.projects = data.projects
                        }
                    })
            },
            onCreate() {
                this.callPost('/projects', this.form)
                    .then(response => {
                    })
            }
        }
    }
</script>