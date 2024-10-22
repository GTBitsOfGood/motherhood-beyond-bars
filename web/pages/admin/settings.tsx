import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { changePassword } from "db/actions/ChangePassword";

type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

function SettingsPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PasswordForm>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data: PasswordForm) => {
    const { currentPassword, newPassword, confirmPassword } = data;

    setErrorMessage("");
    setSuccessMessage("");

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    const result = await changePassword(currentPassword, newPassword);

    if (result.success) {
      setSuccessMessage(result.message);
    } else {
      setErrorMessage(result.message);
    }

    setLoading(false);
  };

  return (
    <form
      className="flex flex-col items-start p-6 bg-gray-50 rounded-lg shadow-md w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl mb-6 font-bold text-gray-800">Settings</h1>

      {/* Display messages */}
      {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
      {successMessage && (
        <p className="text-green-600 mb-4">{successMessage}</p>
      )}

      {/* Form container */}
      <div className="flex items-center mb-6">
        {/* Label */}
        <label className="text-lg mr-4 w-36">Password:</label>

        {/* Password Inputs container using Flex */}
        <div className="flex-1 flex space-x-4 items-center">
          <div className="flex flex-col w-full gap-1">
            <label className="text-lg">Current Password</label>
            <input
              type="password"
              className="border border-gray-300 p-2 rounded w-full"
              {...register("currentPassword", { required: true })}
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-xs">
                Current password is required
              </p>
            )}
          </div>

          <div className="flex flex-col w-full gap-1">
            <label className="text-lg">New Password</label>
            <input
              type="password"
              className="border border-gray-300 p-2 rounded w-full"
              {...register("newPassword", { required: true, minLength: 6 })}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-xs">
                New password must be at least 6 characters long
              </p>
            )}
          </div>

          <div className="flex flex-col w-full gap-1">
            <label className="text-lg">Confirm new password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="border border-gray-300 p-2 rounded w-full"
              {...register("confirmPassword", {
                required: true,
                validate: (value) => value === watch("newPassword"),
              })}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">Passwords must match</p>
          )}

          {/* Action Buttons */}
          <button
            type="submit"
            className={`bg-[#AD186F] text-white font-bold py-2 px-6 rounded hover:bg-[#8C145A] transition duration-150 ease-in-out ${
              loading ? "opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="text-[#AD186F] hover:text-[#8C145A] font-semibold transition duration-150 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default SettingsPage;
