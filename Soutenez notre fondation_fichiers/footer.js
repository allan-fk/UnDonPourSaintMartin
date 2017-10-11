function fdfFooter(){
    //footer: insert new header & remove old
    $('#footer').before('\
        <footer>\
            <div class="col-md-5"><img src="/libs.iraiser.eu/users/fdf/logo-label-ideas.png"></div>\
            <div class="col-md-7 link">\
                <a href="/contactez-nous" target="_blank" title="">Contact</a><span>|</span>\
                <a href="/-aides" target="_blank" title="">Aide</a><span>|</span>\
                <a href="/-securite" target="_blank" title="">Sécurité</a><span>|</span>\
                <a href="/mentions-legales" target="_blank" title="">Mentions légales</a><span>|</span>\
                <span>© Fondation de France 2014</span>\
            </div>\
            <div class="clearfix"></div>\
            </footer>');
    $('#powered').appendTo('footer');   //move powered
    $('#footer').remove();

    $('#colG h2').each(function(index, el) {
        var title = $(this).text();
        index = parseInt(index)+1;
        var title = index+' - '+title;
        $(this).text(title);
    });
};