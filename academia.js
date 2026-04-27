/* 
Variável - Pedacinho de memória
Função - Executa quando chamada
*/

let botao = document.querySelector(".botaoGerar")

let chaveApi =
    process.env.GROQ_API_KEY

let chaveApiExercicio =
    process.env.EXERCICIO_API_KEY


let endereco =
    "https://api.groq.com/openai/v1/chat/completions"



/* -----------------------------
FUNÇÃO: Detectar tipo de pesquisa
----------------------------- */

function detectarTipoPesquisa(texto) {

    texto = texto.toLowerCase()

    /* RECEITA */

    if (
        texto.includes("receita") ||
        texto.includes("comida") ||
        texto.includes("bolo") ||
        texto.includes("frango") ||
        texto.includes("panqueca") ||
        texto.includes("omelete") ||
        texto.includes("lanche")
    ) {
        return "receita"
    }



    /* EXERCÍCIOS */

    let listaExercicios = [

        "agachamento",
        "prancha",
        "flexao",
        "abdominal",
        "supino",
        "barra",
        "remada",
        "leg press",
        "rosca",
        "triceps",
        "ombro",
        "panturrilha",
        "gluteo",
        "costas",
        "peito",
        "perna",

        "levantamento terra",
        "stiff",
        "afundo",
        "passada",
        "agachamento bulgaro",
        "agachamento sumo",
        "cadeira extensora",
        "mesa flexora",
        "hip thrust",
        "glute bridge",

        "puxada frontal",
        "puxada alta",
        "pullover",
        "face pull",

        "desenvolvimento",
        "elevacao lateral",
        "elevacao frontal",
        "elevacao posterior",
        "arnold press",
        "encolhimento",

        "rosca direta",
        "rosca alternada",
        "rosca martelo",
        "rosca concentrada",
        "triceps testa",
        "triceps corda",
        "triceps banco",
        "triceps frances",

        "abdominal infra",
        "abdominal bicicleta",
        "russian twist",
        "mountain climber",
        "burpee",
        "jumping jack",

        "corrida",
        "pular corda",
        "bicicleta",
        "escada",
        "step up"

    ]

    for (let exercicio of listaExercicios) {

        if (texto.includes(exercicio)) {

            return "exercicio"

        }

    }

    return "geral"

}



/* -----------------------------
FUNÇÃO: Mostrar imagem da receita
----------------------------- */

async function mostrarImagemReceita(nome) {

    let iframe =
        document.querySelector(".resultadoCodigo")

    try {

        let url =
            "https://www.themealdb.com/api/json/v1/1/search.php?s=" + nome

        let resposta =
            await fetch(url)

        let dados =
            await resposta.json()

        if (dados.meals) {

            let imagem =
                dados.meals[0].strMealThumb

            iframe.srcdoc = `
            <html>
            <body style="
                font-family:Inter,sans-serif;
                text-align:center;
                padding:20px;
                background:#0f0f12;
                color:white;
            ">

            <h2>Imagem da Receita</h2>

            <img src="${imagem}"
            style="
                width:80%;
                border-radius:12px;
            ">

            </body>
            </html>
            `

        }

        else {

            iframe.srcdoc =
                "<p>Imagem não encontrada.</p>"

        }

    }

    catch (erro) {

        iframe.srcdoc =
            "<p>Erro ao buscar imagem.</p>"

    }

}



/* -----------------------------
FUNÇÃO: Mostrar exercício
----------------------------- */

