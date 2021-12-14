Vue.component('error', {
    props: ['error', 'visibility'],
    template: `
   <div class='error' v-show='visibility' >
            <h1>ERROR to SERVER</h1>
   </div>
   `
})