class Cart {
    cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
    localStorageKey = undefined;
    
    cartToStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems))
    };

    addToCart(productId) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
              matchingItem = cartItem;
          }
      })
      
      
      if (matchingItem) {
          matchingItem.quantity += 1;
      }else{
      
          this.cartItems.push({
              productId: productId,
              quantity: 1,
              deliveryOptionId: '1'
          });
        }
        this.cartToStorage();
    };
    
    removeFromCart(productId) {
        const newCart = []
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem)
            }
        })
        this.cartItems = newCart;
        this.cartToStorage();
    };
};

const cart = new Cart();
const businessCart = new Cart();

cart.localStorageKey = 'cart';
businessCart.localStorageKey = 'businessCart';

console.log(cart)
console.log(businessCart)
// localStorage.removeItem('cart')