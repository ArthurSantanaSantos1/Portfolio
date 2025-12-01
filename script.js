// ===================================
// INICIALIZAÇÃO
// ===================================

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
    inicializarSite();
});

// Função principal de inicialização
const inicializarSite = () => {
    configurarAnoAtual();
    configurarNavegacaoSuave();
    configurarBotoesVerMais();
    configurarMenuAtivo();
    configurarModoEscuro();
    exibirMensagemBoasVindas();
};

// ===================================
// MENSAGEM DE BOAS-VINDAS
// ===================================

const exibirMensagemBoasVindas = () => {
    console.log('====================================');
    console.log('👋 Bem-vindo ao portfólio de Arthur Santana Santos!');
    console.log('🎓 Estudante de Engenharia de Software - CEUB');
    console.log('🤖 Apaixonado por Inteligência Artificial');
    console.log('📧 arthur.ass.0310@gmail.com');
    console.log('====================================');
};

// ===================================
// ANO ATUAL NO RODAPÉ
// ===================================

const configurarAnoAtual = () => {
    const elementoAno = document.getElementById('ano-atual');
    const anoAtual = new Date().getFullYear();
    elementoAno.textContent = anoAtual;
};

// ===================================
// NAVEGAÇÃO SUAVE
// ===================================

const configurarNavegacaoSuave = () => {
    const linksNavegacao = document.querySelectorAll('.link-navegacao');
    
    linksNavegacao.forEach(link => {
        link.addEventListener('click', (evento) => {
            evento.preventDefault();
            
            const destino = link.getAttribute('href');
            const elementoDestino = document.querySelector(destino);
            
            if (elementoDestino) {
                // Calcula a posição considerando a altura do navbar
                const alturaNavbar = document.querySelector('.navbar').offsetHeight;
                const posicaoElemento = elementoDestino.offsetTop - alturaNavbar;
                
                // Realiza a rolagem suave
                window.scrollTo({
                    top: posicaoElemento,
                    behavior: 'smooth'
                });
                
                // Fecha o menu mobile se estiver aberto
                const menuMobile = document.querySelector('.navbar-collapse');
                if (menuMobile.classList.contains('show')) {
                    menuMobile.classList.remove('show');
                }
            }
        });
    });
};

// ===================================
// MENU ATIVO BASEADO NA ROLAGEM
// ===================================

const configurarMenuAtivo = () => {
    const secoes = document.querySelectorAll('section[id]');
    const linksMenu = document.querySelectorAll('.nav-link');
    
    // Função para atualizar o link ativo
    const atualizarLinkAtivo = () => {
        const posicaoRolagem = window.scrollY;
        
        secoes.forEach(secao => {
            const alturaNavbar = document.querySelector('.navbar').offsetHeight;
            const topoSecao = secao.offsetTop - alturaNavbar - 100;
            const alturaSecao = secao.offsetHeight;
            const idSecao = secao.getAttribute('id');
            
            if (posicaoRolagem >= topoSecao && posicaoRolagem < topoSecao + alturaSecao) {
                // Remove a classe active de todos os links
                linksMenu.forEach(link => link.classList.remove('active'));
                
                // Adiciona a classe active ao link correspondente
                const linkAtivo = document.querySelector(`.nav-link[href="#${idSecao}"]`);
                if (linkAtivo) {
                    linkAtivo.classList.add('active');
                }
            }
        });
    };
    
    // Executa ao rolar a página
    window.addEventListener('scroll', atualizarLinkAtivo);
    
    // Executa ao carregar a página
    atualizarLinkAtivo();
};

// ===================================
// DADOS DOS PROJETOS
// ===================================

