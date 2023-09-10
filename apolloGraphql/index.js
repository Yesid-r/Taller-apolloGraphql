import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'

const data = await fetch('https://dummyjson.com/products/').then(res => res.json())
// console.log("🚀 ~ file: index.js:5 ~ data:", data)
const products = data.products
// console.log("🚀 ~ file: index.js:7 ~ products:", products)


const typeDefs = `

type Product {
    id: ID!
    title: String
    description: String
    price: Float
    discountPercentage: Float
    rating: Float
    stock: Int
    brand: String
    category: String
    thumbnail: String
    images: [String]
  }
  input ProductInput {
    title: String!
    description: String
    price: String!
    discountPercentage: String
    rating: String
    stock: String!
    brand: String
    category: String
    thumbnail: String
    images: [String]
  }

  type Query {
      hello: String
      products: [Product]
      findProduct(id: Int!): Product
      deleteProduct(id: Int!): String

      
  }
  type Mutation {
      createProduct(input: ProductInput!): Product
      updateProduct(id: Int!, title: String, description: String, price: Float, discountPercentage: Float, rating: Float, stock: Int, brand: String, category: String, thumbnail: String, images: [String]): Product
    }

`

let deleteProduct = (id) => {
let mnsaje = "Not found"

  products.forEach(element => {
    if(element.id === id){
      products.splice(products.indexOf(element), 1);
      console.log(element)
      mnsaje ="Product Deleted"
    }
  })
  return mnsaje
}

const resolvers = {
    Query: {
        hello: () => 'Hello World',
        products: () => products,
        findProduct: (parent, args) => {
            const { id } = args;
            return products.find(product => product.id === id)
        },
        deleteProduct: (parent, args) => {
            const { id } = args;
            return deleteProduct(id)
        }
    },
    Mutation: {
        updateProduct: (parent, args) => {
          const { id, ...updatedFields } = args;
          console.log(args)
          console.log("🚀 ~ file: index.js:50 ~ id:", id)
          console.log(updatedFields)
          const productIndex = products.findIndex(product => product.id === id);
    
          if (productIndex === -1) {
            throw new Error(`Product with ID ${id} not found`);
          }
    
          
          products[productIndex] = {
            ...products[productIndex],
            ...updatedFields
          };
    
          return products[productIndex];
        }, createProduct: (parent, args) => {
          const { input } = args;
          const newProduct = {
            id: products.length + 1, 
            ...input,
          };
          products.push(newProduct);
          console.log(products)
          return newProduct;
        }
      }

}

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } })
console.log(`Server ready at ${url}`)