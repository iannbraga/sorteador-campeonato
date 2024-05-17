$(document).ready(function () {
    let campeonatos = [
        { nome: "1° Fase", jogadores: ["Carlos", "João", "Pedro", "Luiz", "Thiago", "Papi", "Zé", "Iann", "Carioca", "Marcus"] },
        { nome: "2° Fase", jogadores: ["Carlos", "João", "Pedro", "Luiz", "Thiago"] }
    ];

    // Função para renderizar a lista de campeonatos
    function renderizarListaCampeonatos() {
        const listaCampeonatos = $('#listaCampeonatos');
        const selecionarCampeonato = $('#selecionarCampeonato');
        listaCampeonatos.empty();
        selecionarCampeonato.empty();
        campeonatos.forEach((campeonato, index) => {
            listaCampeonatos.append(`
                <li class="list-group-item">
                    <div class="d-flex justify-content-between align-items-center">
                        ${campeonato.nome}
                        <div>
                            <button class="btn btn-secondary btn-sm" onclick="sortearChapas(${index})">Sortear Chapas</button>
                            <button class="btn btn-danger btn-sm" onclick="excluirCampeonato(${index})">Excluir</button>
                        </div>
                    </div>
                </li>
            `);
            selecionarCampeonato.append(`
                <option value="${index}">${campeonato.nome}</option>
            `);
        });
    }

    // Função para renderizar a lista de jogadores por campeonato
    function renderizarListaJogadores() {
        const listaJogadores = $('#listaJogadores');
        listaJogadores.empty();
        campeonatos.forEach((campeonato, campeonatoIndex) => {
            if (campeonato.jogadores.length > 0) {
                listaJogadores.append(`
                    <li class="list-group-item active">${campeonato.nome}</li>
                `);
                campeonato.jogadores.forEach((jogador, jogadorIndex) => {
                    listaJogadores.append(`
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                        ${jogadorIndex + 1} ${jogador}
                            <button class="btn btn-danger btn-sm" onclick="excluirJogador(${jogadorIndex}, ${campeonatoIndex})">Excluir</button>
                        </li>
                    `);
                });
            }
        });
    }

    // Função para sortear chapas de jogadores e renderizar as chapas
    window.sortearChapas = function (campeonatoIndex) {
        const campeonato = campeonatos[campeonatoIndex];
        const jogadores = [...campeonato.jogadores];
        const chapas = [];

        while (jogadores.length >= 2) {
            const jogador1 = jogadores.splice(Math.floor(Math.random() * jogadores.length), 1)[0];
            const jogador2 = jogadores.splice(Math.floor(Math.random() * jogadores.length), 1)[0];
            chapas.push([jogador1, jogador2]);
        }

        // Se sobrar um jogador sem par
        if (jogadores.length === 1) {
            chapas.push([jogadores[0]]);
        }

        renderizarListaChapas(campeonatoIndex, chapas);
    }

    // Função para renderizar a lista de chapas em colunas
    // function renderizarListaChapas(campeonatoIndex, chapas) {
    //     const listaChapas = $('#listaChapas');
    //     const campeonato = campeonatos[campeonatoIndex];
    //     // Criar uma coluna separada para cada campeonato
    //     const colunaChapas = $(`<div class="col-6"><h4>${campeonato.nome}</h4></div>`);
    //     chapas.forEach((chapa, index) => {
    //         colunaChapas.append(`<p>Chapa ${index + 1}: ${chapa.join(' vs ')}</p>`);
    //     });
    //     listaChapas.append(colunaChapas);
    // }
    // Função para renderizar a lista de chapas em colunas
    // Função para renderizar a lista de chapas em colunas
    function renderizarListaChapas(campeonatoIndex, chapas) {
        const listaChapas = $('#listaChapas');
        const campeonato = campeonatos[campeonatoIndex];
        // Criar uma coluna separada para cada campeonato
        const colunaChapas = $(`<div class="col-md-6"><h4>${campeonato.nome}</h4><ul class="list-group"></ul></div>`);
        const ulChapas = colunaChapas.find('ul');
        chapas.forEach((chapa, index) => {
            const ordem = index + 1;
            ulChapas.append(`<li class="list-group-item">${ordem}°: ${chapa.join(' vs ')}</li>`);
        });
        listaChapas.append(colunaChapas);
    }

    // Adicionar novo campeonato
    $('#formularioCampeonato').on('submit', function (event) {
        event.preventDefault();
        const nomeCampeonato = $('#nomeCampeonato').val();
        campeonatos.push({ nome: nomeCampeonato, jogadores: [] });
        $('#nomeCampeonato').val('');
        renderizarListaCampeonatos();
    });

    // Adicionar novo jogador
    $('#formularioJogador').on('submit', function (event) {
        event.preventDefault();
        const nomeJogador = $('#nomeJogador').val();
        const campeonatoIndex = $('#selecionarCampeonato').val();
        campeonatos[campeonatoIndex].jogadores.push(nomeJogador);
        $('#nomeJogador').val('');
        renderizarListaJogadores();
    });

    // Excluir campeonato
    window.excluirCampeonato = function (index) {
        campeonatos.splice(index, 1);
        renderizarListaCampeonatos();
        renderizarListaJogadores();
        renderizarListaChapas();
    }

    // Excluir jogador
    window.excluirJogador = function (jogadorIndex, campeonatoIndex) {
        campeonatos[campeonatoIndex].jogadores.splice(jogadorIndex, 1);
        renderizarListaJogadores();
        renderizarListaChapas();
    }

    // Renderizar listas iniciais
    renderizarListaCampeonatos();
    renderizarListaJogadores();
});
