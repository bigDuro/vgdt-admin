<?php namespace App\Controllers;
use App\Services\AssetService;

class Assets extends BaseController
{
	public function index()
  {
		$Service = new AssetService();
		$request = $this->request;
		$response = $this->response;
		$method = $request->getMethod();
		$json = $request->getJSON();

		switch ($method) {
				case 'get':
						$records = $Service->getRecords();
						return $response->setJSON($records);
						break;
				default:
						echo "nothing here!";
		}
  }

	public function get($table, $id)
  {
		$Service = new AssetService();
		$request = $this->request;
		$response = $this->response;
		$method = $request->getMethod();
		$json = $request->getJSON();

		switch ($method) {
				case 'get':
						$records = $Service->getRecordsByFolder($table, $id);
						return $response->setJSON($records);
						break;
				default:
						echo "nothing here!";
		}
  }

	public function upload($table, $id)
	{
		$Service = new AssetService();
		$request = $this->request;
		$response = $this->response;
		$method = $request->getMethod();
    $file = $request->getFile('file');

		switch ($method) {
		    case 'post':
						$record = $Service->fileUpload($file, $table, $id);
						return $response->setJSON($record);
		        break;
				case 'get':
						$records = $Service->getRecordsByTable($table, $id);
						return $response->setJSON($records);
						break;
		    default:
		        echo "nothing here!";
		}
	}

	public function delete($table, $recordId, $file)
	{
		$Service = new AssetService();
		$request = $this->request;
		$response = $this->response;
		$method = $request->getMethod();

		switch ($method) {
				case 'post':
						$record = $Service->deleteFile($table, $recordId, $file);
						return $response->setJSON($record);
						break;
				default:
						echo "nothing here!";
		}
	}
}
