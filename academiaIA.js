let historicoChat = [
    {
        role: "system",
        content:
            "Você é uma IA especialista em academia, exercícios físicos, fitness, saúde e nutrição. Sua função é criar treinos personalizados com base nas informações fornecidas pelo usuário. Responda sempre em português do Brasil, de forma clara, objetiva e profissional, usando linguagem simples e fácil de entender. Considere segurança, limitações físicas e possíveis lesões, adaptando o treino ao nível do usuário (iniciante, intermediário ou avançado). Organize o texto de forma padronizada, com títulos e subtítulos, usando listas com marcadores ou números, separando as informações em linhas diferentes e evitando escrever tudo em um único parágrafo. Formate o texto para aparecer alinhado à esquerda, com espaçamento entre seções e destaque partes importantes quando necessário. Estruture sempre a resposta contendo: objetivo do treino, frequência semanal, aquecimento, treino principal, séries e repetições, tempo de descanso, dicas importantes e observações de segurança. Se o usuário informar lesão ou dor, adapte os exercícios, evite riscos e sugira alternativas seguras. Nunca forneça diagnósticos médicos e sempre priorize a segurança e o bem-estar do usuário."
    }
]

let botaoPesquisa = document.querySelector(".botaoGerarTreino");

let chaveApiExercicio = "uQx6gX0z95PDq19sydgwLr0SHHjezdo5sD62koym"

let chaveApi = CONFIG.API_KEY

let endereco = CONFIG.API_URL

async function gerarTreino() {

    let blocoCodigo =
        document.querySelector(".ResultadoTreino .blocoCodigoIa")

    let altura = document.getElementById('altura').value;
    console.log(altura);

    let peso = document.getElementById('peso').value;
    console.log(peso);

    let idade = document.getElementById('idade').value;
    console.log(idade);

    let sexo = document.getElementById('sexo').value;
    console.log(sexo);

    let meta = document.getElementById('meta').value;
    console.log(meta);

    let foco = document.getElementById('foco').value;
    console.log(foco);

    let metaTempo = document.getElementById('metaTempo').value;
    console.log(metaTempo);

    let nivel = document.getElementById('nivel').value;
    console.log(nivel);

    let disponibilidade = document.getElementById('disponibilidade').value;
    console.log(disponibilidade);

    let tempo = document.getElementById('tempo').value;
    console.log(tempo);

    let local = document.getElementById('local').value;
    console.log(local);

    let lesao = document.getElementById('lesao').value;
    console.log(lesao);

    let descreva = document.getElementById('descreva').value;
    console.log(descreva);

    let nivelDor = document.getElementById('nivelDor').value;
    console.log(nivelDor);

    let extra = document.getElementById('extra').value;
    console.log(extra);



    let ResultadoTreino =
        "A altura da pessoa é " + altura +
        ", seu peso é de " + peso +
        ", sua idade é " + idade +
        ", seu gênero é " + sexo +
        ", sua meta é " + meta +
        ", seu foco é " + foco +
        ", o tempo que ele quer obter resultados é " + metaTempo +
        ", seu nível de treino é " + nivel +
        ", sua disponibilidade na semana é " + disponibilidade +
        ", o tempo que a pessoa pode treinar é de " + tempo +
        ", o local que pessoa vai treinar é " + local +
        ", a pessoa vai informar se tem algum tipo de lesão " + lesao +
        ", se ela tiver ela irá descrever um pouco sobre a lesão " + descreva +
        ", e o nível da dor " + nivelDor +
        ", terá um campo extra para caso a pessoa tenha uma info extra " + extra


    historicoChat.push({
        role: "user",
        content: ResultadoTreino
    })

    let resposta = await fetch(endereco, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + chaveApi
        },

        body: JSON.stringify({

            model:
                "llama-3.3-70b-versatile",

            messages: historicoChat

        })

    })

    let dados =
        await resposta.json()

    let resultado =
        dados.choices?.[0]?.message?.content
        || "Erro ao gerar treino."

    let textoFormatado =
        resultado
            .replace(/\n/g, "<br>")
            .replace(/\*/g, "•")

    blocoCodigo.innerHTML += `
    <div class="mensagem-ia">
        ${textoFormatado}
    </div>
`

    /* salvar no histórico */

    historicoChat.push({
        role: "assistant",
        content: resultado
    })



    let tipo =
        detectarTipoPesquisa(ResultadoTreino)

    if (tipo === "exercicio") {

        mostrarMidiaExercicio(ResultadoTreino)

    }

}

