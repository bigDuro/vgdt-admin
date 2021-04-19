<?php

namespace App\Entities;

use CodeIgniter\Entity;

class Asset extends Entity
{
    protected $attributes = [
        'height' => null,
        'lastModifiedDate' => null,        // Represents a username
        'name' => null,
        'percent' => null,
        'previewUrl' => null,
        'size' => null,
        'status' => null,
        'type' => null,
        'uploadedDate' => null,
        'width' => null,
        'category' => null,
        'categoryId' => null
    ];
}