async function mostrarMidiaExercicio(nome) {

    let iframe =
        document.querySelector(".resultadoCodigo")

    nome = nome.toLowerCase()



    /* -----------------------------
    BANCO DE EXERCÍCIOS LOCAL
    ----------------------------- */

    let exercicios = {

        "flexao": {
            titulo: "Flexão",
            musculo: "Peito, tríceps e ombros",
            imagem:
                "https://fitnessvolt.com/wp-content/uploads/2023/01/man-doing-pushups.jpg"
        },

        "agachamento": {
            titulo: "Agachamento",
            musculo: "Pernas e glúteos",
            imagem:
                "https://tse1.mm.bing.net/th/id/OIP.Gq9bhWzxlkNn0Ss6SPQ0IQHaEU?rs=1&pid=ImgDetMain&o=7&rm=3"

        },

        "prancha": {
            titulo: "Prancha",
            musculo: "abdomen",
            imagem:
                "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=800&q=60"

        },

        "abdominal": {
            titulo: "Abdominal",
            musculo: "Abdômen",
            imagem:
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=60"
        },

        "supino": {
            titulo: "Supino",
            musculo: "Peito e tríceps",
            imagem:
                "https://www.hipertrofia.org/blog/wp-content/uploads/2023/05/16536599068607.jpg"
        },

        "barra": {
            titulo: "Barra fixa",
            musculo: "Costas e bíceps",
            imagem:
                "https://www.ironworksprime.com.br/wp-content/uploads/2018/03/Barra-fixa-Post-Blog-Ironworks.jpg"
        },

        "remada": {
            titulo: "Remada",
            musculo: "Costas",
            imagem:
                "https://www.mundoboaforma.com.br/wp-content/uploads/2023/03/Remada-sentado-triangulo.jpg"
        },

        "leg press": {
            titulo: "Leg Press",
            musculo: "Pernas",
            imagem:
                "https://muscleandstrong.com/wp-content/uploads/2024/05/Man-doing-leg-press-exercise-in-gym.jpg"
        },

        "rosca": {
            titulo: "Rosca bíceps",
            musculo: "Bíceps",
            imagem:
                "https://img.freepik.com/premium-photo/asian-woman-standing-lifting-dumbbell-exercise-increase-arm-muscles-gym-she-wearing-black-sports-bra-blue-pantsfitnesssport-healthy-style-concept_532405-4138.jpg"
        },

        "levantamento terra": {
            titulo: "Levantamento Terra",
            musculo: "Costas e pernas",
            imagem: "https://boaforma.abril.com.br/wp-content/uploads/sites/2/2022/08/variacoes-de-deadlift.jpg?quality=90&strip=info"
        },

        "stiff": {
            titulo: "Stiff",
            musculo: "Posterior de coxa e glúteos",
            imagem: "https://s.zst.com.br/cms-assets/2022/05/stiff-como-fazer.webp"
        },

        "afundo": {
            titulo: "Afundo",
            musculo: "Pernas e glúteos",
            imagem: "https://vitat.com.br/wp-content/uploads/2019/07/afundo.jpg"
        },

        "passada": {
            titulo: "Passada",
            musculo: "Pernas e glúteos",
            imagem: "https://w7academia.com.br/wp-content/uploads/2024/09/passada-a-importancia-do-exercicio-e-alternativas-para-um-treino-completo-1024x683.png"
        },

        "agachamento bulgaro": {
            titulo: "Agachamento Búlgaro",
            musculo: "Pernas e glúteos",
            imagem: "https://tse4.mm.bing.net/th/id/OIP.iG1xEopYy_4c32urG98NlwHaJf?rs=1&pid=ImgDetMain&o=7&rm=3"
        },

        "agachamento sumo": {
            titulo: "Agachamento Sumô",
            musculo: "Pernas e glúteos",
            imagem: "https://th.bing.com/th/id/R.109082d36acf0eb064eb4a664e4bc23f?rik=POsE2CGRV1vx3Q&pid=ImgRaw&r=0"
        },

        "cadeira extensora": {
            titulo: "Cadeira Extensora",
            musculo: "Quadríceps",
            imagem: "https://blog.ciaathletica.com.br/wp-content/uploads/2024/11/Cia-Athletica-cadeira-extensora-mulher-sentada-equipamento-academia-exercicio-pernas-Autores-GS2-Marketing-Divulgacao.jpg"
        },

        "mesa flexora": {
            titulo: "Mesa Flexora",
            musculo: "Posterior de coxa",
            imagem: "https://i.pinimg.com/originals/b8/9a/33/b89a33162068f4e0cadec33cc6daa911.jpg"
        },

        "hip thrust": {
            titulo: "Hip Thrust",
            musculo: "Glúteos",
            imagem: "https://tse4.mm.bing.net/th/id/OIP.WUuEFDQQZVTn-KVRrzR8hgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
        },

        "glute bridge": {
            titulo: "Glute Bridge",
            musculo: "Glúteos",
            imagem: "https://tse1.mm.bing.net/th/id/OIP.mo9zc70iV6uKMpOwGBkALQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
        },

        "puxada frontal": {
            titulo: "Puxada Frontal",
            musculo: "Costas",
            imagem: "https://boaforma.abril.com.br/wp-content/uploads/sites/2/2025/10/como-fazer-puxada-frontal.jpg?quality=95&strip=info&w=1200&h=720&crop=1"
        },

        "puxada alta": {
            titulo: "Puxada Alta",
            musculo: "Costas",
            imagem: "https://blog.lionfitness.com.br/wp-content/uploads/2018/11/Puxada-alta-como-conquistar-costas-definidas-610x458.jpg"
        },

        "pullover": {
            titulo: "Pullover",
            musculo: "Peito e costas",
            imagem: "https://www.hipertrofia.org/blog/wp-content/uploads/2018/11/pull-down-tronco-curvado.jpg"
        },

        "face pull": {
            titulo: "Face Pull",
            musculo: "Ombros e costas",
            imagem: "https://cdn.mos.cms.futurecdn.net/iGfXMbXUHhLeB3ruX7U95E.jpg"
        },

        "desenvolvimento": {
            titulo: "Desenvolvimento",
            musculo: "Ombros",
            imagem: "https://th.bing.com/th/id/R.969f98f311805509671ef8cc4fa1125c?rik=OWvZrzqq4mUGhQ&pid=ImgRaw&r=0"
        },

        "elevacao lateral": {
            titulo: "Elevação Lateral",
            musculo: "Ombros",
            imagem: "https://image.tuasaude.com/media/article/ne/lc/elevacao-lateral_63271.jpg"
        },

        "elevacao frontal": {
            titulo: "Elevação Frontal",
            musculo: "Ombros",
            imagem: "https://totalpass.com/wp-content/uploads/2025/02/elevacao-frontal.jpg"
        },

        "elevacao posterior": {
            titulo: "Elevação Posterior",
            musculo: "Ombros",
            imagem: "https://tse1.mm.bing.net/th/id/OIP.3eZeaww2Rgy3S49msNPCAQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
        },

        "arnold press": {
            titulo: "Arnold Press",
            musculo: "Ombros",
            imagem: "https://cdn.muscleandstrength.com/sites/default/files/seated-arnold-press-thumb.jpg"
        },

        "encolhimento": {
            titulo: "Encolhimento",
            musculo: "Trapézio",
            imagem: "https://i.ytimg.com/vi/oYHnVHe2dFM/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgZShlMA8=&rs=AOn4CLApRl0vX5XT21kLlKGz7WnlqnUh2w"
        },

        "rosca direta": {
            titulo: "Rosca Direta",
            musculo: "Bíceps",
            imagem: "https://totalpass.com/wp-content/uploads/2024/04/rosca-direta.jpg"
        },

        "rosca alternada": {
            titulo: "Rosca Alternada",
            musculo: "Bíceps",
            imagem: "https://totalpass.com/wp-content/uploads/2025/09/rosca-alternada.jpg"
        },

        "rosca martelo": {
            titulo: "Rosca Martelo",
            musculo: "Bíceps",
            imagem: "https://tse2.mm.bing.net/th/id/OIP.E2MPVQCWHLUTtfgUYS_JJAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
        },

        "rosca concentrada": {
            titulo: "Rosca Concentrada",
            musculo: "Bíceps",
            imagem: "https://www.mundoboaforma.com.br/wp-content/uploads/2023/05/Rosca-concentrada.jpg"
        },

        "triceps testa": {
            titulo: "Tríceps Testa",
            musculo: "Tríceps",
            imagem: "https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2024/02/12/954015187-istock-515434722.jpg"
        },

        "triceps corda": {
            titulo: "Tríceps Corda",
            musculo: "Tríceps",
            imagem: "https://tse2.mm.bing.net/th/id/OIP.9APnGSYsnehTNCy7MESmkwHaFj?w=960&h=720&rs=1&pid=ImgDetMain&o=7&rm=3"
        },

        "triceps banco": {
            titulo: "Tríceps Banco",
            musculo: "Tríceps",
            imagem: "https://totalpass.com/wp-content/uploads/2024/11/triceps-na-academia.jpg"
        },

        "triceps frances": {
            titulo: "Tríceps Francês",
            musculo: "Tríceps",
            imagem: "https://tse2.mm.bing.net/th/id/OIP.JDg_ni90sPmXD0ZIoonQLQHaFE?rs=1&pid=ImgDetMain&o=7&rm=3"
        },

        "abdominal infra": {
            titulo: "Abdominal Infra",
            musculo: "Abdômen",
            imagem: "https://i.ytimg.com/vi/bi9ZLNCjJEc/maxresdefault.jpg"
        },

        "abdominal bicicleta": {
            titulo: "Abdominal Bicicleta",
            musculo: "Abdômen",
            imagem: "https://vitat.com.br/wp-content/uploads/2020/07/depositphotos_154034516_xl-2015.jpg"
        },

        "russian twist": {
            titulo: "Russian Twist",
            musculo: "Abdômen",
            imagem: "https://tse3.mm.bing.net/th/id/OIP.RdaTatuSJhUg-na76GHMSwHaE7?rs=1&pid=ImgDetMain&o=7&rm=3"
        },

        "mountain climber": {
            titulo: "Mountain Climber",
            musculo: "Corpo inteiro",
            imagem: "https://cdn.mos.cms.futurecdn.net/YayvpCDRPZH3b6cALgrhkk-1200-80.jpg"
        },

        "burpee": {
            titulo: "Burpee",
            musculo: "Corpo inteiro",
            imagem: "https://tse1.mm.bing.net/th/id/OIP.6UaOV1e8IJZgUTGwIoW7tQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
        },

        "jumping jack": {
            titulo: "Jumping Jack",
            musculo: "Corpo inteiro",
            imagem: "https://tse4.mm.bing.net/th/id/OIP.PtodKdD3Dljh7UBzT9-vMAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
        },

        "corrida": {
            titulo: "Corrida",
            musculo: "Cardio",
            imagem: "https://tse2.mm.bing.net/th/id/OIP.0WR0d3y9bObbpDcYYvLhQgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
        },

        "pular corda": {
            titulo: "Pular Corda",
            musculo: "Cardio",
            imagem: "https://tse4.mm.bing.net/th/id/OIP.IkUrRQbiJAJ0uqufnVwkygHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
        },

        "bicicleta": {
            titulo: "Bicicleta",
            musculo: "Pernas",
            imagem: "https://s.zst.com.br/cms-assets/2022/09/beneficios-bicicleta-ergonometrica-1.webp"
        },

        "escada": {
            titulo: "Escada",
            musculo: "Pernas",
            imagem: "https://boaforma.abril.com.br/wp-content/uploads/sites/2/2023/03/GettyImages-1313698945.jpg?quality=90&strip=info&w=1280&h=720&crop=1"
        },

        "step up": {
            titulo: "Step Up",
            musculo: "Pernas e glúteos",
            imagem: "https://cdn.shopify.com/s/files/1/1497/9682/articles/1_6ecf1b5f-3555-476e-8303-6b2a4a99ded3.png?v=1646657742"
        }

    }



    /* -----------------------------
    VERIFICAR SE EXISTE
    ----------------------------- */

    let exercicio = exercicios[nome]



    if (exercicio) {

        iframe.srcdoc = `
        <html>
        <body style="
            font-family:Inter,sans-serif;
            text-align:center;
            padding:20px;
            background:#0f0f12;
            color:white;
        ">

        <h2>${exercicio.titulo}</h2>

        <p>Músculo trabalhado: ${exercicio.musculo}</p>

        <img src="${exercicio.imagem}"
        style="
            width:90%;
            border-radius:12px;
            margin-top:10px;
        ">

        </body>
        </html>
        `

    }

    else {

        /* fallback */

        iframe.srcdoc = `
        <html>
        <body style="
            font-family:Inter,sans-serif;
            text-align:center;
            padding:20px;
            background:#0f0f12;
            color:white;
        ">

        <h2>Exercício não encontrado</h2>

        <p>Mostrando exercício padrão.</p>

        <img src="
        https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b
        "
        style="
            width:90%;
            border-radius:12px;
        ">

        </body>
        </html>
        `

    }

}