botaoPesquisa.addEventListener(
    "click",
    gerarTreino
)


async function enviarMensagemChat() {

    let input =
        document.getElementById("inputIa")

    let mensagem =
        input.value

    if (mensagem === "") return

    let blocoCodigo =
        document.querySelector(".ResultadoTreino .blocoCodigoIa")

    /* adicionar mensagem do usuário */

    historicoChat.push({
        role: "user",
        content: mensagem
    })

    function rolarParaBaixo() {
        let blocoCodigo =
            document.querySelector(".ResultadoTreino .blocoCodigoIa");

        blocoCodigo.scrollTo({
            top: blocoCodigo.scrollHeight,
            behavior: "smooth"
        });
    }
    /* mostrar mensagem na tela */

    blocoCodigo.innerHTML +=
        `<div class="mensagem-usuario">
        ${mensagem}
     </div>`

    input.value = ""

    try {

        let resposta =
            await fetch(endereco, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + chaveApi
                },

                body: JSON.stringify({

                    model:
                        "llama-3.3-70b-versatile",

                    messages:
                        historicoChat

                })

            })

        let dados =
            await resposta.json()

        let respostaIa =
            dados.choices?.[0]?.message?.content
            || "Erro na resposta."

        /* salvar resposta */

        historicoChat.push({
            role: "assistant",
            content: respostaIa
        })

        /* mostrar resposta */

        blocoCodigo.innerHTML +=
            `<div class="mensagem-ia">
        ${respostaIa}
     </div>`
        rolarParaBaixo();

    }

    catch (erro) {

        blocoCodigo.innerHTML +=
            "<p>Erro ao conectar com a IA.</p>"

    }

}

let botaoEnter =
    document.getElementById("botaoEnter")

botaoEnter.addEventListener(
    "click",
    enviarMensagemChat
)

document
    .getElementById("inputIa")
    .addEventListener("keypress", function (e) {

        if (e.key === "Enter") {

            enviarMensagemChat()

        }

    })

document.getElementById('altura').addEventListener('input', function (e) {
    let valor = e.target.value;

    // Remove tudo que não for número
    valor = valor.replace(/\D/g, '');

    // Limita a 3 dígitos (ex: 175 -> 1,75)
    if (valor.length > 3) {
        valor = valor.substring(0, 3);
    }

    // Aplica vírgula antes dos dois últimos dígitos
    if (valor.length >= 3) {
        valor = valor.replace(/(\d)(\d{2})$/, '$1,$2');
    } else if (valor.length >= 2) {
        valor = valor.replace(/(\d)(\d{1})$/, '$1,$2');
    }

    e.target.value = valor;
});

document.getElementById("peso").addEventListener("input", function (e) {
    let valor = e.target.value;

    valor = valor.replace(/\D/g, '');

    if (valor.length > 6) {
        valor = valor.substring(0, 6);
    }
    // Converte para número com até 3 casas decimais
    if (valor.length > 3) {
        valor = valor.replace(/(\d+)(\d{3})$/, "$1,$2");
    } else if (valor.length > 0) {
        valor = valor.replace(/(\d+)/, "$1");
    }

    e.target.value = valor;
});

const idadeInput = document.getElementById('idade');

idadeInput.addEventListener('input', function () {

    //Remove tudo que não for número
    let valor = this.value.replace(/\D/g, '');

    //Converte para número e limita entre 0 e 120
    if (valor !== '') {
        let num = parseInt(valor, 10);
        if (num > 120) num = 120;
        this.value = num;
    } else {
        this.value = '';
    }
});









