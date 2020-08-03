<template>
  <div class="mt-5 container">
    <b-button v-b-modal.modal>Create New Project</b-button>
    <div v-for="project in projects">
      <b-card bg-variant="light" :header="project.name"
      class="ml-auto mr-auto mt-4 w-75" style="cursor: pointer;"
      @click="viewTickets(project.id)">
        <b-card-text>{{ project.description }}</b-card-text>
      </b-card>
    </div>
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
      this.callPost('/projects/create', this.form)
          .then(response => {
          })
    },
    viewTickets(projectId) {
      this.$router.push({name: 'tickets', params: {projectId: projectId}})
    }
  }
}
</script>