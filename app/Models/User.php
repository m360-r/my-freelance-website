// app/Models/User.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role', // 'freelancer', 'client'
        'phone',
        'avatar',
        'is_verified',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function freelancerProfile()
    {
        return $this->hasOne(FreelancerProfile::class);
    }

    public function clientProfile()
    {
        return $this->hasOne(ClientProfile::class);
    }

    public function kycVerification()
    {
        return $this->hasOne(KycVerification::class);
    }
}
