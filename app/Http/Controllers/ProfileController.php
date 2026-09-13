<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function showProfile(Request $request)
    {
        $user = $request->user()->load('profile');
        return response()->json($user);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user()->load('profile');

        $user->update([
            'name' => $validatedData['name'] ?? $user->name,
            'email' => $validatedData['email'] ?? $user->email,
            'phone' => $validatedData['phone'] ?? $user->phone,
        ]);

        $user->profile->update([
            'bio' => $validatedData['bio'] ?? $user->profile->bio,
            'cv' => $validatedData['cv'] ?? $user->profile->cv,
            'skills' => $validatedData['skills'] ?? $user->profile->skills,
        ]);

        $user->update($user);

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user
        ]);
    }

    public function uploadCV(Request $request)
    {
        $user = $request->user();

         $request->validate([
            'cv' => 'required|file|mimes:pdf,doc,docx|max:5120',
        ]);

        $path = $request->file('cv')->store('cvs', 'public');

        $user->profile()->update([
            'cv' => $path,
        ]);

        return response()->json([
            'message' => 'CV uploaded successfully',
            'cv' => $path,
        ]);
    }
}
