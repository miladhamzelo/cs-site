<?php


$r->addRoute("GET", "/home/{id}[/{title}]", "welcome.index");
$r->addRoute("GET", "/about", "welcome.about");



$r->addGroup('/api', function (FastRoute\RouteCollector $r) {
    $r->addRoute('GET', '/movies', 'api.movie.get_movies');
    $r->addRoute('GET', '/delete_movie', 'api.movie.delete');
});


?>
