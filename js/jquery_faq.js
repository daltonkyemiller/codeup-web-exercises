$(() => {
    $('#dd-toggle').click((e) => {
        $('dd').each((idx, el) => {
            setTimeout(() => $(el).toggleClass('invisible'), 100 * idx);
        });
    });

    $('dt').click(function () {
        $(this).toggleClass('highlight');
    });
});