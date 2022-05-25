(function () {
    'use strict';
    const tableBody = $('#insertProducts');
    const getInventory = () => {
        $.get('./data/inventory.json').done((data) => {
            let html = '';
            data.forEach((item, idx) => {
                //language=HTML
                html += `
                    <tr>
                        <td>${item.title}</td>
                        <td>${item.quantity}</td>
                        <td>$${item.price}</td>
                        <td>${item.categories.join(', ')}</td>
                    </tr>`;
            });
            tableBody.html($(html));
        });
    };
    getInventory();

    $('#reloadInventory').click(function () {
        $(this).get()[0].animate([
            {

                transform: 'rotateZ(0deg)'
            },
            {
                transform: 'rotateZ(90deg)'

            },
            {
                transform: 'rotateZ(0deg)'

            }], {
            duration: 250
        });
        getInventory();
    });

})();