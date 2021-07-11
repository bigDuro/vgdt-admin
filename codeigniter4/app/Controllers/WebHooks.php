<?php namespace App\Controllers;
use App\Services\WebHooksService;

class WebHooks extends BaseApiController
{
  function __construct()
   {
     $service = new WebHooksService();
     parent::__construct($service);
   }

}
