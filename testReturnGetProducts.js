import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1, // Número de usuários virtuais
    duration: '30s', // Duração do teste
};

function returnGetProduct(){
    // Faz a requisição GET para obter a lista de produtos
    let res = http.get('https://dummyjson.com/products');

    // Verifica se a requisição foi bem-sucedida
    check(res, {
        'status é 200': (r) => r.status === 200,
        'retorna a lista de produtos': (r) => r.json().products && r.json().products.length > 0,
    });

    // Validação adicional (opcional): verifica se o primeiro produto tem as propriedades esperadas
    check(res.json().products[0], {
        'primeiro produto tem título': (p) => p.title !== undefined,
        'primeiro produto tem preço': (p) => p.price !== undefined,
    });
}

export default function () {

    returnGetProduct();

    // Pausa entre as requisições para simular comportamento humano
    sleep(1);
}
