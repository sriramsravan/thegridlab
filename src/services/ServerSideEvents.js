import { useEffect, useState } from 'react';

function useServerSentEvents(url, events) {
  const [eventSource, setEventSource] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!eventSource) {
      const eventSource = new EventSource(url);
      setEventSource(eventSource);
      Object.keys(events).forEach((event) => {
        eventSource.addEventListener(event, events[event]);
      });
      eventSource.addEventListener('messages', (event) => {
        // if (callback) callback(event.data);
        setMessages((prevMessages) => [...prevMessages, event.data]);
      });
      eventSource.addEventListener('error', (error) => {
        console.error(error);
        setError(error);
      });

    }

    return () => {
      if (eventSource) {
        eventSource.close();
        setEventSource(null);
      }
    };
  }, [eventSource, url]);

  return { messages, error, eventSource };
}

export default useServerSentEvents;