const dadosProjetos = [
    {
        titulo: 'Ventury Odonto - Site de Clínica Odontológica',
        descricaoCompleta: `Este projeto consiste no desenvolvimento de um site completo para a clínica odontológica Ventury Odonto, criado com o auxílio da inteligência artificial Claude. O site apresenta um design moderno e responsivo, com uma identidade visual bem definida utilizando tons de vinho, cinza e branco.

O protótipo atual conta com diversas páginas funcionais: uma página inicial (Início) que apresenta a clínica e seus principais links de navegação; páginas informativas sobre Consultas, Exames e Tratamentos oferecidos; uma seção dedicada à Equipe, mostrando os profissionais da clínica; e uma página de Contato completa com formulário e mapa ilustrativo para facilitar a localização.

O projeto está em fase de desenvolvimento ativo, com levantamento de requisitos em andamento para adicionar novas funcionalidades e melhorias. As tecnologias utilizadas incluem HTML5 para estruturação semântica, CSS3 para estilização avançada, JavaScript para interatividade, Bootstrap para design responsivo e Font Awesome para ícones modernos. O layout é totalmente adaptável a diferentes dispositivos (desktop, tablet e mobile), garantindo uma excelente experiência do usuário em todas as plataformas.

Este projeto demonstra habilidades em desenvolvimento front-end, design responsivo, trabalho com frameworks modernos e capacidade de criar soluções web completas desde o conceito até a implementação.`,
        tecnologias: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Font Awesome', 'Design Responsivo'],
        link: 'https://github.com/ArthurSantanaSantos1/Site_Clinica',
        githubLink: 'https://github.com/ArthurSantanaSantos1/Site_Clinica'
    }
];

// ===================================
// BOTÕES "VER MAIS" DOS PROJETOS
// ===================================

const configurarBotoesVerMais = () => {
    const botoesVerMais = document.querySelectorAll('.btn-ver-mais');
    
    botoesVerMais.forEach(botao => {
        botao.addEventListener('click', (evento) => {
            const indiceProjeto = parseInt(evento.target.getAttribute('data-projeto'));
            exibirDetalhesProjeto(indiceProjeto);
        });
    });
};

// Arrow Function para exibir detalhes do projeto
const exibirDetalhesProjeto = (indice) => {
    const projeto = dadosProjetos[indice];
    
    if (!projeto) {
        console.error('Projeto não encontrado!');
        return;
    }
    
    // Cria modal personalizado para exibir os detalhes
    criarModalProjeto(projeto);
};

// Arrow Function para criar modal de projeto
const criarModalProjeto = (projeto) => {
    // Remove modal anterior se existir
    const modalAnterior = document.getElementById('modal-projeto');
    if (modalAnterior) {
        modalAnterior.remove();
    }
    
    // Cria o elemento do modal
    const modal = document.createElement('div');
    modal.id = 'modal-projeto';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        padding: 20px;
        animation: surgirModal 0.3s ease-out;
    `;
    
    const conteudoModal = document.createElement('div');
    conteudoModal.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        max-width: 700px;
        max-height: 85vh;
        overflow-y: auto;
        position: relative;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: surgirConteudo 0.4s ease-out;
    `;
    
    conteudoModal.innerHTML = `
        <button id="fechar-modal" style="
            position: absolute;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            font-weight: bold;
        " onmouseover="this.style.background='#dc2626'; this.style.transform='rotate(90deg)'" 
           onmouseout="this.style.background='#ef4444'; this.style.transform='rotate(0deg)'">×</button>
        
        <h2 style="color: #2563eb; margin-bottom: 25px; font-size: 28px; font-weight: 700;">
            ${projeto.titulo}
        </h2>
        
        <div style="line-height: 1.9; color: #475569; margin-bottom: 30px; text-align: justify; font-size: 16px;">
            ${projeto.descricaoCompleta.split('\n\n').map(paragrafo => 
                `<p style="margin-bottom: 20px;">${paragrafo}</p>`
            ).join('')}
        </div>
        
        <h4 style="color: #1e293b; margin-bottom: 15px; font-size: 20px; font-weight: 600;">
            💻 Tecnologias Utilizadas:
        </h4>
        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 30px;">
            ${projeto.tecnologias.map(tec => `
                <span style="
                    background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 500;
                    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
                ">${tec}</span>
            `).join('')}
        </div>
        
        ${projeto.githubLink ? `
            <div style="text-align: center;">
                <a href="${projeto.githubLink}" target="_blank" style="
                    display: inline-block;
                    background: #24292e;
                    color: white;
                    padding: 14px 30px;
                    border-radius: 10px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 16px;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                " onmouseover="this.style.background='#000'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0, 0, 0, 0.3)'"
                   onmouseout="this.style.background='#24292e'; this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0, 0, 0, 0.2)'">
                    🔗 Ver no GitHub
                </a>
            </div>
        ` : ''}
    `;
    
    modal.appendChild(conteudoModal);
    document.body.appendChild(modal);
    
    // Impede scroll do body quando modal está aberto
    document.body.style.overflow = 'hidden';
    
    // Adiciona evento para fechar o modal
    const botaoFechar = document.getElementById('fechar-modal');
    const fecharModal = () => {
        modal.style.animation = 'desaparecerModal 0.3s ease-out';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 250);
    };
    
    botaoFechar.addEventListener('click', fecharModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) fecharModal();
    });
    
    // Fecha com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.getElementById('modal-projeto')) {
            fecharModal();
        }
    });
};

