<template lang="pug">
  .home
    section.hero.is-primary
      .hero-body.has-text-left
        .container
          h1.title Just Chilling
          h2.subtitle
            | Everything you type will be spoken out loud to every other user connected. Try it out!
            |
            | Please be polite!
    section.container
      section.section
        chat
</template>

<script>
export default {
  name: 'Home',
  components: {
    chat: () => import('@/components/Chat.vue')
  }
}
</script>

<!-- <style lang="sass"> -->
<!--   .hero -->
<!--     padding-left: 3em -->
<!--     padding-right: 3em -->
<!-- </style> -->
