import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 10, // Número de usuários virtuais
    duration: '30s', // Duração do teste
};


function getUser(){
    // Faz a requisição GET para obter a lista de usuários
    let res = http.get('https://dummyjson.com/users');

    // Verifica se o status da resposta é 200 e se o conteúdo retornado não está vazio
    check(res, {
        'status é 200': (r) => r.status === 200,
        'resposta contém usuários': (r) => r.json().users && r.json().users.length > 0,
    });
}

export default function () {
getUser();

    // Adiciona uma pausa de 1 segundo entre as requisições
    sleep(1);
}