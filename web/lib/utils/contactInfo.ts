export const isValidEmail = (email: string) => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const isValidPhoneNumber = (phone: string) => {
  return /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phone);
};

export const cleanPhoneNumber = (phoneNumberString: string) => {
  const cleanNumber = ("" + phoneNumberString).replace(/\D/g, "");
  // Add 1 as the area code if none present
  if (cleanNumber.length === 10) {
    return "1" + cleanNumber;
  } else {
    return cleanNumber;
  }
};

export const formatPhoneNumber = (phoneNumberString: string) => {
  const cleaned = cleanPhoneNumber(phoneNumberString);
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    const intlCode = match[1] ? "+1 " : "";
    return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
  }

  return null;
};
