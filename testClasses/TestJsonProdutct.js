export class TestJsonProducts{

    static productOne(){
        return JSON.stringify({
            title: "Perfume Oil 10",
            description: "Mega Discount, Impression of A...",
            price: 13,
            discountPercentage: 8.4,
            rating: 4.26,
            stock: 65,
            brand: "Impression of Acqua Di Gio",
            category: "fragrances",
            thumbnail: "https://i.dummyjson.com/data/products/11/thumnail.jpg"

        });

    }

    static produtctTwo(){

        return JSON.stringify({
                description: "No title product",
                price: 13,
                discountPercentage: 8.4,
                rating: 4.26,
                stock: 65,
                brand: "Brand Name",
                category: "fragrances",
                thumbnail: "https://i.dummyjson.com/data/products/11/thumnail.jpg"
        });
    };

    static productThree(){
        
        return JSON.stringify({
            title: "Invalid Price Product",
            description: "Product with invalid price",
            price: "thirteen", // preço inválido como string
            discountPercentage: 8.4,
            rating: 4.26,
            stock: 65,
            brand: "Brand Name",
            category: "fragrances",
            thumbnail: "https://i.dummyjson.com/data/products/11/thumnail.jpg" 
        });
    }

    static productFour(){
        return JSON.stringify({
        title: "Invalid Category Product",
        description: "Product with invalid category",
        price: 13,
        discountPercentage: 8.4,
        rating: 4.26,
        stock: 65,
        brand: "Brand Name",
        category: "unknown-category", // categoria inválida
        thumbnail: "https://i.dummyjson.com/data/products/11/thumnail.jpg"
            });
    }
}