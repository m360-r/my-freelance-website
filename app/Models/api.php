// routes/api.php
use App\Http\Controllers\Auth\RegisterController;

Route::post('/register/freelancer', [RegisterController::class, 'registerFreelancer']);
