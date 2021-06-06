<template>
    <b-container>
        <b-card>
            {{user.name}}
        </b-card>
        <div v-for="project in projects">
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block  variant="">{{project.name}}</b-button>
                </b-card-header>
                    <b-card v-for="ticket in project.tickets" v-bind:key="ticket.ticket_id" no-body>
                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-button block v-b-toggle.accordion-1 variant="white">{{ticket.title}}</b-button>
                        </b-card-header>
                    </b-card>
            </b-card>
        </div>
    </b-container>
</template>

<script>
    export default {
        name: 'userProfile',
        data() {
            return {
                user: {},
                projects: []
            }
        },
        created() {
            this.callGet(`/user/profile`)
                .then(data => {
                    this.user = data.user
                    this.projects = data.projects
                })
        },
        methods: {
        }
    }
</script>