$(() => {
    const Card = (title, desc, { id } = {}) => {
        //language=HTML
        return `
            <div class="card" ${id ? `id="${id}"` : ''}">
            <h2>${title}</h2>
            <p>${desc}</p>
            </div>`;
    };
    const cards = [
        {
            title: 'Card1',
            desc: 'bsjdbakjdjasbdkj',
            id: 'myFirstCard'
        },
        {
            title: 'Card2',
            desc: 'Card2',
            id: 'mySecondCard'
        },
        {
            title: 'Card3',
            desc: 'Card3'
        }
    ];


    $('main').append(cards.map((card, idx) => Card(card.title, card.desc, { id: card.id })));
    $('.codeup').css({ border: '1px solid red' });
    // $('li').css({ fontSize: '20px' });
    $('h1, p, li').css({ backgroundColor: 'yellow' });
    // alert($('h1').text());
    $('#codeupChangeBtn').click(() => {
        $('h1.codeup:nth-of-type(1)').css({ backgroundColor: 'red' });
    });
    $('p').dblclick((e) => $(e.target).css({ fontSize: '18px' }));
    $('li').hover((e) => $(e.target).css({ color: 'red' }), (e) => $(e.target).css({ color: 'black' }));

});