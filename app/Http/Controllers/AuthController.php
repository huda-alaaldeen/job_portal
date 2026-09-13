<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            "name" => "required|string|max:255",
            "email" => "required|string|email|max:255|unique:users",
            "password" => "required|string|min:8",
            "phone" => "required|string|max:15",
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'phone' => $validatedData['phone'],
        ]);
        $user->profile()->create([]);
        return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
    }

    public function login(Request $request)
    {
        $validatedData = $request->validate([
            "email" => "required|string|email",
            "password" => "required|string",
        ]);

        $user = User::where('email', $validatedData['email'])->first();

        if (!$user || !Hash::check($validatedData['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Generate a token for the user (you can use Laravel Sanctum or Passport for this)
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['access_token' => $token, 'token_type' => 'Bearer']);
    }
}
