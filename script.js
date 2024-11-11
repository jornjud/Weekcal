// เริ่มต้นใช้งาน Flatpickr
flatpickr(".datepicker", {
  dateFormat: "d/m/Y",
  locale: "th" // ตั้งค่าให้เป็นภาษาไทย
});

function calculateWeeks() {
  // รับค่าวันที่จากฟอร์ม
  const startDateInput = document.getElementById("start-date").value;
  const endDateInput = document.getElementById("end-date").value || flatpickr.formatDate(new Date(), "d/m/Y");
  const amount = parseFloat(document.getElementById("amount").value);

  if (isNaN(amount) || !startDateInput) {
    document.getElementById("result").textContent = "กรุณากรอกข้อมูลให้ครบถ้วน";
    return;
  }

  // แปลงค่าวันที่จากรูปแบบ dd/mm/yyyy เป็น Date object
  const [startDay, startMonth, startYear] = startDateInput.split("/");
  const [endDay, endMonth, endYear] = endDateInput.split("/");

  const startDate = new Date(`${startYear}-${startMonth}-${startDay}`);
  const endDate = new Date(`${endYear}-${endMonth}-${endDay}`);

  // ฟังก์ชันสำหรับแปลงวันที่เป็นรูปแบบ วัน/เดือน/ปี ภาษาไทย
  function formatDateThai(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('th-TH', options);
  }

  let result = "";
  let currentDate = new Date(startDate);
  currentDate.setDate(currentDate.getDate() + 7);
  let weekCount = 1;

  while (currentDate <= endDate) {
    result += `${formatDateThai(currentDate)} = สัปดาห์ ที่ ${weekCount}\n`;
    currentDate.setDate(currentDate.getDate() + 7);
    weekCount++;
  }

  let daysRemaining = Math.floor((endDate - (currentDate - 7 * 24 * 60 * 60 * 1000)) / (1000 * 60 * 60 * 24));
  if (daysRemaining > 0 && daysRemaining < 7) {
    result += `${formatDateThai(endDate)} = ${daysRemaining} วัน\n`;
  }

  let totalAmount = (weekCount - 1) * amount;
  result += `\n${amount} x ${weekCount - 1} สัปดาห์ = ${totalAmount.toFixed(2)} บาท`;

  if (daysRemaining > 0 && daysRemaining < 7) {
    const dailyAmount = amount / 7;
    const remainingAmount = dailyAmount * daysRemaining;
    totalAmount += remainingAmount;
    result += `\n(${amount} ÷ 7 วัน) x ${daysRemaining} วัน = ${remainingAmount.toFixed(2)} บาท`;
  }
  result += `\nรวมเป็นเงิน ${totalAmount.toFixed(2)} บาท`;

  document.getElementById("result").textContent = result;
}
