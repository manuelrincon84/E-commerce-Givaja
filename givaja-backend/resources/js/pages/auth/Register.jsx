import { useForm, Link } from '@inertiajs/react';
import useLocalizedUrl from '../../hooks/useLocalizedUrl';
import useTranslate from '../../hooks/useTranslate';

export default function Register() {
    const localizedUrl = useLocalizedUrl();
    const t = useTranslate();

    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(localizedUrl('/register'));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-md w-full max-w-3xl flex overflow-hidden" style={{ minHeight: '400px' }}>

                {/* LEFT — Logo */}
                <div className="w-1/2 flex items-center justify-center p-10 border-r border-gray-100">
                    <img
                        src="/images/givaja.jpeg"
                        alt="Givaja"
                        className="max-w-[200px] w-full object-contain"
                    />
                </div>

                {/* RIGHT — Form */}
                <div className="w-1/2 p-8 flex flex-col justify-center">
                    <h2 className="text-xl font-semibold mb-1" style={{ color: '#020407' }}>
                        {t('auth.register_title', 'Crear cuenta')}
                    </h2>
                    <p className="text-xs text-gray-400 mb-5">
                        {t('auth.register_subtitle', 'Completa tus datos para registrarte')}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        {/* Names row */}
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder={t('auth.first_name', 'Nombre')}
                                    value={data.first_name}
                                    onChange={e => setData('first_name', e.target.value)}
                                    className={`w-full border rounded px-3 py-2 text-sm outline-none transition focus:ring-1 ${
                                        errors.first_name
                                            ? 'border-red-400 focus:ring-red-300'
                                            : 'border-gray-300 focus:ring-[#71a6b1]'
                                    }`}
                                />
                                {errors.first_name && (
                                    <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
                                )}
                            </div>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder={t('auth.last_name', 'Apellido')}
                                    value={data.last_name}
                                    onChange={e => setData('last_name', e.target.value)}
                                    className={`w-full border rounded px-3 py-2 text-sm outline-none transition focus:ring-1 ${
                                        errors.last_name
                                            ? 'border-red-400 focus:ring-red-300'
                                            : 'border-gray-300 focus:ring-[#71a6b1]'
                                    }`}
                                />
                                {errors.last_name && (
                                    <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
                                )}
                            </div>
                        </div>

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
                                        : 'border-gray-300 focus:ring-[#71a6b1]'
                                }`}
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
                                        : 'border-gray-300 focus:ring-[#71a6b1]'
                                }`}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <input
                                type="password"
                                placeholder={t('auth.confirm_password', 'Confirmar contraseña')}
                                value={data.password_confirmation}
                                onChange={e => setData('password_confirmation', e.target.value)}
                                className={`w-full border rounded px-3 py-2 text-sm outline-none transition focus:ring-1 ${
                                    errors.password_confirmation
                                        ? 'border-red-400 focus:ring-red-300'
                                        : 'border-gray-300 focus:ring-[#71a6b1]'
                                }`}
                            />
                            {errors.password_confirmation && (
                                <p className="text-red-500 text-xs mt-1">{errors.password_confirmation}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-2 rounded text-white text-sm font-medium transition hover:opacity-90 disabled:opacity-60"
                            style={{ backgroundColor: '#71a6b1' }}
                        >
                            {processing
                                ? t('auth.registering', 'Registrando...')
                                : t('auth.register_btn', 'Crear cuenta')}
                        </button>
                    </form>

                    {/* Login link */}
                    <p className="text-xs text-center text-gray-400 mt-4">
                        {t('auth.have_account', '¿Ya tienes cuenta?')}{' '}
                        <Link
                            href={localizedUrl('/login')}
                            className="font-medium hover:underline"
                            style={{ color: '#71a6b1' }}
                        >
                            {t('auth.login_link', 'Inicia sesión')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
