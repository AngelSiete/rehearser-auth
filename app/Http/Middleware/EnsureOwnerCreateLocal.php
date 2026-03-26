<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureOwnerCreateLocal
{
    public function handle(Request $request, Closure $next)
    {
        if (!$request->user() || $request->user()->userType !== 'owner') {
            abort(403, 'Unauthorized');
        }
        return $next($request);
    }
}
