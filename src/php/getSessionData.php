<?php
/**
 * Created by PhpStorm.
 * User: Vladyslav Yazykov
 * Date: 1/20/2018
 * Time: 3:53 AM
 */

foreach (glob('models/*.php') as $filename) {
    require $filename;
}

// 1. Get request data
$performanceId = $_GET['performanceId'];
$sessionTime = $_GET['sessionTime']; // xd Lul Session ))0)

// 2. Get data from DB
$seats = [
    [
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
    ],
    [
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
    ],
    [
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
    ],
    [
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
    ],
    [
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
    ],
    [
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
    ],
    [
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
    ],
    [
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
    ],
    [
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
    ],
    [
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
    ],
    [
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
    ],
    [
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
    ],
    [
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
        new Seat(Availability::Available),
    ],
];

// 3.1 Format
class Response {
    public $performanceTitle;
    public $sessionDateTime;
    public $seats;
}

$response = new Response();
$response->seats = $seats;
// TODO: get this from DB with $performanceId
$response->performanceTitle = "Fake title";
$response-> sessionDateTime = $sessionTime;

// 3. Send response
header("Access-Control-Allow-Origin: *");
echo(json_encode($response));
