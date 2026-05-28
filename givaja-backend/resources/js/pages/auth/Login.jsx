import { useForm, Link } from '@inertiajs/react';
import useLocalizedUrl from '../../hooks/useLocalizedUrl';
import useTranslate from '../../hooks/useTranslate';

export default function Login() {
    const localizedUrl = useLocalizedUrl();
    const t = useTranslate();

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(localizedUrl('/login'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--gray-100)' }}>
            <div className=" shadow-[0px_0px_15px_rgba(80,167,177,100)] rounded-lg w-full max-w-3xl flex overflow-hidden" style={{ minHeight: '340px' }}>

                {/* LEFT — Logo */}
                <div style={{ backgroundColor: 'var(--gray-100)' }} className="w-1/2 flex items-center justify-center p-10 border-r" style={{ borderColor: 'var(--gray-100)' }}>
                    <img
                        src="/images/givaja.jpeg"
                        alt="Givaja"
                        className="max-w-[200px] w-full object-contain"
                    />
                </div>

                {/* RIGHT — Form */}
                <div className="w-1/2 bg-white p-8 flex flex-col justify-center">
                    <h2 style={{ color: 'var(--text-dark)' }} className="text-xl font-semibold mb-1">
                        {t('auth.login_title', 'Iniciar sesión')}
                    </h2>
                    <p style={{ color: 'var(--gray-500)' }} className="text-xs mb-5">
                        {t('auth.login_subtitle', 'Ingresa tu correo electrónico y contraseña')}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                placeholder={t('auth.email', 'Correo electrónico')}
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className={`w-full border rounded px-3 py-2 text-sm outline-none transition focus:ring-1 ${
                                    errors.email
                                        ? 'border-red-400 focus:ring-red-300'
                                        : 'focus:ring-1'
                                }`}
                            style={{
                                borderColor: errors.email ? '#f87171' : 'var(--gray-300)',
                                '--tw-ring-color': errors.email ? '#fca5a5' : 'var(--primary-500)'
                            }}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <input
                                type="password"
                                placeholder={t('auth.password', 'Contraseña')}
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                className={`w-full border rounded px-3 py-2 text-sm outline-none transition focus:ring-1 ${
                                    errors.password
                                        ? 'border-red-400 focus:ring-red-300'
                                        : 'focus:ring-1'
                                }`}
                            style={{
                                borderColor: errors.password ? '#f87171' : 'var(--gray-300)',
                                '--tw-ring-color': errors.password ? '#fca5a5' : 'var(--primary-500)'
                            }}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Remember me */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={data.remember}
                                onChange={e => setData('remember', e.target.checked)}
                                style={{ accentColor: 'var(--primary-500)' }}
                            />
                            <label htmlFor="remember" style={{ color: 'var(--gray-500)' }} className="text-xs">
                                {t('auth.remember_me', 'Recordarme')}
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-2 rounded text-white text-sm font-medium transition hover:opacity-90 disabled:opacity-60"
                            style={{ backgroundColor: 'var(--primary-500)' }}
                        >
                            {processing
                                ? t('auth.logging_in', 'Ingresando...')
                                : t('auth.login_btn', 'Iniciar sesión')}
                        </button>
                    </form>

                    {/* Register link */}
                    <p style={{ color: 'var(--gray-500)' }} className="text-xs text-center mt-4">
                        {t('auth.no_account', '¿No tienes cuenta?')}{' '}
                        <Link
                            href={localizedUrl('/register')}
                            className="font-medium hover:underline"
                            style={{ color: 'var(--primary-500)' }}
                        >
                            {t('auth.register_link', 'Regístrate aquí')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
