/* 
Variável - Pedacinho de memória
Função - Executa quando chamada
*/

let historicoChat = [
    {
        role: "system",
        content:
            "Você é uma IA especialista em academia, exercícios físicos, fitness, saúde e nutrição."
    }
]

let botaoPesquisa = document.querySelector(".botaoGerarTreino");

let chaveApi =
    process.env.GROQ_API_KEY

let chaveApiExercicio =
    process.env.EXERCICIO_API_KEY

let endereco =
    "https://api.groq.com/openai/v1/chat/completions"


/* -----------------------------
FUNÇÃO PRINCIPAL
----------------------------- */




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










