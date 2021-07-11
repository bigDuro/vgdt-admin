<?php namespace App\Controllers;
use App\Services\UploadService;

class Uploads extends BaseApiController
{
	function __construct()
   {
     $service = new UploadService();
     parent::__construct($service);
   }

}
