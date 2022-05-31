let darkMode = JSON.parse(localStorage.getItem('darkMode'));
if (darkMode) document.body.classList.add('dark-mode');

const toggleDarkMode = () => {
    if (!darkMode) localStorage.setItem('darkMode', 'true');
    else localStorage.setItem('darkMode', 'false');
    document.body.classList.toggle('dark-mode');
};
const setDarkMode = (val) => {
    localStorage.setItem('darkMode', val);
    if (val) document.body.classList.add('dark-mode');
    else document.body.classList.remove('dark-mode');
};


const initThemeSwitcher = () => {
    const modeSwitchBtn = document.createElement('button');
    modeSwitchBtn.id = 'theme-switcher';
    modeSwitchBtn.innerHTML = '<i class="fa-solid fa-circle-half-stroke"></i>';
    document.body.prepend(modeSwitchBtn);
    modeSwitchBtn.addEventListener('click', (e) => {
        toggleDarkMode();
    });
};
initThemeSwitcher();

// ############################## HELPERS ############################## //
const htmlToElement = (html) => {
    let template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
};


// ############################################################ //

let MODAL;

const Modal = ({ title, body, type }) => {

    //language=HTML
    return {
        element: htmlToElement(`
            <div id="modal" class="${type}">
                <div id="modal-exit"><i class="fa-solid fa-xmark"></i></div>
                <div id="modal-title"><h1>${type === 'error' ? '<i class="fa-solid fa-circle-exclamation"></i>' : ''}
                    ${title}</h1></div>
                <div id="modal-body">${body ? body : ''}</div>
            </div>`),
        close: function () {
            this.element.style.display = 'none';
        }

    };
};

const setModal = ({ title, body, type }) => {
    const modal = document.querySelector('#modal');
    const newModal = Modal({ title, body, type });
    newModal.element.querySelector('#modal-exit').addEventListener('click', () => newModal.close());
    if (modal) modal.replaceWith(newModal.element);
    else document.body.append(newModal.element);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    MODAL = newModal;
    return modal;
};

