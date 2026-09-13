<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobPost extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'country',
        'city',
        'job_role',
        'job_level',
        'salary',
        'tags',
        'company_name',
        'job_type',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }
}
