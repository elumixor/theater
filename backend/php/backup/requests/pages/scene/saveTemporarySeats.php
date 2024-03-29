<?php
/**
 * Created by PhpStorm.
 * User: Vladyslav Yazykov
 * Date: 1/20/2018
 * Time: 2:25 AM
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$dataFilePath = $_SERVER['DOCUMENT_ROOT'] . '/theater/app_data/performances.json';
$seatsFilePath = $_SERVER['DOCUMENT_ROOT'] . '/theater/app_data/personalData.json';

require_once $_SERVER['DOCUMENT_ROOT'] . "/theater/php/helpers/transformException.php";
require_once $_SERVER['DOCUMENT_ROOT'] . "/theater/php/validations/serverMethod.php";
require_once $_SERVER['DOCUMENT_ROOT'] . "/theater/php/models/Exceptions.php";

/* Saves selected personalData, title and session time */

try {
//    methodAllowed('POST'); todo?????

    $seats = json_decode(file_get_contents('php://input'));

    // object is this:
    /*
        {
            seats: { row: number, seat: number }[]
            maxRows: number
        }
    */
    // TODO...

    session_start();

    $_SESSION['personalData'] = $seats;

    file_put_contents($seatsFilePath, json_encode($seats));

    echo json_encode($_SESSION['personalData']);
//    header("HTTP 1.1 200 OK");
} catch (Exception $e) { // )) internal SERVER Error) ))0
    transformException($e);
}