/* -----------------------------
FUNÇÃO PRINCIPAL
----------------------------- */

async function gerarCodigo() {

    let textoUsuario =
        document.querySelector(".caixaTexto").value

    let blocoCodigo =
        document.querySelector(".blocoCodigo")

    let resultadoCodigo =
        document.querySelector(".resultadoCodigo")



    let resposta = await fetch(endereco, {

        method: "POST",

        headers: {

            "Content-Type": "application/json",

            "Authorization":
                "Bearer " + chaveApi

        },

        body: JSON.stringify({

            model:
                "llama-3.3-70b-versatile",

            messages: [

                {
                    role: "system",
                    content:
                        "Você é uma IA especialista em academia, exercícios físicos, fitness, saúde e nutrição."
                },

                {
                    role: "user",
                    content:
                        textoUsuario
                }

            ]

        })

    })



    let dados =
        await resposta.json()

    let resultado =
        dados.choices[0].message.content



    blocoCodigo.textContent =
        resultado



    resultadoCodigo.srcdoc = `
    <html>
    <body style="
        font-family:Inter,sans-serif;
        padding:20px;
    ">
    ${resultado}
    </body>
    </html>
    `



    let tipo =
        detectarTipoPesquisa(textoUsuario)



    if (tipo === "receita") {

        mostrarImagemReceita(textoUsuario)

    }

    else if (tipo === "exercicio") {

        mostrarMidiaExercicio(textoUsuario)

    }

}



botao.addEventListener(
    "click",
    gerarCodigo
)


async function gerarTreino() {

    let blocoCodigo =
        document.querySelector(".ResultadoTreino .blocoCodigo")

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



    let resposta = await fetch(endereco, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + chaveApi
        },

        body: JSON.stringify({

            model:
                "llama-3.3-70b-versatile",

            messages: [

                {
                    role: "system",
                    content:
                        "Você é uma IA especialista em academia, exercícios físicos, fitness, saúde e nutrição."
                },

                {
                    role: "user",
                    content:
                        ResultadoTreino
                }

            ]

        })

    })



    let dados =
        await resposta.json()



    let resultado =
        dados.choices?.[0]?.message?.content
        || "Erro ao gerar treino."



    blocoCodigo.textContent =
        resultado



    let tipo =
        detectarTipoPesquisa(ResultadoTreino)



    if (tipo === "receita") {

        mostrarImagemReceita(ResultadoTreino)

    }

    else if (tipo === "exercicio") {

        mostrarMidiaExercicio(ResultadoTreino)

    }

}

