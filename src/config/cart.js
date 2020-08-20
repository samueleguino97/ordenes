const {AsyncStorage} = require('react-native');

class Cart {
  constructor() {
    this.getItems();
  }

  async loadItems() {
    const cartItemsString = await AsyncStorage.getItem('cart');
    if (!cartItemsString) {
      return [];
    }
    const cartItems = JSON.parse(cartItemsString);
    return cartItems;
  }

  getTotal() {
    if (!this.items || !this.items.length) {
      return 0;
    }

    return this.items
      .map(item => item.price * item.quantity)
      .reduce((total, next) => (next ? total + next : total), 0);
  }

  async getItems() {
    const items = await this.loadItems();
    this.items = items;
    return items;
  }

  async removeItem(item) {
    const items = await this.loadItems();
    const existingItemIndex = items.findIndex(
      oldItem => oldItem.id === item.id,
    );
    if (existingItemIndex === -1) {
      console.log('doesnt exist');
    } else {
      items.splice(existingItemIndex, 1);
    }

    return this.setItems(items);
  }

  async setItems(items) {
    return AsyncStorage.setItem('cart', JSON.stringify(items));
  }

  async setCartItem(item = {}, quantity = 1) {
    let items = await this.loadItems();
    if (!items) {
      items = [];
    }
    const existingItemIndex = items.findIndex(
      oldItem => oldItem.id === item.id,
    );
    if (existingItemIndex === -1) {
      items.push({...item, quantity});
    } else {
      items[existingItemIndex] = {
        ...items[existingItemIndex],
        quantity: items[existingItemIndex].quantity + quantity,
      };
    }

    return this.setItems(items);
  }
  async cleanCart() {
    return AsyncStorage.setItem('cart', JSON.stringify([]));
  }
}

const cart = new Cart();

export default cart;
