export const isValidEmail = (email: string) => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const isValidPhoneNumber = (phone: string) => {
  return /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phone);
};

export const formatPhoneNumber = (phoneNumberString: string) => {
  const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    const intlCode = match[1] ? "+1 " : "";
    return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
  }

  return null;
};
