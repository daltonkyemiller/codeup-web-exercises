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
        // Get the container of the frames
        const frameContainer = $(this).parent().parent();
        // Get the current frame
        const currFrame = $(this).parent();
        const currImg = currFrame.find('img');
        const currIndex = frameContainer.children().index(currFrame);

        // If the current frame index is 0, set the previous frame to the last frame, else set it to the previous frame
        const prevFrame = currIndex === 0
            ? frameContainer.children().eq(frameContainer.children().length - 1)
            : frameContainer.children().eq(currIndex - 1);

        // If the current frame index is the
        const nextFrame = currIndex === (frameContainer.children().length - 1)
            ? frameContainer.children().eq(0)
            : frameContainer.children().eq(currIndex + 1);
        
        const nextSrc = nextFrame.find('img').attr('src');
        const prevSrc = prevFrame.find('img').attr('src');
        if (currIndex === 0) {
            nextFrame.find('img').attr('src', currImg.attr('src'));
            currImg.attr('src', nextSrc);
        } else if (currIndex === 1) {
            const switchWith = Math.random() > 0.5
                ? { frame: nextFrame, src: nextSrc }
                : { frame: prevFrame, src: prevSrc };
            switchWith.frame.find('img').attr('src', currImg.attr('src'));
            currImg.attr('src', switchWith.src);
        } else {
            prevFrame.find('img').attr('src', currImg.attr('src'));
            currImg.attr('src', prevSrc);
        }

    });

});