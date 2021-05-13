<?php namespace App\Services;
use App\Models\AssetModel;
helper('filesystem');
// Get Asset info takes connection and sql query
class AssetService {
  function __construct()
   {

   }

   public function getRecords()
   {
     $model = new AssetModel();
     $records = $model->findAll();
     return $records;
   }

   public function getRecordsByFolder($table, $id)
   {
     $path = 'assets/' . $table . '/' . $id;
     $map = directory_map($path);
     return $map;
   }


   public function fileUpload($file, $table, $id)
   {
     $response = false;
     $path = 'assets/' . $table . '/' . $id;
     $model = new AssetModel();
     $data = new \App\Entities\Asset();

     if ($file->isValid() && ! $file->hasMoved())
     {
       $name = $file->getName();
       $assetName = preg_replace('/[^A-Za-z0-9.]/', '_', $name);
       $data->name = $assetName;
       $data->category = $table;
       $data->categoryId = $id;
       $data->previewUrl = 'assets/' . $table . '/' . $id . '/' . $assetName;
       $data->type = $file->getMimeType();
       $data->size = $file->getSize();
       $data->lastModifiedDate = $file->getMTime();
       $filename = $path . '/' . $assetName;

       // if (file_exists($filename)) {
       //   $records = $model->where('category', $table)
       //   ->where('categoryId', $id)
       //   ->findAll();
       // }else {


         $response = $file->move($path, $assetName);

         // if($response) {
         //   // echo "fileUpload:: " . $response;
         //   // $map = directory_map('./mydirectory/');
         //   $model->save($data);
         //   $records = $model->where('category', $table)
         //   ->where('categoryId', $id)
         //   ->findAll();
         //   // return $response;
         // }
       // }
     }
     $map = directory_map($path);
     return $map;
   }

   public function getRecordsByTable($table, $id)
   {
     // $model = new AssetModel();
     // $records = $model->where('category', $table)
     // ->where('categoryId', $id)
     // ->findAll();
     // return $records;
     $path = 'assets/' . $table . '/' . $id;
     $map = directory_map($path);
     return $map;
   }

   public function deleteFile($table, $id, $file)
   {

     $path = './assets/' . $table . '/' . $id;
     unlink($path . '/' . $file);
     $map = directory_map($path);
     return $map;
   }
}

// 'height',
// 'lastModifiedDate',
// 'name',
// 'percent',
// 'previewUrl',
// 'size',
// 'status',
// 'type',
// 'uploadedDate',
// 'width',
// 'category',
// 'categoryId'
