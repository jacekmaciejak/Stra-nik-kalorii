//GETTING THE PRODUCTS
export default class listOfProducts {
  async getListOfProducts() {
    try {
      let result = await fetch("groupofproducts.json");
      let data = await result.json();
      let products = data.items;
      products = products.map((item) => {
        const { title } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, id, image };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}
