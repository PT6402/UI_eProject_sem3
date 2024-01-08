export function ConvertToInternationalPhoneNumber(localPhoneNumber) {
  if (localPhoneNumber.startsWith("0")) {
    return "+84" + localPhoneNumber.slice(1);
  }
  return localPhoneNumber;
}
export default function CheckAccountPhone(acc_phoneInput) {
  let error;
  let result = { type: "", value: "" };
  const listFirstLetter = ["D", "L", "B"];

  if (acc_phoneInput.current.value != null) {
    const valueAccountPhone = acc_phoneInput.current.value.trim();
    if (valueAccountPhone == "") {
      error = "account/phone is empty";
    } else if (
      valueAccountPhone.length == 16 &&
      listFirstLetter.includes(valueAccountPhone.charAt(0))
    ) {
      result = {
        type: "account",
        value: ConvertToInternationalPhoneNumber(valueAccountPhone),
      };
    } else {
      if (
        ConvertToInternationalPhoneNumber(valueAccountPhone).match(
          /(84[3|5|7|8|9])+([0-9]{8})\b/g
        )
      ) {
        result = {
          type: "phone",
          value: ConvertToInternationalPhoneNumber(valueAccountPhone),
        };
      } else {
        error = "invalid account/phone";
      }
    }
  }
  return { error, result };
}

export function CheckPhone(acc_phoneInput) {
  let error;
  let result = { type: "", value: "" };

  function ConvertToInternationalPhoneNumber(localPhoneNumber) {
    if (localPhoneNumber.startsWith("0")) {
      return "+84" + localPhoneNumber.slice(1);
    }
    return localPhoneNumber;
  }
  if (acc_phoneInput.current.value != null) {
    const valueAccountPhone = acc_phoneInput.current.value.trim();
    if (valueAccountPhone == "") {
      error = "phone is empty";
    } else {
      if (
        ConvertToInternationalPhoneNumber(valueAccountPhone).match(
          /(84[3|5|7|8|9])+([0-9]{8})\b/g
        )
      ) {
        result = {
          type: "phone",
          value: ConvertToInternationalPhoneNumber(valueAccountPhone),
        };
      } else {
        error = "invalid phone";
      }
    }
  }
  return { error, result };
}
