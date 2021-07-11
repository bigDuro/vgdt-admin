<?php namespace App\Controllers;
use App\Services\EquipmentService;

class Equipment extends BaseApiController
{
	function __construct()
   {
     $service = new EquipmentService();
     parent::__construct($service);
   }

}
