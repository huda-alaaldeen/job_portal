<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'user_id',
        'phone',
        'bio',
        'cv',
        'skills',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
