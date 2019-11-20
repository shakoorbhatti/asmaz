import React, { Component } from 'react'
import {storeProducts,detailProduct} from './data';
import Product from './Components/Product';


const ProductContext = React.createContext();
//Provider
//Consumer
class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        //cart: storeProducts,
        //modelOpen:true,
        modelOpen: false,
        modelProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
    };
    componentDidMount() {
        this.setProducts();
    }
    setProducts = () => {
        let tempProducts= [];
        storeProducts.forEach(item =>{
            const singleItem = {...item};
            tempProducts = [...tempProducts,singleItem];
        });
        this.setState(() => {
            return { products: tempProducts };
        });
    };

    getItem = (id) =>{
        const product = this.state.products.find(item => item.id ===id);
        return product;
    };


    handleDetail = (id) =>{
        const product = this.getItem(id);
        this.setState(()=>{
            return{detailProduct:product}
        });
        //console.log('Hello From Detail');
    };
    addToCart= id => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;

        this.setState(() =>{
            return {products:tempProducts,cart:[...this.state.cart,product]};
        },() =>{//console.log(this.state);
            this.addTotals();
        }
        );

        //console.log('Hello From add to Cart. id is${id}');
    };
        //tester = () => {
        //console.log('State products :', this.state.products[0].inCart);
        //console.log('Data products :', storeProducts[0].inCart);

        //const tempProducts = [...this.state.products];
        //tempProducts[0].inCart = true
        //this.setState(()=>{
            //return{products:tempProducts}
       // },()=>{
           // console.log('State products :', this.state.products[0].inCart);
           // console.log('Data products :', storeProducts[0].inCart);
        //})
    openModel = id =>{
        const product = this.getItem(id);
        this.setState(()=>{
            return{modelProduct:product,modelOpen:true}
        })
    }
    closeModel = () =>{
        this.setState(() =>{
            return {modelOpen:false}
        });
    };
    increment = (id) =>{
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item =>item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(
            () =>{
                return{cart:[...tempCart]};
            },
            () =>{
                this.addTotals();
            }
            );
        //console.log('this is increment method');
    };
    decrement = (id) =>{
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item =>item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count = product.count - 1;
        if(product.count === 0){
            this.removeItem(id)
        }
        else{
        product.total = product.count * product.price;
        this.setState(
            () => {
                return{cart:[...tempCart]};
            },
            () => {
                this.addTotals();
            }
            );
        }
        //console.log('this is decrement method');
    };
    removeItem = (id) =>{
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(() =>{
            return {
                cart:[...tempCart],
                products:[...tempProducts],
            }
        },() =>{
            this.addTotals();
        });
        //console.log('Item Removed');
    };
    clearCart = () => {
        this.setState(() =>{
            return { cart: [] };
        },() =>{
            this.setProducts();
            this.addTotals();
        }
        );
       // console.log('Cart Was Cleared');
    };
    addTotals = () =>{
        let subTotal = 0;
        this.state.cart.map(item =>(subTotal += item.total));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(() =>{
            return {
                cartSubTotal:subTotal,
                cartTax:tax,
                cartTotal:total,
            };
        });
    };
    render() {
        return (
            <ProductContext.Provider
            value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModel:this.openModel,
                closeModel:this.closeModel,
                increment:this.increment,
                decrement:this.decrement,
                removeItem:this.removeItem,
                clearCart:this.clearCart,
            }}>
                {/*<button onClick={this.tester}>test me</button>*/}
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider,ProductConsumer};
