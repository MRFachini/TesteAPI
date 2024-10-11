import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 10, // Número de usuários virtuais
    duration: '30s', // Duração do teste
};


function getOneUser(){
    // Faz a requisição GET para obter a lista de usuários
    let res = http.get('https://dummyjson.com/users');

    // Verifica se a requisição foi bem-sucedida
    check(res, {
        'status é 200': (r) => r.status === 200,
    });

    // Procura o usuário com firstName "Michael"
    let users = res.json().users;
    let user = users.find(u => u.firstName === 'Michael');

    check(user, {
        'usuário com firstName "Michael" encontrado': (u) => u !== undefined,
        'firstName é "Michael"': (u) => u.firstName === 'Michael',
    });
}

export default function () {

    getOneUser();

    // Pausa entre as requisições para simular comportamento humano
    sleep(1);
}