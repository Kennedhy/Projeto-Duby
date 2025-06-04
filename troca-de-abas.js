document.addEventListener('DOMContentLoaded', function() {

    function setupTabs(buttonSelector, contentSelector, activeClass = 'ativo') {
        const buttons = document.querySelectorAll(buttonSelector);
        const contents = document.querySelectorAll(contentSelector);

        if (buttons.length === 0 || contents.length === 0) return;

        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const targetId = this.getAttribute('data-relatorio');
                
                buttons.forEach(b => b.classList.remove(activeClass));
                contents.forEach(c => c.classList.remove(activeClass));
                
                this.classList.add(activeClass);
                if (targetId) {
                    const targetContent = document.getElementById(targetId);
                    if (targetContent) targetContent.classList.add(activeClass);
                }
            });
        });

        if (!document.querySelector(`${buttonSelector}.${activeClass}`)) {
            buttons[0].classList.add(activeClass);
            const firstContentId = buttons[0].getAttribute('data-relatorio');
            if (firstContentId) {
                const firstContent = document.getElementById(firstContentId);
                if (firstContent) firstContent.classList.add(activeClass);
            } else {
                contents[0].classList.add(activeClass);
            }
        }
    }

    setupTabs('.botaoAba', '.trocaDeAbas');
    setupTabs('.botaoDados', '.conteudoImportar');
});