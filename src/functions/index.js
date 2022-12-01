export function getStatusName(status) {
  switch (status) {
    case "waiting_for_document":
      return "รอทำเอกสารเบิกจ่าย";
    case "modifying_document":
      return "อยู่ระหว่างแก้ไข";
    case "proposing_approval":
      return "เสนออนุมัติ";
    case "approving":
      return "อนุมัติ";
    case "saving_into_system":
      return "รอบันทึกเข้าระบบเบิกจ่าย";
    case "sending":
      return "อยู่ระหว่างส่งเบิก";
    case "withdrawing":
      return "อยู่ระหว่างโอนเงิน";
    default:
      return "ERROR";
  }
}

export function getUserType(type) {
  switch (type) {
    case "student":
      return "นักศึกษา";
    case "staff":
      return "พนักงาน";
    case "lecturer":
      return "อาจารย์";
    default:
      return "ERROR";
  }
}


export function getShortDate(date) {
  const fDate = new Date(date);

  return fDate.getDate().toString() + ' ' + getShortMonthThai(fDate.getMonth()) + ' ' + (fDate.getFullYear() + 543).toString()
}

export function getLongDate(date) {
  const fDate = new Date(date);

  return fDate.getDate().toString() + ' ' + getFullMonthThai(fDate.getMonth()) + ' พ.ศ. ' + (fDate.getFullYear() + 543).toString()
}

export function getShortMonthThai(month) {
  const monthPlusOne = month + 1;
  switch (monthPlusOne) {
    case 1:
      return "ม.ค.";
    case 2:
      return "ก.พ.";
    case 3:
      return "มี.ค.";
    case 4:
      return "เม.ย.";
    case 5:
      return "พ.ค.";
    case 6:
      return "มิ.ย.";
    case 7:
      return "ก.ค.";
    case 8:
      return "ส.ค.";
    case 9:
      return "ก.ย.";
    case 10:
      return "ต.ค.";
    case 11:
      return "พ.ย.";
    case 12:
      return "ธ.ค.";
    default:
      return "ERR";
  }
}

export function getFullMonthThai(month) {
  const monthPlusOne = month + 1;
  switch (monthPlusOne) {
    case 1:
      return "มกราคม";
    case 2:
      return "กุมภาพันธ์";
    case 3:
      return "มีนาคม";
    case 4:
      return "เมษายน";
    case 5:
      return "พฤษภาคม";
    case 6:
      return "มิถุนายน";
    case 7:
      return "กรกฎาคม";
    case 8:
      return "สิงหาคม";
    case 9:
      return "กันยายน";
    case 10:
      return "ตุลาคม";
    case 11:
      return "พฤศจิกายน";
    case 12:
      return "ธันวาคม";
    default:
      return "ERR";
  }
}

export function getDecimalAmount(amount_decimal) {
  if (amount_decimal < 10) {
    return "0" + amount_decimal.toString();
  } else return amount_decimal.toString();
}

export function getErrorMessage(code) {
  if (code === 404) {
    return "404 Not Found";
  } else if (code === 403) {
    return "403 Forbidden (Your token either expired or invalid.)";
  } else if (code === 401) {
    return "401 Unauthorized";
  } else if (code === 400) {
    return "400 Bad Request";
  }
}
