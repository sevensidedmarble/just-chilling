<template lang="pug">
  .chat
    .box.has-background-white-ter
      h3.subtitle Currently connected users
      .clients
        template(v-for="client in clients")
          p.strong {{ client.name }}
    .box.has-background-white-ter
      h3.subtitle Chat log (debug)
      .messages(v-for='(msg, index) in messages' :key='index')
        p
          span.font-weight-bold {{ msg.user }}:
            |
            | {{ msg.message }}
    .box.has-background-white-ter
      form(@submit.prevent='sendMessage')
        .field
          label.label(for='user') User:
          .control
            input.input(type='text' v-model='user')
        .field
          label.label(for='message') Message:
          .control
            input.input(type='text' v-model='message')
        .field.is-grouped
          .control
            button.button.is-success(type='submit') Send
    //- .box.has-background-white-ter
    //-   h3.title Settings
    //-   form(@submit.prevent='editName')
    //-     .field.is-horizontal
    //-       .field-label.is-normal
    //-         label.label(for='name') Name:
    //-       .field-body
    //-         .field
    //-           .control
    //-             input.input(type='text' v-model='name')
    //-   pre {{ name }}
</template>

<script>
import io from 'socket.io-client'

const synth = window.speechSynthesis

export default {
  name: 'Chat',
  props: {
    msg: String
  },
  mounted() {
    this.socket.on('message', (data) => {
      this.messages.push(data)
      console.log(data.message)
      const speech = new SpeechSynthesisUtterance(data.message)
      synth.speak(speech)
    });

    this.socket.on('clients', (data) => {
      this.clients = data
    });
  },
  data() {
    return {
      user: '',
      name: "new guy",
      startingName: "new guy",
      message: '',
      messages: [],
      clients: [],
      socket : io('localhost:6544')
    }
  },
  methods: {
    editName(e) {
      console.log(e)
    },
    // onNameEdit(e){
    //   let input = e.target.innerHTML
    //   input = input.replace(/\n|\r/g, "")
    //   this.name = input
    // },
    // endNameEdit(){
    //   this.$el.querySelector('#name').blur()
    // },
    // onLiveNameEdit(e){
    //   let input = e.target.innerHTML
    //   input = input.replace(/\n|\r/g, "")
    //   this.name = input
    // },
    sendMessage(e) {
      e.preventDefault();

      this.socket.emit('send_message', {
        user: this.user,
        message: this.message
      });
      this.message = ''
    }
  },
}
</script>

<style lang="sass">
  .name-field
    font-weight: bold !important
  .name
    border: 1px solid #ccc
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap
</style>
