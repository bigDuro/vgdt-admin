<?php namespace App\Controllers;
use App\Services\InvoiceService;

class Invoices extends BaseApiController
{
	function __construct()
   {
     $service = new InvoiceService();
     parent::__construct($service);
   }

}
