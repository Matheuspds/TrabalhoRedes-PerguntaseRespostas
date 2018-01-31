var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json());

var router = express.Router();

//Armazena os jogadores que já jogaram enquanto o servidor ainda estiver rodando
var jogadores = [];

//array com as areas de cada pergunta
var area = [
  'Redes de Computadores',
  'Transporte',
  'Rede',
  'Aplicacao',
  'Outras Camadas'
];

//array de perguntas, cada uma com suas respectivas alternativas e a resposta correta
//ainda tbm um campo area que representa o indice do array de areas que representa
//a respectiva area da pergunta
var perguntas = [
  [
    {
      enunciado: "Em quantas camadas se divide o modelo de referência OSI?",
      area: 0,
      alternativas: [
        "a)7 Camadas",
        "b)5 Camadas",
        "c)3 Camadas"
      ],
      resposta: 0
    },

    {
      enunciado: "O que é uma rede de computadores?",
      area: 0,
      alternativas: [
        "a)União de equipamentos com a única finalidade de compartilhar internet.",
        "b)Conjunto de computadores interligados entre si, compartilhando recursos.",
        "c)Conjunto de periféricos integrados."
      ],
      resposta: 1
    },

    {
      enunciado: "Dos equipamentos de rede abaixo, qual tem a função de escolher o melhor caminho para o envio da informação?",
      area: 0,
      alternativas: [
        "a)Switch",
        "b)Patch Panel",
        "c)Roteador"
      ],
      resposta: 2
    }
  ],

  [
    {
      enunciado: "Quais são os principais protocolos da camada de Transporte?",
      area: 1,
      alternativas: [
        "a)TCP e IP",
        "b)IP e HTTP",
        "c)TCP e UDP"
      ],
      resposta: 2
    },

    {
      enunciado: "A camada de transporte é na camada responsável por:",
      area: 1,
      alternativas: [
        "a)Usar dados enviados pela camada de aplicação e transformá-los em pacotes.",
        "b)Usar dados da camada rede e transformá-los em ficheiros.",
        "c)Usar dados e transformá-los em ficheiros"
      ],
      resposta: 0
    },

    {
      enunciado: "O que é a Multiplexação da camada de transporte?",
      area: 1,
      alternativas: [
        "a)Transferir dados de uma maquina para outra. ",
        "b)Transferir dados da Internet para uma maquina pessoal",
        "c)Transmitir dados de diferentes aplicações simultaneamente."
      ],
      resposta: 2
    }
  ],
  [
    {
      enunciado: "Quais são as principais funções da camada de rede?",
      area: 2,
      alternativas: [
        "a)Enquadramento e Empacotamento",
        "b)Encaminhamento e Roteamento",
        "c)Segmentação e Roteamento"
      ],
      resposta: 1
    },

    {
      enunciado: "Um datagrama IP está associado a qual camada do modelo OSI?",
      area: 2,
      alternativas: [
        "a)Rede",
        "b)Enlace",
        "c)Fisica"
      ],
      resposta: 0
    },

    {
      enunciado: "Qual camada do modelo ISO/OSI preocupa-se com roteamento e controle de congestionamento dos pacotes, sendo irrelevante em redes de difusão. Utiliza filosofia de datagrama ou de circuito virtual?",
      area: 2,
      alternativas: [
        "a)Rede",
        "b)Aplicação",
        "c)Enlace"
      ],
      resposta: 0
    }
  ],
  [
    {
      enunciado: "Qual camada do TCP/IP fornece acesso aos serviços pelos programas de aplicação que enviam mensagens?",
      area: 3,
      alternativas: [
        "a)Enlace",
        "b)Aplicação",
        "c)Transporte"
      ],
      resposta: 1
    },

    {
      enunciado: "Qual camada do modelo ISO/OSI oferece os meios de comunicação aos processos?",
      area: 3,
      alternativas: [
        "a)Aplicação",
        "b)Rede",
        "c)Transporte"
      ],
      resposta: 0
    },

    {
      enunciado: "Quais os nomes dos 4 protocolos da camada de aplicação?",
      area: 3,
      alternativas: [
        "a)HTTP, HTTPS, FTP e DNS",
        "b)HTTP, HTPS, FTP e DNS",
        "c)HTTP, HTPS, FTP e NDR"
      ],
      resposta: 0
    }
  ],
  [
    {
      enunciado: "O que é a tecnologia Broadcast?",
      area: 4,
      alternativas: [
        "a)Transmissão simultânea para todos os hosts na rede.",
        "b)Transmissão aleatória na rede.",
        "c)Modo de transferência de arquivos mais rápido."
      ],
      resposta: 0
    },

    {
      enunciado: "Qual camada do modelo ISO/OSI detecta e, opcionalmente, corrige erros ocorridos no nível físico, particionando cadeias de bits em quadros (frames)?",
      area: 4,
      alternativas: [
        "a)Transporte",
        "b)Enlace",
        "c)Aplicação"
      ],
      resposta: 1
    },

    {
      enunciado: "Qual dos cabos abaixo foi o primeiro a aparecer na estrutura de rede?",
      area: 4,
      alternativas: [
        "a)Cabo Coaxial",
        "b)Cabo de Fibra Ótica",
        "c)Cabo Par Trançado"
      ],
      resposta: 0
    }
  ]
];

