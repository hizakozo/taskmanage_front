<template>
    <b-card class="mt-5 w-25 ml-auto mr-auto">
        <b-form-group label="user name">
            <b-form-input v-model="body.mailAddress" required placeholder="mail address"/>
        </b-form-group>
        <b-button @click="onSubmit" class="float-right" variant="outline-success">Create</b-button>
    </b-card>
</template>

<script>
    export default {
        name: "invite",
        data() {
            return {
                body: {
                    mailAddress: "",
                    projectId: this.$route.params.projectId
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