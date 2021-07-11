<?php namespace App\Controllers;
// use App\Services\EquipmentService;

class BaseApiController extends BaseController
{
  function __construct($service)
   {
     $this->service = $service;
   }

	public function index()
	{
		// $Service = new EquipmentService();
		$request = $this->request;
		$response = $this->response;
		$method = $request->getMethod();
		$json = $request->getJSON();

		switch ($method) {
		    case 'post':
						$record = $this->service->saveRecord($json);
						return $response->setJSON($record);
		        break;
		    case 'get':
						$records = $this->service->getRecords();
						return $response->setJSON($records);
		        break;
		    default:
		        echo "nothing here!";
		}
	}

	public function id($id)
	{
		// $Service = new EquipmentService();
		$request = $this->request;
		$response = $this->response;
		$method = $request->getMethod();
		$json = $request->getJSON();

		switch ($method) {
		    case 'get':
						$record = $this->service->getRecord($id);
						return $response->setJSON($record);
		        break;
		    default:
		        echo "nothing here!";
		}
	}

	public function delete($id)
	{
		// $Service = new EquipmentService();
		$request = $this->request;
		$response = $this->response;
		$method = $request->getMethod();

		switch ($method) {
				case 'post':
						$record = $this->service->deleteRecordById($id);
						return $response->setJSON($record);
						break;
				default:
						echo "nothing here!";
		}
	}

	public function type($attr)
	{
		// $Service = new EquipmentService();
		$request = $this->request;
		$response = $this->response;
		$method = $request->getMethod();
		$json = $request->getJSON();

		switch ($method) {
		    case 'get':
						$record = $this->service->getRecordWithAttrs($attr);
						return $response->setJSON($record);
		        break;
		    default:
		        echo "nothing here!";
		}
	}

}
