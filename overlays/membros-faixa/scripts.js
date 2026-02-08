function iniciarOverlay() {
   const scrollWrapper = document.getElementById("scroll-wrapper");
   const container = document.getElementById("container");
   const itensOriginais = Array.from(container.children);

   if (itensOriginais.length === 0) return;

   container.innerHTML = "";
   
   // Primeiro, cria um "bloco" com os itens originais
   const blocoUnitario = document.createElement("div");
   blocoUnitario.style.display = "flex";
   blocoUnitario.style.width = "max-content";
   itensOriginais.forEach(item => blocoUnitario.appendChild(item.cloneNode(true)));
   
   container.appendChild(blocoUnitario);
   const larguraDoBloco = blocoUnitario.getBoundingClientRect().width;

   // Calcula quantos blocos são necessários para cobrir 1920px + folga
   const clonesNecessarios = Math.ceil(1920 / larguraDoBloco) + 1;

   for (let i = 0; i < clonesNecessarios; i++) {
      container.appendChild(blocoUnitario.cloneNode(true));
   }

   // A animação move exatamente a largura de UM bloco
   container.style.setProperty("--scroll-width", `-${larguraDoBloco}px`);
   container.style.setProperty("--duration", `${larguraDoBloco / 60}s`);

   let segundosContados = 0;
   const tempoAparecendo = 15;
   const tempoEscondido = 1;

   function gerenciarExibicao() {
      const tempoNoCiclo = segundosContados % (tempoAparecendo + tempoEscondido);
      if (tempoNoCiclo < tempoAparecendo) {
         scrollWrapper.classList.add("visible");
      } else {
         scrollWrapper.classList.remove("visible");
      }
      segundosContados++;
   }

   setInterval(gerenciarExibicao, 1000);
   gerenciarExibicao();
}


document.addEventListener("DOMContentLoaded", iniciarOverlay);

