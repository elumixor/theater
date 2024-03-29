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
$personalDataFilePath = $_SERVER['DOCUMENT_ROOT'] . '/theater/app_data/personalData.json';
$selectedPerformanceFilePath = $_SERVER['DOCUMENT_ROOT'] . '/theater/app_data/selectedPerformance.json';
$selectedSessionFilePath = $_SERVER['DOCUMENT_ROOT'] . '/theater/app_data/selectedSession.json';

require_once $_SERVER['DOCUMENT_ROOT'] . "/theater/php/helpers/transformException.php";
require_once $_SERVER['DOCUMENT_ROOT'] . "/theater/php/validations/serverMethod.php";
require_once $_SERVER['DOCUMENT_ROOT'] . "/theater/php/models/Exceptions.php";

/* Posts seats reservation request */
try {
//    methodAllowed('POST'); todo?????
    session_start();
    /* as
         {
            pData: {
                row: number, seat: number,
                userData?: {
                    name?: string,
                    phone?: string,
                    email?: string,
                    vk?: string,
                    whatsApp?: string,
                    viber?: string,
                    telegram?: string
                }
            }[],
            maxRows: number
        }
    */
//    $personalData = $_SESSION['personalData']; // TODO...

    $personalData = json_decode(file_get_contents($personalDataFilePath))->pData;

//    $selectedPerformance = $_SESSION['selectedPerformance']; // TODO..
//    $selectedSession = $_SESSION['selectedSession']; // TODO..

    $selectedPerformance = json_decode(file_get_contents($selectedPerformanceFilePath));
//    print_r($selectedPerformance);

    $selectedSession = json_decode(file_get_contents($selectedSessionFilePath));
//    print_r($selectedSession);

    $performances = json_decode(file_get_contents($dataFilePath));
    $performance = $performances[$selectedPerformance];

    $session = array_filter($performance->sessions, function ($p) use ($selectedSession) {
        return $p->date == $selectedSession;
    })[0];

    foreach ($personalData as $seatRequest) {
        $seat = $session->seats[$seatRequest->row][$seatRequest->seat];
        $seat->availability = 1;
        $seat->viewer = $seatRequest->userData;
    }

    file_put_contents($dataFilePath, json_encode($performances));

    echo json_encode($session);
} catch (baseException $e) {
    transformException($e);
}
