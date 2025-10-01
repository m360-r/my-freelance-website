<?php

namespace App\Http\Controllers;

use App\Models\EscrowPayment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function initiateEscrow(Request $request)
    {
        $request->validate([
            'project_id' => 'required|exists:projects,id',
            'amount' => 'required|numeric|min:0',
            'commission_rate' => 'required|numeric|min:0|max:30'
        ]);

        $commission = ($request->amount * $request->commission_rate) / 100;
        $freelancerAmount = $request->amount - $commission;

        $escrow = EscrowPayment::create([
            'project_id' => $request->project_id,
            'client_id' => Auth::id(),
            'freelancer_id' => $request->freelancer_id,
            'amount' => $request->amount,
            'platform_commission' => $commission,
            'status' => 'pending'
        ]);

        // SSLCommerz/Binance/bKash পেমেন্ট ইন্টিগ্রেশন
        return $this->processPayment($escrow);
    }

    private function processPayment($escrow)
    {
        // SSLCommerz পেমেন্ট ইন্টিগ্রেশন লজিক
        // bKash পেমেন্ট ইন্টিগ্রেশন
        // Binance পেমেন্ট ইন্টিগ্রেশন
        
        return response()->json([
            'payment_url' => 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
            'escrow_id' => $escrow->id
        ]);
    }
}
