let jsonData;
// Acessa o arquivo JSON com os dados das instituições bancárias
jQuery(document).ready(function () {
    jQuery.ajax({
        url: "./dados.json",
        dataType: "json",
        success: function (data) {
            jsonData = data;
            populateAccountDropdowns(jsonData);
        },
        error: function () {
            console.error("Erro ao carregar o arquivo JSON.");
        },
    });
});

// Preenche os selects com as opções de conta
function populateAccountDropdowns(data) {
    let select, option, account1, account2, account3;

    account1 = document.querySelector("#account1");
    account2 = document.querySelector("#account2");
    account3 = document.querySelector("#account3");

    data.forEach((element, index) => {
        option = `<option value="${element.banco}" data-image="${element.imagem}">${element.banco}</option>`;
        if (account1) {
            account1.insertAdjacentHTML("beforeend", option);
        }
        if (account2) {
            account2.insertAdjacentHTML("beforeend", option);
        }
        if (account3) {
            account3.insertAdjacentHTML("beforeend", option);
        }
    });

    callSelectize();
    tableVisibility();
}

// Icones
let iconTrue =
    '<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24"><path fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7L10 17l-5-5"/></svg>';
let iconFalse =
    '<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24"><path fill="none" stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18M6 6l12 12"/></svg>';
