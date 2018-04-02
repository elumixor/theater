<?php
/**
 * Created by IntelliJ IDEA.
 * User: vlado
 * Date: 31-Mar-18
 * Time: 8:31 PM
 */

$http_origin = $_SERVER['HTTP_ORIGIN'];

if ($http_origin == "http://localhost:4200" || $http_origin == "http://localhost:4201")
{
    header("Access-Control-Allow-Origin: $http_origin");
}

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");