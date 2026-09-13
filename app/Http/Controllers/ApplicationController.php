<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function index()
    {
        $applications = Application::all();
        return response()->json($applications);
    }

    public function viewApplication($id)
    {
        $application = Application::find($id);
        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }
        return response()->json($application);
    }

    public function updateApplication(Request $request, $id)
    {
        $application = Application::find($id);
        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }

        $validatedData = $request->validate([
            'status' => 'required|string|in:pending,accepted,rejected',
            'cv' => 'string',
        ]);

        $application->update($validatedData);

        return response()->json([
            'message' => 'Application updated successfully',
            'application' => $application
        ]);
    }
    public function deleteApplication($id)
    {
        $application = Application::find($id);
        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }

        $application->delete();

        return response()->json(['message' => 'Application deleted successfully']);
    }
    
    public function submitApplication(Request $request)
    {
        $validatedData = $request->validate([
            'job_post_id' => 'required|exists:job_posts,id',
            'cv' => 'required|file|mimes:pdf|max:5120',
        ]);

        $cvPath = $request->file('cv')->store('cvs', 'public');

        $application = Application::create([
            'user_id' => $request->user()->id,
            'job_post_id' => $validatedData['job_post_id'],
            'cv' => $cvPath,
        ]);

        return response()->json([
            'message' => 'Application submitted successfully',
            'application' => $application
        ], 201);
    }
}
