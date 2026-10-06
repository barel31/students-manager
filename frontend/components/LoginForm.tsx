'use client';

type LoginFormProps = {
  onSubmit: (data: { name: string; id: string }) => void;
};

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit({
      name: formData.get('name') as string,
      id: formData.get('id') as string,
    });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:border-gray-600 dark:text-gray-300"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="id"
          className="text-sm font-medium text-gray-700 dark:text-gray-300">
          ID
        </label>
        <input
          type="text"
          id="id"
          name="id"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-black dark:border-gray-600 dark:text-gray-300"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Login
      </button>
    </form>
  );
}
