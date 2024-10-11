import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 300, // Número de usuários virtuais
    duration: '20s', // Duração do teste
};


function testValidPrduct(){
    // Cenário 1: Produto válido
    let resValid = http.get('https://dummyjson.com/products/1');

    check(resValid, {
        'status é 200': (r) => r.status === 200,
        'produto encontrado': (r) => r.json().id === 1,
        'produto tem título': (r) => r.json().title !== undefined,
    });
}

function testProductInvalid(){

    // Cenário 2: Produto inválido (ID não existente)
    let resInvalid = http.get('https://dummyjson.com/products/9999');

    check(resInvalid, {
        'status é 404 para produto inválido': (r) => r.status === 404,
        'mensagem de erro correta': (r) => r.json().message === 'Product not found',
    });
}

export default function () {

testProductInvalid();
testValidPrduct();

    // Pausa entre as requisições para simular comportamento humano
    sleep(1);
}
