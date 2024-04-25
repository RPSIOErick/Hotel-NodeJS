$(document).ready(function() {
    // Função para enviar a pergunta e exibir a resposta no chat
    $("#popupAna-enviarMensagem").submit(function(event) {
        // Prevenir o comportamento padrão do formulário
        event.preventDefault();

        // Obter a pergunta selecionada no campo select
        const pergunta = $("#anaQuestions").val(); // Obter o valor do select

        // Enviar a pergunta ao servidor via AJAX
        $.ajax({
            type: "POST",
            url: "/Ana/Resposta",
            data: { pergunta }, // Enviar a pergunta

            // Função para processar a resposta do servidor
            success: function(data) {
                // Adicionar a pergunta e a resposta ao chat
                $("#popupAna-body").append(`
                    <div class="popupAna-mensagemCol-Usuario">
                        <p class="popupAna-mensagem-usuario">${pergunta}</p>
                    </div>
                `);
                $("#popupAna-body").append(`
                    <div class="popupAna-mensagemCol-Ana">
                        <p class="popupAna-mensagem-ana">${data.resposta}</p>
                    </div>
                `);
            }
        });
    });
});

