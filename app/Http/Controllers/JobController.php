<?php

namespace App\Http\Controllers;

use App\Models\JobPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JobController extends Controller
{
    public function createJobPost(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'country' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'job_role' => 'required|string|max:255',
            'job_level' => 'required|string|max:255',
            'salary' => 'required|numeric',
            'tags' => 'required|string',
            'company_name' => 'required|string|max:255',
            'job_type' => 'required|string|max:255',
        ]);

        $validatedData['user_id'] = Auth::id();

        $jobPost = JobPost::create($validatedData);
        if (!Auth::user()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        };
        return response()->json([
            'message' => 'Job post created successfully',
            'job_post' => $jobPost
        ], 201);
    }

    public function listJobPosts()
    {
        $jobPosts = JobPost::all();
        return response()->json($jobPosts);
    }

    public function searchJobPosts(Request $request)
    {
        $query = $request->input('query');
        $jobPosts = JobPost::where('title', 'like', "%$query%")
            ->get();
        if ($jobPosts->isEmpty()) {
            return response()->json(['message' => 'No job posts found'], 404);
        }
        return response()->json($jobPosts);
    }

    public function updateJobPost(Request $request, $id)
    {

        $jobPost = JobPost::find($id);
        if (!$jobPost) {
            return response()->json(['message' => 'Job post not found'], 404);
        }

        if ($jobPost->user_id != Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validatedData = $request->validate([

            'title' => 'string|max:255',
            'description' => 'string',
            'country' => 'string|max:255',
            'city' => 'string|max:255',
            'job_role' => 'string|max:255',
            'job_level' => 'string|max:255',
            'salary' => 'numeric',
        ]);
        $jobPost->update($validatedData);
        return response()->json(['message' => 'Job post updated successfully', 'job_post' => $jobPost]);
    }

    public function deleteJobPost($id)
    {
        $jobPost = JobPost::find($id);
        if (!$jobPost) {
            return response()->json(['message' => 'job post not found'], 404);
        }
        if ($jobPost->user_id != Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $jobPost->delete();
        return response()->json(['message' => 'Job post deleted successfully'], 200);
    }


    public function viewJobDetails($id)
    {
        $jobPost = JobPost::find($id);
        if (!$jobPost) {
            return response()->json(['message' => 'Job post not found'], 404);
        }
        return response()->json($jobPost);
    }
   


    public function filterJobs()
    {

        $jobPosts = JobPost::query();

        if (request()->has('country')) {
            $jobPosts->where('country', request('country'));
        }

        if (request()->has('city')) {
            $jobPosts->where('city', request('city'));
        }

        if (request()->has('job_role')) {
            $jobPosts->where('job_role', request('job_role'));
        }

        if (request()->has('job_level')) {
            $jobPosts->where('job_level', request('job_level'));
        }

        if (request()->has('title')) {
            $jobPosts->where('title', 'like', '%' . request('title') . '%');
        }

        if (request()->has('salary')) {
            $jobPosts->where('salary', '>=', request('salary'));
        }

        return response()->json($jobPosts->get());
    }
}
