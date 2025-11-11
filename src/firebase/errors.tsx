import {useEffect} from 'react';

type FirestorePermissionErrorData = {
  message: string;
  path: string;
  operation: string;
  data: any;
};

class FirestorePermissionError extends Error {
  path: string;
  operation: string;
  data: any;

  constructor({
    message,
    path,
    operation,
    data,
  }: FirestorePermissionErrorData) {
    super(message);
    this.name = 'FirestorePermissionError';
    this.path = path;
    this.operation = operation;
    this.data = data;
  }
}

type Events = {
  'permission-error': FirestorePermissionError;
};

class EventEmitter<T> {
  private eventHandlers: {[K in keyof T]?: ((data: T[K]) => void)[]} = {};

  on<K extends keyof T>(event: K, handler: (data: T[K]) => void) {
    if (!this.eventHandlers[event]) {
      this.eventHandlers[event] = [];
    }
    this.eventHandlers[event]!.push(handler);
  }

  emit<K extends keyof T>(event: K, data: T[K]) {
    const handlers = this.eventHandlers[event];
    if (handlers) {
      handlers.forEach((handler) => handler(data));
    }
  }
}

export const errorEmitter = new EventEmitter<Events>();

export const FirebaseErrorListener = () => {
  useEffect(() => {
    const handlePermissionError = (error: FirestorePermissionError) => {
      // In a real app, you might want to log this to a service like Sentry
      // For now, we'll just throw it to get a nice overlay in Next.js dev mode
      throw error;
    };

    errorEmitter.on('permission-error', handlePermissionError);
  }, []);

  return null;
};