// Adiciona animações CSS para o modal
const adicionarEstilosModal = () => {
    if (!document.getElementById('estilos-modal')) {
        const estilos = document.createElement('style');
        estilos.id = 'estilos-modal';
        estilos.textContent = `
            @keyframes surgirModal {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes desaparecerModal {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            @keyframes surgirConteudo {
                from { 
                    opacity: 0;
                    transform: scale(0.9) translateY(20px);
                }
                to { 
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }
        `;
        document.head.appendChild(estilos);
    }
};

adicionarEstilosModal();

// ===================================
// MODO ESCURO / CLARO
// ===================================

const configurarModoEscuro = () => {
    const botaoTema = document.getElementById('btn-tema');
    const iconeTema = document.getElementById('icone-tema');
    
    // Verifica se há preferência salva no localStorage
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'escuro') {
        document.body.classList.add('dark-mode');
        iconeTema.textContent = '☀️';
    }
    
    // Adiciona evento de clique no botão
    botaoTema.addEventListener('click', () => {
        alternarTema(iconeTema);
    });
};

// Arrow Function para alternar entre modo claro e escuro
const alternarTema = (iconeTema) => {
    document.body.classList.toggle('dark-mode');
    
    // Atualiza o ícone
    if (document.body.classList.contains('dark-mode')) {
        iconeTema.textContent = '☀️';
        localStorage.setItem('tema', 'escuro');
        console.log('🌙 Modo escuro ativado');
    } else {
        iconeTema.textContent = '🌙';
        localStorage.setItem('tema', 'claro');
        console.log('☀️ Modo claro ativado');
    }
    
    // Animação suave
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
};

// ===================================
// FORMULÁRIO DE CONTATO (REMOVIDO)
// ===================================
// Função removida conforme solicitado pelo usuário

// ===================================
// EFEITOS ADICIONAIS DE INTERATIVIDADE
// ===================================

// Arrow Function para animar elementos ao entrar na viewport
const observarElementos = () => {
    const elementos = document.querySelectorAll('.item-projeto');
    
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.style.opacity = '1';
                entrada.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elementos.forEach(elemento => {
        observador.observe(elemento);
    });
};

// Inicializa o observador quando o DOM estiver carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observarElementos);
} else {
    observarElementos();
}

// ===================================
// LOG DE INICIALIZAÇÃO
// ===================================

console.log('✅ Portfólio inicializado com sucesso!');
console.log('🎓 Arthur Santana Santos - Estudante de Engenharia de Software');
console.log('📍 CEUB - Taguatinga');
console.log('💻 Desenvolvido com HTML5, CSS3 e JavaScript moderno');
