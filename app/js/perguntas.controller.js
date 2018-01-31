angular.module('trab_final')
  .constant('api', 'http://localhost:3002')
  .controller('PerguntadosController', ['$scope', '$http', '$interval', 'api', function($scope,$http,$interval, api){

    $scope.inicializar = function(){
      $scope.showCadastro = true;
      $scope.usuario = {
        nick: "",
        resultado: 0,
        ativo: false
      };
      $scope.pergunta = {
        enunciado: "",
        area: null,
        alternativas: "",
        resposta: null
      };
      $scope.jogadores = [];
      $scope.area = [];
      $scope.showBotaoJogar = true;
    };

//funcao que cadastra um usuario com o seu nick e envia o mesmo para o servidor
    $scope.enviarJogador = function(){
      $http.post(api + '/jogador', $scope.usuario).then(
        function(response){
          console.log("deu certo");
            Materialize.toast("Usuário Cadastrado :)",2000);
        }, function(response){
          console.log("deu ruim");
            Materialize.toast("Houve algum problema, tente novamente",2000);
        }
      );
      $scope.showCadastro = false;
    };

//função que busca uma determinada pergunta para que o usuario possa responder
//essa pergunta é gerada randomicamente
    $scope.buscarPergunta = function(){
        var gerar_area_valida = false;
        var r;

        while(!gerar_area_valida){
          r = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
          if ($scope.area.length >= 5) {
            break;
          }
          if($scope.area.length == 0 || $scope.area.indexOf(r) < 0){
            gerar_area_valida = true;
          }
        };

        if($scope.area.length >= 5){
          $scope.usuario.ativo = true;
        }else{
          $scope.area.push(r);
        }

        $http.get(api + '/pergunta/'+r).then(
          function(response){
            $scope.pergunta = response.data;
            console.log($scope.pergunta);
            Materialize.toast("Deu Certo :)",2000);
          },  function(response){
              Materialize.toast(response.status,2000);
          }
        );
        $scope.botaoJogar();


    };

//função que habilita e desabilita o botao jogar que aparece na tela de jogo
    $scope.botaoJogar = function(){
      $scope.showBotaoJogar = false;
    };

//função que verifica se o usuario acertou ou nao a pergunta de acordo com a
//alternativa que foi escolhida
    $scope.resultado = function(alternativa){
      if(alternativa == $scope.pergunta.resposta){
        $scope.usuario.resultado += 1;
        Materialize.toast("voce acertou", 1000);
        $scope.buscarPergunta();
      }else {
        Materialize.toast("voce errou", 1000);
        $scope.buscarPergunta();

      }
    };

//funcao que pega todas as respostas certas do usuario e envia o resultado final
//e compara com os jogadores que estão la se o usuario venceu ou não
    $scope.enviarResultado = function(){
      $http.get(api + '/resultado/' + $scope.usuario.nick + '/' + $scope.usuario.resultado).then(
        function(response){
          Materialize.toast(response.data, 1000);
          $interval(function(){
            console.log("a funcao foi disparada");
            $scope.procurarVencedor();
          }, 1000);

        },
        function(response){
          Materialize.toast("Erro "+ response.status, 1000);
        }
      );
    };

//funcao para percorrer todos os jogadores que estão cadastrados, e ver
//quem está sendo o vencedor por enquanto
    $scope.procurarVencedor = function(){
      $http.get(api+'/jogador').then(
        function(response){
            $scope.jogadores = response.data;
        },
        function(response){
          Materialize.toast("algo deu errado", 1000);
        }
      );
    };


  }]);
