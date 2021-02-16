<template>
  <div class="listings">
    <h2>Current Vacancies</h2>
    <ul>
      <nuxt-link :to="'/careers/listing/' + role.post_name" v-for="role in careers" :data="role" :key="role.ID">
        <li class="col-12">
          <h3>{{role.post_title}} <span class="location" v-if="role.location">- {{role.location}}</span></h3>
          <p class="h5">{{postdate(role)}}</p>
          <p>{{role.post_excerpt}}</p>
        </li>
      </nuxt-link>
    </ul>
  </div>
</template>

<script>
import {format, parseISO} from 'date-fns'
export default {
  props: ['careers'],
  methods: {
    postdate: function (role) {
      var newdate = parseISO(role.post_date)
      return 'Added: ' + format(newdate, 'Do MMMM yyyy')
    }
  }
}
</script>
