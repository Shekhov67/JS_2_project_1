Vue.component('searchform', {
    props: ['user-search'],
    template: `<div class="search-form" @submit.prevent='$parent.filter'>
               <search ></search>
   </div>`
})
Vue.component('search', {
    props: ['search'],
    template: `<div>
    <input type="text" class="search-field" v-model='$root.userSearch'>
   <button class="btn-search" type="submit" @click='$root.filter(search)'>
   <i class="fas fa-search"></i></button>
   </div>`
})