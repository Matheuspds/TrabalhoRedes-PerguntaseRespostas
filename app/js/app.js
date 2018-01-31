var app = angular.module('trab_final', ['ui.materialize', 'ui.router']);
app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('perguntados',{
    url: '/',
    views: {
      'content' : {
          templateUrl: 'views/telainicial.html',
          controller: 'PerguntadosController'
      }
    }
  });
  $urlRouterProvider.otherwise('/');
});


  app.controller('Control', ['$scope', function($scope ){
    $scope.nome = '';
    $scope.hue = [1,2,3,0,7,8,9];

/*
    $scope.perguntas = [
      {
        enunciado: "Quem descobriu o brasil?",
        area: "Historia",
        alternativas: [
          "a)Valdemar",
          "b)HUE",
          "c)huehue"
        ],
        resposta: 0
      },
      {
        enunciado: "Quem é o novo treinador da selecao?",
        area: "Esporte",
        alternativas: [
          "a)Givanildo",
          "b)Cuca",
          "c)Tite"
        ],
        resposta: 2
      },
      {
        enunciado: "Em qual estado fica a cidade de Quixada?",
        area: "Geografia",
        alternativas: [
          "a)Ceara",
          "b)Goias",
          "c)Pernambuco"
        ],
        resposta: 0
      }
    ];
*/
    $scope.gerarPergunta=function(){
      return Math.floor(Math.random() * (2 - 0 + 1)) + 0;
    };

    $scope.comecarJogar=function(){
      var index = $scope.gerarPergunta();
      $scope.pSelecionada = $scope.perguntas[index];
      $scope.show = true;
    };

    $scope.enviarResposta=function(indice){
      if(indice == $scope.pSelecionada.resposta){
        $scope.mensagem = "Você acertou!";
      }
      else{
        $scope.mensagem = "Você errou!";
      }
    };
  }] );
