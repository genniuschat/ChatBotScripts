const styleElement = document.createElement('style');
      styleElement.innerHTML = `
    #iframeBotGennius {
      width: 26rem;
      height: 80vh;
      position: fixed;
      bottom: 5rem;
      right: 1rem;
      z-index: 1010;
      border-radius: 0.75rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      display: none;
    }
  
    @media (max-width: 450px) {
      #iframeBotGennius {
        width: 100%;
        height: 100%;
        bottom: 0;
        right: 0;
        z-index: 1040;
        border-radius: 0;
        box-shadow: none;
      }
    }
  
    #iframeButtonBotGennius {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      z-index: 1050;
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      overflow: hidden;
      transition: transform 0.1s ease-in-out; 
      transform-origin: center center; 
    }
  
    #iframeButtonBotGennius:hover {
      transform: scale(1.2) translate(0%, 0%); 
    }
  
    #chatButton {
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 1050;
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      object-fit: cover;
    }
  `;
      document.head.appendChild(styleElement);
  
      document.addEventListener('DOMContentLoaded', function () {
        const chatBotEndpoint = document.getElementById('chatbotScript').getAttribute('chatBotEndpoint');
  
        document.getElementById('iframeBotGennius').src = chatBotEndpoint;
  
        const buttonElement = document.createElement('button');
        buttonElement.setAttribute('id', 'iframeButtonBotGennius');
        buttonElement.setAttribute('style', 'position: fixed; bottom: 1rem; right: 1rem; z-index: 1050; border-radius: 50%; width: 3rem; height: 3rem;');
        buttonElement.innerHTML = '<img src="https://i.ibb.co/N3pnhTs/CHAT-FECHADO.png" id="chatButton" alt="chat-button" />';
        document.body.appendChild(buttonElement);
  
        buttonElement.addEventListener('click', toggleIframe);
  
        function toggleIframe() {
          var iframe = document.getElementById('iframeBotGennius');
          var button = document.getElementById('chatButton');
          var buttonContainer = document.getElementById('iframeButtonBotGennius');
  
          if (iframe.style.display === 'none' || iframe.style.display === '') {
            iframe.style.display = 'block';
            button.style.display = 'block';
            button.src = 'https://i.ibb.co/qkxJ9PY/CHAT-ABERTO.png';
  
            var windowWidth = window.innerWidth;
  
            if (windowWidth < 450) {
              button.src = 'https://i.ibb.co/NS4DSH8/CHAT-ABERTO-MOBILE.png';
              buttonContainer.style.top = '1rem';
  
            } else {
              buttonContainer.style.bottom = '1rem';
  
            }
          } else {
            iframe.style.display = 'none';
            button.style.display = 'block';
            buttonContainer.style.bottom = '1rem';
            buttonContainer.style.top = '';
  
            button.src = 'https://i.ibb.co/N3pnhTs/CHAT-FECHADO.png';
          }
  
  
  
  
        }
  
      });
      document.addEventListener('DOMContentLoaded', function () {
        const chatbotScript = document.getElementById('chatbotScript');
        const chatBotEndpoint = chatbotScript?.getAttribute('chatBotEndpoint');
  
  
        const chatBotEndpointBotId = chatBotEndpoint.split('/').pop();
  
        console.log("chatBotEndpointBotId", chatBotEndpointBotId)
        console.log("end", chatBotEndpoint)
        var iframe = document.getElementById('iframeBotGennius');
        iframe.onload = function () {
          // Token de ID de chat que você deseja enviar
          var chatTokenB = localStorage.getItem('threadId');
          // Envia o token para a outra janela
          iframe.contentWindow.postMessage({ type: 'chatToken', token: chatTokenB, idBot: chatBotEndpointBotId }, chatBotEndpoint);
        }
  
        // Adiciona um ouvinte para o evento de mensagem
        window.addEventListener('message', function (event) {
          // Verifica se a mensagem é do tipo 'chatToken'
          if (event.data.type === 'chatTokenResponse') {
            // Obtém o token de ID de chat da mensagem
            var chatToken = event.data.token;
            localStorage.setItem('threadId', event.data.token)
            // Faça o que quiser com o token aqui
            console.log('Token de ID de chat recebido -iframe-:', chatToken);
          } else {
            console.log('recebi nada-iframe-')
          }
  
        });
      });
