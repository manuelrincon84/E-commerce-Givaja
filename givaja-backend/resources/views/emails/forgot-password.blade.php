@component('mail::message')
# {{ __('Reset Your Password') }}

{{ __('You requested a password reset for your Givaja account.') }}

@component('mail::button', ['url' => $resetUrl])
{{ __('Reset Password') }}
@endcomponent

{{ __('This link will expire in 60 minutes.') }}

{{ __('If you did not request a password reset, please ignore this email.') }}

{{ __('Regards') }},<br>
{{ config('app.name') }}
@endcomponent