//Lida com os eventos do Selectize
var eventHandler = function (name, index) {
    return function () {
        let cellsName = `.data-row .c-${index}`;
        let cells = document.querySelectorAll(cellsName);
        // console.log(name, arguments);
        jsonData.forEach((element) => {
            if (element.banco == arguments[0]) {
                // Linha 1 da tabela (imagem)
                cells[0].innerHTML = `
                    <img src="${element.imagem}" alt="${element.banco}">
                    <h3>${element.banco}</h3>
                    <div id="close-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg>
                    </div>`;
                cells[0].classList.add("relative");

                // Linha 2 da tabela (tipo de conta)
                cells[1].innerHTML = `<p>${element.tipo_de_conta}</p>`;
                // Linha 3 da tabela (Classificação da conta)
                cells[2].innerHTML = `<p>${element.classificacao_da_conta}</p>`;
                // Linha 4 (Tipo de cartão)
                cells[3].innerHTML = `<p>${element.tipo_de_cartao}</p>`;
                // Linha 5 (Taxa de manutenção)
                cells[4].innerHTML = `<p>${element.taxa_de_manutencao}</p>`;
                // Linha 6 (Saque)
                cells[5].innerHTML = `<p>${element.saque}</p>`;
                // Linha 7 (TED/DOC)
                cells[6].innerHTML = `<p>${element.TED_DOC}</p>`;
                // Linha 8 (Serviços)
                let servicosHtml = `
                    <div class="icon-div">
                        ${
                            element.servicos.consorcios == true
                                ? iconTrue
                                : iconFalse
                        }
                        <p>Consórcios</p>
                    </div>
                    <div class="icon-div">
                        ${
                            element.servicos.cambio == true
                                ? iconTrue
                                : iconFalse
                        }
                        <p>Câmbio</p>
                    </div>
                    <div class="icon-div">
                        ${
                            element.servicos.investimento == true
                                ? iconTrue
                                : iconFalse
                        }
                        <p>Investimento</p>
                    </div>
                    <div class="icon-div">
                        ${
                            element.servicos.linha_de_credito == true
                                ? iconTrue
                                : iconFalse
                        }
                        <p>Linha de Crédito</p>
                    </div>
                    <div class="icon-div">
                        ${element.servicos.pix == true ? iconTrue : iconFalse}
                        <p>Pix</p>
                    </div>
                    <div class="icon-div">
                        ${
                            element.servicos.seguros == true
                                ? iconTrue
                                : iconFalse
                        }
                        <p>Seguros</p>
                    </div>
                `;
                cells[7].innerHTML = servicosHtml;

                // Linha 9 (Produtos de Investimento)
                let produtosHtml = `
                    <div class="icon-div">
                        ${
                            element.produtos_de_investimento.acoes == true
                                ? iconTrue
                                : iconFalse
                        }
                        <p>Ações</p>
                    </div>
                    <div class="icon-div">
                        ${
                            element.produtos_de_investimento.cdb == true
                                ? iconTrue
                                : iconFalse
                        }
                        <p>CDB</p>
                    </div>
                    <div class="icon-div">
                        ${
                            element.produtos_de_investimento
                                .fundos_de_investimento == true
                                ? iconTrue
                                : iconFalse
                        }
                        <p>Fundos de investimento</p>
                    </div>
                    <div class="icon-div">
                        ${
                            element.produtos_de_investimento
                                .fundos_imobiliarios == true
                                ? iconTrue
                                : iconFalse
                        }
                        <p>Fundos Imobiliários</p>
                    </div>
                    <div class="icon-div">
                        ${
                            element.produtos_de_investimento.futuros == true
                                ? iconTrue
                                : iconFalse
                        }
                        <p>Futuros</p>
                    </div>
                    <div class="icon-div">
                        ${
                            element.produtos_de_investimento.lca == true
                                ? iconTrue
                                : iconFalse
                        }
                        <p>LCA</p>
                    </div>
                    <div class="icon-div">
                        ${
                            element.produtos_de_investimento.lci == true
                                ? iconTrue
                                : iconFalse
                        }
                        <p>LCI</p>
                    </div>
                    <div class="icon-div">
                        ${
                            element.produtos_de_investimento.poupanca == true
                                ? iconTrue
                                : iconFalse
                        }
                        <p>Poupança</p>
                    </div>
                    <div class="icon-div">
                        ${
                            element.produtos_de_investimento.tesouro_direto ==
                            true
                                ? iconTrue
                                : iconFalse
                        }
                        <p>Tesouro direto</p>
                    </div>
                `;
                cells[8].innerHTML = produtosHtml;

                // Linha 10 (Outras Características)
                let outrosHtml = `
                    <div class="icon-div">
                        ${
                            element.outras_caracteristicas.conta_conjunta ==
                            true
                                ? iconTrue
                                : iconFalse
                        }
                        <p>Aceita conta conjunta</p>
                    </div>
                    <div class="icon-div">
                        ${
                            element.outras_caracteristicas.permite_menor == true
                                ? iconTrue
                                : iconFalse
                        }
                        <p>Permite menor</p>
                    </div>
                    <div class="icon-div">
                        ${
                            element.outras_caracteristicas
                                .rendimento_automatico == true
                                ? iconTrue
                                : iconFalse
                        }
                        <p>Rendimento automático</p>
                    </div>
                    <div class="icon-div">
                        ${
                            element.outras_caracteristicas
                                .vinculado_ao_banco_24h == true
                                ? iconTrue
                                : iconFalse
                        }
                        <p>Vinculado ao banco 24h</p>
                    </div>
                `;
                cells[9].innerHTML = outrosHtml;

                // Linha 11 (Prós)
                let proHtml;
                element.pros.forEach((pro) => {
                    proHtml = `
                        <div class="icon-div">
                            ${iconTrue}
                            <p>${pro}</p>
                        </div>
                    `;

                    cells[10].insertAdjacentHTML("beforeend", proHtml);
                });
                // Linha 12 (Contras)
                let contrasHtml;
                element.contras.forEach((contra) => {
                    contrasHtml = `
                        <div class="icon-div">
                            ${iconFalse}
                            <p>${contra}</p>
                        </div>
                    `;

                    cells[11].insertAdjacentHTML("beforeend", contrasHtml);
                });

                // Linha 13 (Canais de atendimento)

                let canaisHtml = `
                    <div class="icon-div">
                        ${
                            element.canais_de_atendimento.agencia == true
                                ? iconTrue
                                : iconFalse
                        }
                        <p>Agência</p>
                    </div>
                    <div class="icon-div">
                        ${
                            element.canais_de_atendimento.app == true
                                ? iconTrue
                                : iconFalse
                        }
                        <p>Aplicativo</p>
                    </div>
                    <div class="icon-div">
                        ${
                            element.canais_de_atendimento.chat == true
                                ? iconTrue
                                : iconFalse
                        }
                        <p>Chat</p>
                    </div>
                    <div class="icon-div">
                        ${
                            element.canais_de_atendimento.email == true
                                ? iconTrue
                                : iconFalse
                        }
                        <p>E-mail</p>
                    </div>
                    <div class="icon-div">
                        ${
                            element.canais_de_atendimento.tel == true
                                ? iconTrue
                                : iconFalse
                        }
                        <p>Telefone</p>
                    </div>
                `;
                cells[12].innerHTML = canaisHtml;
            }
        });

        // Função que ativa o evento de limpar a coluna
        clearColumn();

        tableVisibility();
    };
};

