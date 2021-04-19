<?php namespace App\Models;

use CodeIgniter\Model;

class AssetModel extends Model
{
    protected $DBGroup = 'default';

    protected $table      = 'assets';
    protected $primaryKey = 'id';

    protected $returnType     = 'array';
    // protected $useSoftDeletes = true;
    protected $allowedFields = [
      'height',
      'lastModifiedDate',
      'name',
      'percent',
      'previewUrl',
      'size',
      'status',
      'type',
      'uploadedDate',
      'width',
      'category',
      'categoryId'
    ];

    protected $useTimestamps = false;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    protected $validationRules    = [];
    protected $validationMessages = [];
    protected $skipValidation     = false;
}
