<template>
  <div>
    <div>
      <div>
        <div class="">
          <h2 v-if="!isEdit.title" @click="isEdit.title = true">{{ ticketDetail.title }}</h2>
          <b-form-input v-if="isEdit.title" type="text" v-model="updateForm.title" @blur="update" autofocus/>
        </div>
        <div class="mb-4">
          <div v-if="!isEdit.explanation" @click="isEdit.explanation = true">
            <div v-if="ticketDetail.explanation.length <= 0" class="text-muted">
              詳細なし
            </div>
            <div v-else>
              {{ ticketDetail.explanation }}
            </div>
          </div>
          <b-form-input v-if="isEdit.explanation" type="text" v-model="updateForm.explanation" @blur="update"
                        autofocus/>
        </div>
      </div>
    </div>
    <div class="mb-4">
      <b-row>
        <b-col cols="2">
          <div class="d-flex align-items-center">
            <span class="text-muted">担当者:</span>
            <b-avatar variant="white" class="float-right ml-2" :src="ticketDetail.worker.avatar"/>
          </div>
        </b-col>
        <b-col>
          <div v-if="!isEdit.worker" @click="isEdit.worker = true">
            <div v-if="ticketDetail.worker.name">
              {{ ticketDetail.worker.name }}
            </div>
            <div v-else class="text-muted">
              未割り当て
            </div>
          </div>
          <b-form-select v-if="isEdit.worker" value-field="id" text-field="name" :options="users"
                         v-model="updateForm.worker" @input="update"/>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="2">
          <div class="d-flex align-items-center">
            <span class="text-muted">Status:</span>
          </div>
        </b-col>
        <b-col>
          <div v-if="!isEdit.status" @click="isEdit.status = true">
            <div>
              {{ ticketDetail.status.name }}
            </div>
          </div>
          <b-form-select v-if="isEdit.status" value-field="id" text-field="name" :options="statuses"
                         v-model="updateForm.status_id" @input="update"/>
        </b-col>
      </b-row>
    </div>
    <div>
      <div>
        <b-form-group>
          <b-form-textarea class="float-right" v-model="commentForm.comment" placeholder="コメント..."/>
          <b-button class="float-right" size="sm" @click="onCommentPost">コメントを投稿</b-button>
        </b-form-group>
      </div>
      <div>
        <div v-for="comment in comments">
          <label class="text-muted">{{ comment.user.name }}</label>
          <div v-text="comment.comment"></div>
          <hr>
        </div>
      </div>
    </div>
    <p class="text-right">作成者: <label class="text-muted">{{ ticketDetail.reporter.name }}</label></p>
  </div>
</template>

<script>
export default {
  name: 'ticketDetailModal',
  props: {
    ticketDetail: {
      type: Object,
      default: () => {
        return {
          project: {
            id: 99999,
            name: 'def-project'
          },
          ticket_id: 99999,
          title: 'def-title',
          explanation: 'def-explanation',
          status: {
            id: 99999,
            name: 'def-todo'
          },
          worker: {
            id: 99999,
            name: 'def-worker'
          },
          reporter: {
            id: 99999,
            name: 'def-reporter'
          }
        }
      }
    },
    comments: {
      type: Array
    },
    users: {
      type: Array
    },
    statuses: {
      type: Array
    }
  },
  data() {
    return {
      isEdit: {
        title: false,
        explanation: false,
        reporter: false,
        worker: false,
        status: false
      },
      updateForm: {
        ticket_id: null,
        title: '',
        status_id: '',
        explanation: '',
        worker: null,
      },
      commentForm: {
        ticket_id: this.ticketDetail.ticket_id,
        comment: ''
      }
    }
  },
  created() {
    this.updateForm = {
      ticket_id: this.ticketDetail.ticket_id,
      title: this.ticketDetail.title,
      status_id: this.ticketDetail.status.id,
      explanation: this.ticketDetail.explanation,
      worker: this.ticketDetail.worker.id,
    };
  },
  methods: {
    async update() {
      if (this.ticketDetail.title === this.updateForm.title &&
          this.ticketDetail.status.id === this.updateForm.status_id &&
          this.ticketDetail.explanation === this.updateForm.explanation &&
          this.ticketDetail.worker.id === this.updateForm.worker) {
        this.allIsEditFalse()
        return false
      }
      await this.$emit('ticket-update', this.updateForm)
      this.allIsEditFalse()
    },
    onDelete(ticketId) {
      this.$emit('ticket-delete', ticketId)
    },
    allIsEditFalse() {
      this.isEdit.title = false;
      this.isEdit.explanation = false;
      this.isEdit.worker = false;
      this.isEdit.status = false;
    },
    async onCommentPost() {
      if (this.commentForm.comment === '') {
        alert('コメントを入力してくれい')
        return
      }
      await this.$emit('comment-post', this.commentForm)
      this.commentForm.comment = ''
    }
  }
}
</script>