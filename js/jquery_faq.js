$(() => {
    $('#dd-toggle').click((e) => {
        $('dd').each((idx, el) => {
            setTimeout(() => $(el).toggleClass('invisible'), 100 * idx);
        });
    });

    $('dt').click(function () {
        $(this).toggleClass('highlight');
    });

    $('#last-li-highlight').click(function () {
        $('#national-parks-detail ul').each(function () {
            $(this).children().last().toggleClass('highlight');
        });
    });
    $('.national-park-title').click(function () {
        const nextItem = $(this).next();
        nextItem.css('font-weight', nextItem.css('font-weight') !== '700' ? '700' : '400');
    });

    $('#national-parks-detail li').click(function () {
        $(this).parent().children().first().css('color', 'blue');
    });

    $('.swap').click(function () {
        const frameContainer = $(this).parent().parent();
        const container = $(this).parent();
        const img = container.find('img');
        const index = frameContainer.children().index(container);
        const prevFrame = index === 0
            ? frameContainer.children().eq(frameContainer.children().length - 1)
            : frameContainer.children().eq(index - 1);

        const nextFrame = frameContainer.children().eq((index + 1) % frameContainer.children().length);
        const nextSrc = nextFrame.find('img').attr('src');
        const prevSrc = prevFrame.find('img').attr('src');

        if (index === 0) {
            nextFrame.find('img').attr('src', img.attr('src'));
            img.attr('src', nextSrc);
        } else if (index === 1) {
            const switchWith = Math.random() > 0.5
                ? { frame: nextFrame, src: nextSrc }
                : { frame: prevFrame, src: prevSrc };
            switchWith.frame.find('img').attr('src', img.attr('src'));
            img.attr('src', switchWith.src);
        } else {
            prevFrame.find('img').attr('src', img.attr('src'));
            img.attr('src', prevSrc);
        }

    });

});