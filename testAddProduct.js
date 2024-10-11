import http from 'k6/http';
import { check, sleep } from 'k6';
import { TestJsonProducts } from './testClasses/';

export let options = {
    vus: 1, // Número de usuários virtuais
    duration: '60s', // Duração do teste
};

function testCreateProductSuccess(){
   // Cenário 1: Adição bem-sucedida de um produto válido
    const validatePayload = TestJsonProducts.productOne();
    
    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let res = http.post('https://dummyjson.com/products/add', validatePayload, params);

    check(res, {
        'status é 200': (r) => r.status === 200,
        'produto foi adicionado': (r) => r.json().title === "Perfume Oil",
    });

}

function testCreateProductWitoutTitle(){
   
    // Cenário 2: Tentativa de adicionar produto sem título
    const noTitlePayload = TestJsonProducts.produtctTwo();

    let resNoTitle = http.post('https://dummyjson.com/products/add', noTitlePayload, params);

    check(resNoTitle, {
        'status é 400 (título ausente)': (r) => r.status === 400,
        'mensagem de erro para título ausente': (r) => r.json().message === 'Title is required',
    }); 
}

function testAddProductPriceInvalid(){
    // Cenário 3: Tentativa de adicionar produto com preço inválido
    const invalidPricePayload = TestJsonProducts.productThree();

    let resInvalidPrice = http.post('https://dummyjson.com/products/add', invalidPricePayload, params);

    check(resInvalidPrice, {
        'status é 400 (preço inválido)': (r) => r.status === 400,
        'mensagem de erro para preço inválido': (r) => r.json().message === 'Price must be a number',
    });

}

function testAddProductCategoryInvalid(){

    // Cenário 4: Tentativa de adicionar produto com categoria inválida
const invalidCategoryPayload = TestJsonProducts.productFour();

    let resInvalidCategory = http.post('https://dummyjson.com/products/add', invalidCategoryPayload, params);

    check(resInvalidCategory, {
        'status é 400 (categoria inválida)': (r) => r.status === 400,
        'mensagem de erro para categoria inválida': (r) => r.json().message === 'Invalid category',
    });
}

export default function () {

testCreateProductSuccess();
testCreateProductWitoutTitle();
testCreateProductWitoutTitle();
testAddProductPriceInvalid();
testAddProductCategoryInvalid();

    // Pausa entre as requisições para simular comportamento humano
    sleep(1);

}
