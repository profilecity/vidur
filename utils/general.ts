export const sleep = (ms: number) => {
  return new Promise((re, _) => {
    setTimeout(re, ms);
  })
}

export function timeAgo(date: Date) {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
      return `${interval}y ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
      return `${interval}mo ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
      return `${interval}d ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
      return `${interval}h ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
      return `${interval}m ago`;
  }
  return `Just Now`;
}


export function formatDate(date: Date) {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  
  // TODO: fix this.
  // @ts-expect-error
  return date.toLocaleDateString('en-US', options);
}