//configuração do servidor com os metodos que serão utilizados para a aplicação
router.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    console.log("Got Request"); //something is happening
    next();
});

//teste para verificar conexao com servidor
router.use('/', express.static('../app'));

//Pega as perguntas aleatorias requisitando do servidor
router.get('/pergunta/:area', function(req, res){
    var r = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
    var area = parseInt(req.params.area);
    var pergunta = perguntas[area][r];
    res.json(pergunta);
});

//Envia para o servidor o resultado do respectivo jogador após o mesmo ter
//terminado de responder as 5 perguntas
router.get('/resultado/:nick/:resultado', function(req, res){
    var nick = req.params.nick;
    var resultado = parseInt(req.params.resultado);

    for(var i=0; i<jogadores.length; i++){
        if(jogadores[i].nick == nick){
            jogadores[i].resultado = resultado;
            jogadores[i].ativo = true;
        }
    }
    res.json("resultado enviado");
});

//Busca o jogador com o melhor resultado para comparar com o seu resultado
//acabou nao sendo usada
router.get('/procurarVencedor/:nick', function(req, res){
    var nick = req.params.nick
    var eu;
    var achei = false;
    var vencedor;
    for(var i=0;i<jogadores.length; i++){
        if(jogadores[i].nick == nick){
            eu = jogadores[i];
            break;
        }
    }
    for(var i=0; i<jogadores.length; i++){
        if(jogadores[i].nick != nick){
            if(jogadores[i].resultado > eu.resultado){
                achei = true;
                vencedor = jogadores[i];
                break;
            }
        }
    }

    if(achei){
        res.json(vencedor);
    }else{
        res.json(eu);
    }

});

//Envia para o servidor o jogador que entrou no jogo com o seu respectivo nick
router.get('/jogador/:nick', function(req, res){
    var nick = req.params.nick;
    for(var i=0; i < jogadores.length; i++){
        if(nick = jogadores[i].nick){
            res.json(jogadores[i]);
        }
    }
});

//requisita todos os jogadores que entraram no jogo e estão contidos no servidor
router.get('/jogador', function(req, res){
    res.json(jogadores);
});

//enviar o jogador para o array de jogadores no lado servidor
router.post('/jogador', function(req, res){
    var jogador = req.body;
    jogadores.push(jogador);
    console.log(req.body);
    res.json(req.body);
});

//porta que esta sendo usada, e o root do endereço que pode ser usado com uma mensagem de teste
router.use('/app', express.static('public'));
app.use('/',router);
app.listen(1337,'localhost');
console.log('servidor rodando');
