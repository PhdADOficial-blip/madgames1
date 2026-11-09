function obterCookie(nome) {
    let nomeProcurado = nome + "=";
    let cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.indexOf(nomeProcurado) == 0) return c.substring(nomeProcurado.length, c.length);
    }
    return "";
}

// Função para fechar o modal na tela quando clicar no botão ou no X
function fecharModalGame() {
    const modal = document.getElementById("meuModalCookie");
    if (modal) modal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("meuModalCookie");
    if (!modal) return;

    let visitou = obterCookie("usuario_ja_visitou");
    if (visitou === "") {
        try {
            const validadeLocal = Number(localStorage.getItem("usuario_ja_visitou") || 0);
            if (validadeLocal > Date.now()) {
                visitou = "sim";
            } else {
                localStorage.removeItem("usuario_ja_visitou");
            }
        } catch (error) {
            visitou = "";
        }
    }

    if (visitou === "") {
        modal.style.display = "flex";
        
        // Cria o cookie para não incomodar o usuário na próxima vez
        let data = new Date();
        data.setTime(data.getTime() + (7 * 24 * 60 * 60 * 1000));
        document.cookie = "usuario_ja_visitou=sim; expires=" + data.toUTCString() + "; path=/; SameSite=Lax";

        if (obterCookie("usuario_ja_visitou") === "") {
            try {
                localStorage.setItem("usuario_ja_visitou", String(data.getTime()));
            } catch (error) {
                // O modal continua funcionando mesmo quando o navegador bloqueia o armazenamento.
            }
        }
    }
});

