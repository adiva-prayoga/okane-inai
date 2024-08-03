export const formattedDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-US', options);
};

export const formattedDateWithTime = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  return new Date(date).toLocaleString('en-US', options);
}

export const  formattedCurrentDate = (date: string) => {
  const now: Date = new Date();
  const posted: Date = new Date(date);
  const diff: number = now.getTime() - posted.getTime();
  const diffDays: number = Math.floor(diff / (1000 * 60 * 60 * 24));

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  if (diffDays === 0) {
    return `Today at ${posted.toLocaleString("en-US", options)}`;
  }
  if (diffDays === 1) {
    return `Yesterday at ${posted.toLocaleString("en-US", options)}`;
  }
  return posted.toLocaleString("en-US", options);
}