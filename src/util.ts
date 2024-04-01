export const nameInitials = (fullName: string): string => {
  const parts = fullName.split(" ");

  return parts.map((p) => p.charAt(0)).join('');
};
