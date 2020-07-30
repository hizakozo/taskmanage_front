<template>
    <b-card class="mt-5 w-25 ml-auto mr-auto">
        <b-form-group label="user name">
            <b-form-input v-model="body.mail_address" required placeholder="mail address"/>
        </b-form-group>
        <b-button @click="onSubmit" class="float-right" variant="outline-success">招待する</b-button>
    </b-card>
</template>

<script>
    export default {
        name: "invite",
        data() {
            return {
                body: {
                    project_id: this.$route.params.projectId,
                    mail_address: ""
                }
            }
        },
        methods: {
            onSubmit(){
                this.callPost(`/projects/invite`, this.body)
                .then(data => {
                    if (data) {

                    }
                })
            }
        }
    }
</script>