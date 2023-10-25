export function capitalizeFirstName(fullName: string) {
  const nameParts = fullName.split(" ");

  if (nameParts.length > 0) {
    const firstName = nameParts[0];

    const capitalizedFirstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

    return capitalizedFirstName;
  } else {
    return "";
  }
}

export function getFromLocalStorage(key: string) {
  const value = JSON.parse(localStorage.getItem(key) || "{}");

  return value;
}
