<template>
    <div>
        <v-card v-if="content==0">
            <v-container>
                <v-card-title>
                Lista de pedidos
                <v-spacer></v-spacer>
                </v-card-title>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">Detalle</th>
                                <th class="text-left">Nombres</th>
                                <th class="text-left">Apellidos</th>
                                <th class="text-left">Dirección</th>
                                <th class="text-left">Email</th>
                                <th class="text-left">Teléfono</th>
                                <th class="text-left">Total</th>
                                <th class="text-left">Fecha del pedido</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in orders.data" :key="item.id">
                                <td>
                                    <v-icon
                                        color="#34495E"
                                        class="mr-2"
                                        @click="content=1; loadDetails(item.details)"
                                    >
                                    mdi-view-list
                                    </v-icon>
                                </td>
                                <td>{{ item.clients.names }}</td>
                                <td>{{ item.clients.surnames }}</td>
                                <td>{{ item.clients.address }}</td>
                                <td>{{ item.clients.email }}</td>
                                <td>{{ item.clients.phone }}</td>
                                <td>${{ item.total }}</td>
                                <td >{{item.created_at.substring(0, 10)}}&nbsp;-&nbsp;{{item.created_at.substring(11, 19)}}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>  
                <paginate store="order" collection="orders"/>
            </v-container>
        </v-card>
        <v-card v-else-if="content==1">
            <v-container>
                <v-card-title>
                    <v-icon
                        color="blue"
                        class="mr-2"
                        @click="content=0"
                    >
                    mdi-arrow-left-bold
                    </v-icon>
                    Detalle del pedido
                </v-card-title>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">Producto</th>
                                <th class="text-left">Cantidad</th>
                                <th class="text-left">Precio unitario</th>
                                <th class="text-left">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in arrayOrderDetail" :key="item.id">
                                <td>{{ item.products.name }}</td>
                                <td>{{ item.quantity }}</td>
                                <td>${{ item.price }}</td>
                                <td>${{ item.total }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>  
            </v-container>
        </v-card>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import paginate from "./paginate"

    export default {
     data () {
            return {     
                dialog: false,
                titleModal: '',
                tipoAccion: 0,
                content: 0,
                search: '',
                errorOrder: 0, 
                errorMessajeOrder: [],
                arrayOrderDetail: [],
            }
        },
        components: {
            paginate
        },
        computed: {
            ...mapState('order', ['orders']),
        },
        methods:{
            loadDetails(details)
            {
                this.arrayOrderDetail = details;
            },
        },
        created(){
            this.$store.dispatch('order/getList', [0]);
        }
    }
</script>