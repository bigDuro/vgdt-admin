<?php namespace App\Services;
use App\Services\DiscordDispatchService;
// Get Base info takes connection and sql query
class DiscordService {
  function __construct()
   {

   }

   function postToDiscordDispatch($json)
   {
     $Service = new DiscordDispatchService();
     $ch = $Service->createMessage($json);
     $response   = curl_exec($ch);
     return $json;
   }

}
