<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Bid;
use App\Models\EscrowPayment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function createProject(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'budget' => 'required|numeric|min:0',
            'currency' => 'required|in:USD,BDT,EUR,GBP',
            'deadline' => 'required|date'
        ]);

        $project = Project::create([
            'client_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'budget' => $request->budget,
            'currency' => $request->currency,
            'deadline' => $request->deadline,
            'status' => 'open'
        ]);

        return response()->json(['project' => $project, 'message' => 'Project created successfully']);
    }

    public function placeBid(Request $request, $projectId)
    {
        $request->validate([
            'amount' => 'required|numeric|min:0',
            'proposal' => 'required|string',
            'delivery_days' => 'required|integer|min:1'
        ]);

        $bid = Bid::create([
            'project_id' => $projectId,
            'freelancer_id' => Auth::id(),
            'amount' => $request->amount,
            'proposal' => $request->proposal,
            'delivery_days' => $request->delivery_days,
            'status' => 'pending'
        ]);

        return response()->json(['bid' => $bid, 'message' => 'Bid placed successfully']);
    }
}
