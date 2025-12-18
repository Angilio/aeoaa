import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="alert alert-success mb-4 shadow-lg">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div className="form-control w-full">
                    <InputLabel htmlFor="email" value="Email" className="label" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="input input-bordered w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="text-error mt-1" />
                </div>

                <div className="form-control w-full">
                    <InputLabel htmlFor="password" value="Password" className="label" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="input input-bordered w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="text-error mt-1" />
                </div>

                <div className="form-control">
                    <label className="label cursor-pointer flex items-center gap-2">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="label-text">Se souvenir de moi</span>
                    </label>
                </div>

                <div className="flex items-center justify-end gap-2 mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="link link-hover"
                        >
                            Mot de passe oublié?
                        </Link>
                    )}

                    <PrimaryButton className="btn btn-primary" disabled={processing}>
                        Connexion
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
