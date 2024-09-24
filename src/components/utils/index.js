
// export const formatDate = (date) => {
  
//   return date.toLocaleDateString("en-US", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };


export const formatDate = (date) => {
  // Check if the input is just a time string
  const timeRegex = /^\d{2}:\d{2}:\d{2}([+-]\d{2}:\d{2})$/;
  
  // If the input is a time string, append today's date
  if (timeRegex.test(date)) {
    const today = new Date();
    const currentDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    date = `${currentDate}T${date}`; // Combine with today's date
  }

  // Parse the provided date string
  const parsedDate = new Date(date);

  // Extract year, month, and day components
  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth() + 1; // Months are zero-based, so we add 1
  const day = parsedDate.getDate();

  // Ensure month and day are two digits
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedDay = day < 10 ? `0${day}` : `${day}`;

  // Construct the formatted date string
  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

  return formattedDate;
}

export const formatDuration =(duration)=> {
  // PT3H40M" to the desired format "3h 40m".
  // Extract hours and minutes from the duration string
  const hours = duration.match(/(\d+)H/i);
  const minutes = duration.match(/(\d+)M/i);
  
  // Construct formatted duration string
  let formattedDuration = '';
  if (hours) {
      formattedDuration += `${hours[1]}h `;
  }
  if (minutes) {
      formattedDuration += `${minutes[1]}m`;
  }
  
  return formattedDuration.trim();
}


export const emailRegex = /^[\w-\.]+@(gmail\.com|[\w-]+\.asaam\.pk)$/;

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const cnicRegex = /^[0-9]{13}$/;

export const phoneNumberRegex = /^[0-9]{11}$/;
