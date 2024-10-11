import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1, // Número de usuários virtuais
    duration: '120s', // Duração do teste
};


function validLogin(){
// Cenário 1: Login bem-sucedido
let validPayload = JSON.stringify({
    username: "emilys",
    password: "emilyspass"
});

let params = {
    headers: {
        'Content-Type': 'application/json',
    },
};

let res = http.post('https://dummyjson.com/auth/login', validPayload, params);

check(res, {
    'login bem-sucedido - status é 200': (r) => r.status === 200,
    'login bem-sucedido - resposta contém token': (r) => r.json().token !== undefined,
});
}

function wrongUserLogin(){

    // Cenário 2: Login com username incorreto
    let invalidUsernamePayload = JSON.stringify({
        username: "wronguser",
        password: "emilyspass"
    });

    let resInvalidUser = http.post('https://dummyjson.com/auth/login', invalidUsernamePayload, params);

    check(resInvalidUser, {
        'login falhou - status é 400 (username incorreto)': (r) => r.status === 400,
        'login falhou - mensagem de erro correta': (r) => r.json().message === 'Invalid credentials',
    });
}

function wrongPasswordLogin(){
    // Cenário 3: Login com password incorreto
    let invalidPasswordPayload = JSON.stringify({
        username: "emilys",
        password: "wrongpass"
    });

    let resInvalidPass = http.post('https://dummyjson.com/auth/login', invalidPasswordPayload, params);

    check(resInvalidPass, {
        'login falhou - status é 400 (password incorreto)': (r) => r.status === 400,
        'login falhou - mensagem de erro correta': (r) => r.json().message === 'Invalid credentials',
    });

    // Cenário 4: Login com campos vazios
    let emptyPayload = JSON.stringify({
        username: "",
        password: ""
    });

    let resEmpty = http.post('https://dummyjson.com/auth/login', emptyPayload, params);

    check(resEmpty, {
        'login falhou - status é 400 (campos vazios)': (r) => r.status === 400,
        'login falhou - mensagem de erro correta': (r) => r.json().message === 'Invalid credentials',
    });
}

export default function () {
    
validLogin();
wrongUserLogin();
wrongPasswordLogin();
    // Pausa entre as requisições para simular comportamento humano
    sleep(1);
}
