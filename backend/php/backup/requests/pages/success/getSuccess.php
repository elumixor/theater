<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 24-Jan-18
 * Time: 12:07 PM
 */

try {
    methodAllowed('GET');


} catch (baseException $e) {
    transformException($e);
}