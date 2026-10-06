'use client';

type LoginFormProps = {
  onSubmit: (credentials: { name: string; id: string }) => void | Promise<void>;
};

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await onSubmit({
      name: String(formData.get('name') ?? ''),
      id: String(formData.get('id') ?? ''),
    });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <label className="flex flex-col gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        Name
        <input
          name="name"
          autoComplete="name"
          required
          className="rounded-md border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-black"
        />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        Id
        <input
          type="text"
          name="id"
          autoComplete="off"
          required
          className="rounded-md border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-black"
        />
      </label>
      <button
        type="submit"
        className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60">
        Login
      </button>
    </form>
  );
}
