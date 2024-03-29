<?php
/**
 * Created by IntelliJ IDEA.
 * User: vlado
 * Date: 17-Apr-18
 * Time: 10:03 PM
 */


use domain\exceptions\UnauthorizedException;
use domain\responses\admin\Session;
use domain\responses\admin\SessionResponse;
use domain\responses\ErrorResponse;

include_once '../../helpers/headers.php';
include_once '../../domain/responses/admin/SessionResponse.php';
include_once '../../domain/responses/ErrorResponse.php';
include_once '../../helpers/databaseConnect.php';
include_once '../../helpers/permissions.php';

session_start();

try {
    restricted();

    $mysqli = db_connect();

    if (!$_SERVER['REQUEST_METHOD'] === 'POST')
        throw new Exception('Only POST is allowed');

    $request = json_decode(file_get_contents('php://input'));

    if (!$mysqli->query("DELETE FROM t_session WHERE id = {$request->sessionId};")) {
        throw new Exception(mysqli_error($mysqli));
    }

    echo json_encode($request);

} catch (Exception $e) {
    ErrorResponse::emit($e);
}