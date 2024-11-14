
export const formatDateReadable = (todayDate) => {
    const date = new Date(todayDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formatDateReadable;
}

export const formatDate = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${String(date.getFullYear()).slice(-2)}`;
}

export const dateCompute = (date, toAdd) => {
    const startDate = new Date(date); // Your start date
    const daysToAdd = toAdd; // Number of days to add
    
    const futureDate = new Date(startDate);
    futureDate.setDate(futureDate.getDate() + daysToAdd);

    return `${futureDate.getMonth() + 1}/${futureDate.getDate()}/${String(futureDate.getFullYear()).slice(-2)}`;

    // return futureDate;

    
}

export function formatDateTime(dateTime) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true, // Change to false for 24-hour format
    };
    return new Date(dateTime).toLocaleString('en-US', options);
  }