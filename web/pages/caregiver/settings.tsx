import TextInput from '@components/atoms/TextInput';
import SignOutButton from '@components/SignOutButton';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { auth } from "db/firebase";
import { updateCaregiver } from 'db/actions/shared/Caregiver';

const Settings = () => {
  const [editingSection, setEditingSection] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const caregiverData = {
    firstName: 'Debbie',
    lastName: 'Dolor',
    email: 'debbie.d@gmail.com',
    phoneNumber: '(470) 345-6789',
    address: {
        streetAddress: '423 Second Street',
        apartment: 'Apt 102',
        city: 'Atlanta',
        state: 'GA',
        zipCode: '30332',
    },
  };

  const { register, handleSubmit, reset, setValue, formState: {errors}, watch, getValues } = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: caregiverData.firstName,
      lastName: caregiverData.lastName,
      email: caregiverData.email,
      phoneNumber: caregiverData.phoneNumber,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      streetAddress: caregiverData.address.streetAddress,
      apartment: caregiverData.address.apartment,
      city: caregiverData.address.city,
      state: caregiverData.address.state,
      zipCode: caregiverData.address.zipCode,
    },
  });

  const handleChangePassword = () => {
    setEditingSection("password");
    reset();
  };

  const onSubmit = async (data: any) => {
    let updateData: any;  // Declare updateData once

    if (editingSection === "password") {
      updateData = getValues([
        "newPassword"
      ]);  // Pass the required fields as an array
    } else if (editingSection === "account") {
      updateData = getValues([
        "firstName", 
        "lastName", 
        "email", 
        "phoneNumber"
      ]);
    } else if (editingSection === "address") {
      updateData = getValues([
        "streetAddress", 
        "apartment", 
        "city", 
        "state", 
        "zipCode"
      ]);
    }
  
    setEditingSection("");
    if (!auth.currentUser) return;
    setSubmitting(true);
    try {
      await updateCaregiver(auth.currentUser?.uid, updateData);
    } finally {
      setSubmitting(false);
    }
  };

  const goBack = () => {
    // Navigate to the appropriate screen when back button is clicked
    if (editingSection === 'password') {
      setEditingSection('account'); // Go back to account editing
      reset(caregiverData);
    } else {
      setEditingSection(""); // Go back to the main settings view
    }
  };

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-xl font-bold mb-6">Settings</h1>
      {
        editingSection === "" ? (
          <div>
            <h2 className="text-lg font-semibold mb-2">Account Information</h2>
            <p>First Name: {caregiverData.firstName}</p>
            <p>Last Name: {caregiverData.lastName}</p>
            <p>Email: {caregiverData.email}</p>
            <p>Phone Number: {caregiverData.phoneNumber}</p>
            <button
              className="text-pink-500 mt-4"
              onClick={() => setEditingSection('account')}
            >
              Edit Account
            </button>
                
            <h2 className="text-lg font-semibold mb-2">Address Information</h2>
            <p>Street Address: {caregiverData.address.streetAddress}</p>
            <p>City: {caregiverData.address.city}</p>
            <p>State: {caregiverData.address.state}</p>
            <p>Zip Code: {caregiverData.address.zipCode}</p>
            <button
                className="text-pink-500 mt-4"
                onClick={() => setEditingSection('address')}
            >
                Edit Address
            </button>
          </div>
        ) : editingSection === "account" ? (
          <div className="p-6 space-y-4">
            <button className="text-pink-500 mb-4" onClick={goBack}>
              &larr; Back
            </button>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <>
                  <TextInput
                    label='First Name'
                    {...register('firstName', { required: 'First name is required' })}
                    placeholder="First Name"
                    currentValue={caregiverData.firstName}
                    error={errors.firstName?.message as string}
                    onChange={(value) => setValue('firstName', value)}
                  />
                  <TextInput
                    label='Last Name'
                    {...register('lastName', { required: 'Last name is required' })}
                    placeholder="Last Name"
                    currentValue={caregiverData.lastName}
                    error={errors.lastName?.message as string}
                    onChange={(value) => setValue('lastName', value)}
                  />
                  <TextInput
                    label="Email"
                    inputType="email"
                    {...register('email', { required: 'Email is required' })}
                    currentValue={caregiverData.email}
                    error={errors.email?.message as string}
                    onChange={(value) => setValue('email', value)}
                  />
                  <TextInput
                    label="Phone Number"
                    {...register('phoneNumber')}
                    currentValue={caregiverData.phoneNumber}
                    onChange={(value) => setValue('phoneNumber', value)}
                  />
                </>
              <button
                type="submit"
                className="bg-pink-500 text-white py-2 px-4 rounded mt-4"
              >
                Save Changes
              </button>
            </form>
            <button
                      className="text-pink-500 mt-4"
                      onClick={handleChangePassword}
                  >
                      Change Password
            </button>
          </div>
        ) : editingSection === "password" ? (
          <div className="p-6 space-y-4">
            <button className="text-pink-500 mb-4" onClick={goBack}>
              &larr; Back
            </button>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <p> </p>
                <>
                  <TextInput
                    label='Old Password'
                    {...register('oldPassword', { required: 'Old password is required' })}
                    error={errors.oldPassword?.message as string}
                    inputType="password"
                    placeholder="Old Password"
                    onChange={(value) => setValue('oldPassword', value)}
                  />
                  <TextInput
                    label='New Password'
                    {...register('newPassword', { required: 'New password is required' })}
                    error={errors.newPassword?.message as string}
                    inputType="password"
                    placeholder="Password"
                    onChange={(value) => setValue('newPassword', value)}
                  />
                  <TextInput
                    label="Confirm New Password"
                    inputType="password"
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (value) => {
                          console.log(value);
                          console.log(watch('newPassword'));
                          return value === watch('newPassword') || 'Passwords do not match';
                      }
                    })}
                    error={errors.confirmPassword?.message as string}
                    onChange={(value) => setValue('confirmPassword', value)}
                />
                </>
              <button
                type="submit"
                className="bg-pink-500 text-white py-2 px-4 rounded mt-4"
              >
                Save Changes
              </button>
            </form>
          </div>
        ) : (
          <div>
            <button className="text-pink-500 mb-4" onClick={goBack}>
              &larr; Back
            </button>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextInput
                    label="Street Address"
                    currentValue={caregiverData.address.streetAddress}
                    {...register('streetAddress', {
                      required: 'Street address is required',
                    })}
                    error={errors.streetAddress?.message as string}
                    onChange={(value) => setValue('streetAddress', value)}
                  />
                  <TextInput
                    label="City"
                    currentValue={caregiverData.address.city}
                    {...register('city', { required: 'City is required' })}
                    error={errors.city?.message as string}
                    onChange={(value) => setValue('city', value)}
                  />
                  <TextInput
                    label="State"
                    currentValue={caregiverData.address.state}
                    {...register('state', { required: 'State is required' })}
                    error={errors.state?.message as string}
                    onChange={(value) => setValue('state', value)}
                  />
                  <TextInput
                    label="Zip Code"
                    currentValue={caregiverData.address.zipCode}
                    {...register('zipCode', { required: 'Zip code is required' })}
                    error={errors.zipCode?.message as string}
                    onChange={(value) => setValue('zipCode', value)}
                  />
              <button
                type="submit"
                className="bg-pink-500 text-white py-2 px-4 rounded mt-4"
              >
                Save Changes
              </button>
            </form>
          </div>
      )}
      <SignOutButton />
    </div>
  );
};

export default Settings;
