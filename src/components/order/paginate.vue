<template>
     <v-pagination
     color="#34495E"
      v-model="currenPage"
      :length="lastPage"
      :total-visible="8"
    ></v-pagination>
</template>
<script>
    export default {
        props: ['store','collection'],
        watch:{
            currenPage( newVal) {
                // console.log('current page click: '+ newVal);
                this.paginatePage( newVal );
            }
        }, 
        computed: {
            currenPage: {
                get(){
                    // return this.collection.current_page;
                    return this.$store.state[this.store][this.collection].current_page;
                }, 
                set( value ){
                    this.$store.commit(this.store + '/SetCurrentPage', value);
                }
            }, 
            lastPage:{
                get(){
                    return this.$store.state[this.store][this.collection].last_page;
                }
            }
        },
        methods: {
            paginatePage(pageNumber){
                this.$store.dispatch(this.store +'/getList', [pageNumber]);
            }
        }
    }
</script>