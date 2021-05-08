<?php namespace App\Services;
use App\Models\AssetModel;

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

   public function fileUpload($file, $table, $id)
   {
     $response = false;
     $path = 'assets/' . $table . '/' . $id;
     $model = new AssetModel();
     $data = new \App\Entities\Asset();
     if ($file->isValid() && ! $file->hasMoved())
     {
       $name = $file->getName();
       $data->name = $name;
       $data->category = $table;
       $data->categoryId = $id;
       $data->previewUrl = 'assets/' . $table . '/' . $id . '/' . $name;
       $data->type = $file->getMimeType();
       $data->size = $file->getSize();
       $data->lastModifiedDate = $file->getMTime();

       $response = $file->move($path);
       if($response) {


         $model->save($data);
         $records = $model->where('category', $table)
         ->where('categoryId', $id)
         ->findAll();
       }

     }
     return $records;
   }

   public function getRecordsByTable($table, $id)
   {
     $model = new AssetModel();
     $records = $model->where('category', $table)
     ->where('categoryId', $id)
     ->findAll();
     return $records;
   }

   public function deleteRecordById($record_id)
   {
     $model = new AssetModel();
     $record = $model->find($record_id);
     $model->delete([$record_id]);

     return $record;
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
