export const getDeliveryTime = (paidAtTime: any, orderType: string) => {
  const timeToAdd = orderType === "pickup" ? 20 : 40;
  const paidAt = new Date(paidAtTime);
  const deliveryTime = new Date(paidAt.getTime() + timeToAdd * 60000); // 40 minutes
  console.log(deliveryTime);
  return deliveryTime;
};

export const formatDeliveryTime = (time: any) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  const amPm = hours >= 12 ? "PM" : "AM";
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${amPm}`;
};

// Helper for formatting currency
export const formatCurrency = (amount: number) =>
  amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
