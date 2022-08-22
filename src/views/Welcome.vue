<template>
<div>
  <v-app id="inspire">
    <v-app-bar
    app
    color="#34495E"
    dark
    >
        <v-toolbar-title> 
           <v-img
            width="100"
            src="img/logo.png"
            />
        </v-toolbar-title>
        <v-spacer />
    </v-app-bar>

    <v-content>
        <v-container>
                <v-card-title cols="12" style="color: #34495E">
                    Lista de productos
                    <v-spacer></v-spacer>
                    <v-row>
                        <v-col cols="8">
                            <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Buscar producto por nombre o referencia"
                            single-line
                            hide-details
                            @keyup.enter="searchProduct();"
                            ></v-text-field>  
                        </v-col>
                    </v-row>    
                </v-card-title>
               
                <v-item-group
                    multiple
                >
                    <v-row>
                        <v-col
                            v-for="item in products.data" :key="item.id"
                            cols="12"
                            sm="4"
                            md="2"
                        >
                         <v-card
                            class="mx-auto"
                            max-width="250"
                        >
                             <v-avatar
                                class="ma-3"
                                size="90"
                                tile
                            >
                                <v-img 
                                :src="item.image"
                                aspect-ratio="1"
                                class="grey lighten-2"
                                ></v-img>
                            </v-avatar>
                            <v-card-subtitle 
                            v-text="item.name" 
                            style="height: 50px; overflow: hidden; padding: 5px 15px; color: #34495E; font-weight: bold; text­align: justify; "
                            ></v-card-subtitle>
                            <v-card-text class="text--primary">     
                                <div class="subtitle-2 secondary--text">Ref.: {{ item.reference }}</div>
                                <div class="subtitle-2 secondary--text">Stock: {{ item.stock }} unds</div>
                                <div class="subtitle-2 secondary--text">Precio unitario: ${{ item.price }}</div>                                
                            </v-card-text>
                            <v-card-actions 
                            style="padding: 0px 5px;"
                            >
                                <v-btn bottom color="green" text @click="openModel(dialog = true, item)"
                                ><v-icon>mdi-cart-plus</v-icon>
                                Agregar
                                </v-btn>
                            </v-card-actions>
                         </v-card>
                        </v-col>
                    </v-row>
                    
                </v-item-group>
                <paginate store="product" collection="products" :busqued="this.search"/>

                <!-- modal detalle producto -->
                <v-dialog v-model="dialog" width="400px">
                    <v-card>
                    <v-card-title 
                    style="color: #ffffff; background: #34495E"
                    >
                    {{ product.name }} - Ref.: {{ product.reference }}
                    </v-card-title>
                    <v-container>
                        <v-card
                        class="mx-auto"
                        max-width="400"
                        >
                            <v-avatar
                            class="ma-3"
                            size="120"
                            tile
                            >
                                <v-img 
                                :src="product.imageUrl" 
                                aspect-ratio="1"
                                class="grey lighten-2"
                                ></v-img>
                            </v-avatar>
                            <v-card-text class="text--primary">
                                <div class="subtitle-2 secondary--text">Descripción: {{ product.description }}</div>
                                <br>
                                <div class="subtitle-2 secondary--text">Stock: {{ product.stock }} unds</div>
                                <div class="subtitle-2 secondary--text">Precio unitario: ${{ product.price }}</div>                                
                            </v-card-text>

                            <v-card-actions>
                                <v-col cols="3">
                                    <v-text-field
                                    label="Cantidad"
                                    type="number"
                                    v-model="product.cantidad"
                                    :min=1
                                    @keypress="textWithoutSpaceAndCharacters($event)"
                                    ></v-text-field>
                                </v-col>

                                <v-btn
                                color="green"
                                text
                                @click="agregarCarrito"
                                >
                                Agregar a Carrito
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-container>
                    <v-card-actions>
                        <div class="my-2">
                            <v-btn
                            text
                            color="error" 
                            @click="dialog = false"
                            >Cancelar</v-btn>
                        </div>
                    </v-card-actions>
                  </v-card>       
                </v-dialog>
                 <v-dialog v-model="dialog_carrito" width="600px">
                    <v-card>
                        <v-card-title style="color: #ffffff; background: #34495E" 
                        >Carrito de compras
                        </v-card-title>
                        <v-container>
                            <template v-if="form==0">
                                 <v-list shaped>
                                <v-list-item-group  color="primary">
                                    <v-list-item
                                    v-for="(item, i) in carrito"
                                    :key="i"
                                    >
                                    <v-list-item-icon>
                                        <v-icon 
                                        color="green"
                                        @click="aumentarProducto(i)"
                                        v-if="item.quantity < item.stock"
                                        >mdi-plus-circle-outline
                                        </v-icon>
                                        <v-icon color="orange" @click="disminuirProducto(i)">mdi-minus-circle-outline</v-icon>
                                        <v-icon color="red" @click="eliminarProducto(i)">mdi-delete-circle</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title class="font-weight-bold primary--text">{{ item.product }}. Stock: {{ item.stock }} unds.</v-list-item-title>
                                        <v-list-item-subtitle>{{ item.quantity }} * ${{ item.price }} = ${{ item.total_producto }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                                <v-subheader class="font-weight-bold success--text">TOTAL FACTURA: ${{ pedido.total }}</v-subheader>
                                </v-list>
                            </template>
                            <template v-else-if="form==1">
                                   <v-row class="mx-2">
                                    <v-col
                                    class="align-center justify-space-between"
                                    cols="12"
                                    >
                                    </v-col>
                                     <v-col cols="6">
                                        <v-text-field 
                                            label="Número de identificación"
                                            :min=1
                                            type="number"
                                            max:
                                            hide-details="auto"
                                            v-model="pedido.number"
                                            @keypress="textWithoutSpaceAndCharacters($event)"
                                        />
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field 
                                            label="Nombres"
                                            hide-details="auto"
                                            v-model="pedido.names"
                                        />
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field 
                                            label="Apellidos"
                                            hide-details="auto"
                                            v-model="pedido.surnames"
                                        />
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field 
                                            label="Dirección"
                                            hide-details="auto"
                                            v-model="pedido.address"
                                        />
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field 
                                            label="Email"
                                            hide-details="auto"
                                            v-model="pedido.email"
                                        />
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field 
                                            label="Teléfono"
                                            :min=1
                                            type="number"
                                            hide-details="auto"
                                            v-model="pedido.phone"
                                            @keypress="textWithoutSpaceAndCharacters($event)"
                                        />
                                    </v-col>
                                    <v-col cols="12">
                                        <div class="div-error">
                                                <div class="text-error">
                                                    <div v-for="(errors, id) in errorMessajePedido" :key="id" v-text="errors"></div>
                                                </div>
                                            </div>
                                    </v-col>     
                                </v-row>
                            </template>        
                            
                        </v-container>
                        <v-card-actions>
                            <div class="my-2">
                                <v-btn
                                text
                                color="error" 
                                @click="dialog_carrito = false, form = 0"
                                >Cancelar</v-btn>
                            </div>
                             <div class="my-2" v-if="carrito.length > 0 && form== 0"> 
                                <v-btn
                                text
                                color="success" 
                                @click="form = 1"
                                >Confirmar pedido</v-btn>
                            </div>
                             <div class="my-2" v-if="form == 1"> 
                                <v-btn
                                text
                                color="success" 
                                @click="sendPedido()"
                                >Continuar</v-btn>
                            </div>
                        </v-card-actions>
                    </v-card>       
                </v-dialog>
            </v-container>
             <v-btn bottom color="red" dark fab fixed right
            @click="dialog_carrito = true"
            ><v-icon>mdi-cart-outline</v-icon> {{ carrito.length }}
            </v-btn>
    </v-content>
    <v-footer
      color="#34495E"
      app
    >
      <span class="white--text">&copy; 2022 - Jhon Freddy Burgos Aroca</span>
    </v-footer>
  </v-app>  
</div>

</template>

<script>

import axios from 'axios'
import { mapState } from 'vuex'
import Swal from 'sweetalert2'

import paginate from './paginate'

const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

export default {

        data () {
            return {     
                dialog: false,
                dialog_carrito: false,
                titleModal: '',
                tipoAccion: 0,
                search: '',
                errorPedido: 0, 
                errorMessajePedido: [],
                carrito: [],
                form : 0,
                product: {
                    id: '',
                    name: '', 
                    reference: '',
                    description: '',
                    price: 0, 
                    imageName: '',
                    imageUrl: '',
                    cantidad: 1,
                    stock:0
                },  
                pedido: {
                    number: '',
                    names: '',
                    surnames: '', 
                    address: '', 
                    email: '', 
                    phone: '',
                    total: 0
                },
            }
        },

    components: {
        paginate
    },        

    computed: {
        ...mapState('product', ['products']),
    },    

        methods:{
            searchProduct(){
                this.$store.dispatch('product/getList', [0 ,this.search])
            },

            openModel(dialog, data = []){
                this.product.id = data['id'];
                this.product.name = data['name'];
                this.product.reference = data['reference'];
                this.product.description = data['description'];
                this.product.price = data['price'];
                this.product.stock = data['stock'];
                this.product.imageUrl = data['image'];
            }, 

            validarstock(stock, quantity){

                // console.log(parseInt(quantity), parseInt(stock))
                if(parseInt(quantity) > parseInt(stock)){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Cantidad insuficiente!'
                        })
                }else{
                    return true
                }
            },

            agregarCarrito(){

                if(this.carrito.length == 0 ){

                    if(this.validarstock(this.product.stock, this.product.cantidad)){
                        this.carrito.push({
                            id: this.product.id,
                            product: this.product.name,
                            price: this.product.price,
                            quantity: this.product.cantidad,
                            total_producto: parseInt(this.product.cantidad) * parseInt(this.product.price),
                            stock: this.product.stock
                        }); 

                        this.pedido.total = this.pedido.total + (parseInt(this.product.cantidad) * parseInt(this.product.price));
                    }
             
                } else {
                    for(let i in this.carrito){            
                        if(this.carrito[i].id == this.product.id){  
                            if(this.validarstock(this.product.stock, (parseInt(this.product.cantidad) + parseInt(this.carrito[i].quantity) ))){
                                this.pedido.total = this.pedido.total - (parseInt(this.carrito[i].quantity) * parseInt(this.carrito[i].price))                      
                                this.carrito[i].quantity = parseInt(this.carrito[i].quantity) + parseInt(this.product.cantidad);
                                this.carrito[i].total_producto = parseInt(this.carrito[i].quantity) * parseInt(this.carrito[i].price);  
                                this.pedido.total = parseInt(this.pedido.total) + parseInt(this.carrito[i].total_producto); 
                                this.limpiar_dialog_detalle();
                                return;
                            }else{
                                return;
                            }
                        } 
                    }
                    
                    this.carrito.push({
                        id: this.product.id,
                        product: this.product.name,
                        price: this.product.price,
                        quantity: this.product.cantidad,
                        total_producto: parseInt(this.product.cantidad) * parseInt(this.product.price),
                        stock: this.product.stock
                    });

                    this.pedido.total = this.pedido.total + (parseInt(this.product.cantidad) * parseInt(this.product.price));
                }
                this.limpiar_dialog_detalle();
            },

            aumentarProducto(i){
                this.pedido.total = this.pedido.total - (parseInt(this.carrito[i].quantity) * parseInt(this.carrito[i].price)) 
                this.carrito[i].total_producto = (1 + parseInt(this.carrito[i].quantity)) * parseInt(this.carrito[i].price);
                this.carrito[i].quantity = parseInt(this.carrito[i].quantity) + 1;
                this.pedido.total = this.pedido.total + parseInt(this.carrito[i].total_producto); 
            }, 

            disminuirProducto(i)
            {
                if(parseInt(this.carrito[i].quantity) > 1){
                    this.pedido.total = this.pedido.total - (parseInt(this.carrito[i].quantity) * parseInt(this.carrito[i].price)) 
                    this.carrito[i].total_producto = (parseInt(this.carrito[i].quantity) - 1) * parseInt(this.carrito[i].price);
                    this.carrito[i].quantity = parseInt(this.carrito[i].quantity) - 1;
                    this.pedido.total = this.pedido.total + parseInt(this.carrito[i].total_producto);
                }
            },

            eliminarProducto(i)
            {
                this.pedido.total = this.pedido.total - (parseInt(this.carrito[i].quantity) * parseInt(this.carrito[i].price)) 
                this.carrito.splice(i, 1);
            },

            limpiar_dialog_detalle()
            {
                this.product.id = '';
                this.product.name = '';
                this.product.reference = '';
                this.product.description = '';
                this.product.price = '';
                this.product.cantidad = 1;
                this.dialog = false;
            },

            validatePedido()
            {
                this.errorPedido = 0;
                this.errorMessajePedido = [];
                if(!this.pedido.number) this.errorMessajePedido.push("* Ingrese el número de identificación.");
                if(!this.pedido.names) this.errorMessajePedido.push("* Ingrese el nombre.");
                if(!this.pedido.surnames) this.errorMessajePedido.push("* Ingrese el apellido.");
                if(!this.pedido.address) this.errorMessajePedido.push("* Ingrese la dirección.");
                if(!this.pedido.email) this.errorMessajePedido.push("* Ingrese el correo electrónico.");
                if(!this.pedido.phone) this.errorMessajePedido.push("* Ingrese el teléfono.");
                if(this.errorMessajePedido.length) this.errorPedido = 1;
                return this.errorPedido;
            },

            sendPedido()
            {
                if(this.validatePedido()){
                    return;
                }

                let acceder = this;
                Swal.fire({
                    title: 'Desea realizar el pedido ahora?',
                    text: "¡Confirmar!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Aceptar'
                    }).then((result) => {
                        if (result.value) {
                            axios.post("sendOrder", {
                                'pedido': acceder.pedido,
                                'carrito': acceder.carrito
                            }).then ( () => {
                                this.carrito = [];
                                this.pedido.total = 0;
                                this.pedido.number = '';
                                this.pedido.names = '';
                                this.pedido.surnames = ''; 
                                this.pedido.address = ''; 
                                this.pedido.email = ''; 
                                this.pedido.phone = '';
                                this.form = 0;
                                this.search = '';

                                this.dialog_carrito = false;
                                acceder.$store.dispatch("product/getList", [0 ,'']);
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Pedido realizado!'
                                })
                            }).catch(function (error) {
                                if (error.response.status === 422) {
                                    console.log(error.response.data.errors);
                                    acceder.errorMessajePedido = error.response.data.errors;
                                }
                            });                         
                        }
                })
            },

            textWithoutSpaceAndCharacters(evt) {
            var charCode = evt.key;
            var a = /^\w*$/g;
            var rta = a.test(charCode);
            return rta ? rta : evt.preventDefault();
            },              
        }, 

      

    created(){
        this.$store.dispatch('product/getList', [0, '']);
    }    
}
</script>

<style>
    .div-error{
        display: flex;
        justify-content: center;
    }
    .text-error{
        color: red !important;
        font-weight: bold;
        text-align: center;
    }
</style>