// Ativa o selectize (lib responsável por permitir inserção de imagem na option, estilizar e permitir busca por texto nas options)
function callSelectize() {
    jQuery(function () {
        jQuery("#account1").selectize({
            onChange: eventHandler("onChange", 1),
            render: {
                option: function (data, escape) {
                    return (
                        '<div class="option-div"><div><img src="' +
                        data.image +
                        '" class="option-image" /></div>' +
                        escape(data.text) +
                        "</div>"
                    );
                },
            },
        });
        jQuery("#account2").selectize({
            onChange: eventHandler("onChange", 2),
            render: {
                option: function (data, escape) {
                    return (
                        '<div class="option-div"><div><img src="' +
                        data.image +
                        '" class="option-image" /></div>' +
                        escape(data.text) +
                        "</div>"
                    );
                },
            },
        });
        jQuery("#account3").selectize({
            onChange: eventHandler("onChange", 3),
            render: {
                option: function (data, escape) {
                    return (
                        '<div class="option-div"><div><img src="' +
                        data.image +
                        '" class="option-image" /></div>' +
                        escape(data.text) +
                        "</div>"
                    );
                },
            },
        });
    });
}

// Função que limpa as colunas
function clearColumn() {
    let closeIcons = document.querySelectorAll("#close-icon");

    closeIcons.forEach((icon, index) => {
        icon.addEventListener("click", () => {
            let cellsName = `.data-row .c-${index + 1}`;
            let cells = document.querySelectorAll(cellsName);

            // define o nome da coluna que ficará no placeholder
            let accountOrder;
            if (index == 0) {
                accountOrder = "primeira";
            } else if (index == 1) {
                accountOrder = "segunda";
            } else if (index == 2) {
                accountOrder = "terceira";
            }
            let selectHtml = `
                <div class="account-select">
                    <select id="account${index + 1}" class="account-dropdown">
                        <option value="" selected disabled hidden>Selecione aqui a ${accountOrder} conta</option>
                    </select>
                    <div id="close-icon"></div>
                </div>
            `;
            // Ao limpar a coluna, deixa o select no primeiro elemento
            cells[0].innerHTML = selectHtml;
            // Limpa o HTML de todo o resto da coluna
            for (let i = 1; i < cells.length; i++) {
                cells[i].innerHTML = "";
            }

            // Reconfigura os selects e seus eventos
            populateAccountDropdowns(jsonData);
            clearColumn();
        });
    });
}

// Alterna a visibilidade da tabela
function tableVisibility() {
    let selects = document.querySelectorAll(".account-select");

    if (selects.length == 3) {
        let rows = document.querySelectorAll(".data-row");

        for (let i = 1; i < rows.length; i++) {
            rows[i].classList.add("unblur-row");
        }
        setTimeout(() => {
            for (let i = 1; i < rows.length; i++) {
                rows[i].classList.remove("unblur-row");
                rows[i].classList.remove("blur-row");
            }
        }, 300);
    } else {
        let rows = document.querySelectorAll(".data-row");

        for (let i = 1; i < rows.length; i++) {
            if (rows[i].classList.contains("blur-row") == false) {
                rows[i].classList.add("blur-row");
            }
        }
    }

    if (window.innerWidth < 500 && selects.length == 1) {
        let rows = document.querySelectorAll(".data-row");
        rows[0].classList.add("row-divided");
    } else if (window.innerWidth < 500 && selects.length != 1) {
        let rows = document.querySelectorAll(".data-row");
        if (rows[0].classList.contains("row-divided")) {
            rows[0].classList.remove("row-divided");
        }
    }
}
