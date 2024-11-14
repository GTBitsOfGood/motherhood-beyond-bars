import { useRef, useState } from "react";

export type UseMapWrapper<K, V> = {
  set: (key: K, value: V) => void;
  get: (key: K) => V | undefined;
  delete: (key: K) => void;
  has: (key: K) => boolean;
  batch: (op: (map: Map<K, V>) => void) => void;
  clear: () => void;
  entries: () => IterableIterator<[K, V]>;
  size: number;
};

export const useMap = <K, V>() => {
  const mapRef = useRef(new Map<K, V>());

  const [wrapper, setWrapper] = useState<UseMapWrapper<K, V>>(createWrapper());

  function createWrapper(): UseMapWrapper<K, V> {
    return {
      set: (key, value) => {
        mapRef.current.set(key, value);
        setWrapper(createWrapper());
      },
      delete: (key) => {
        if (mapRef.current.has(key)) {
          setWrapper(createWrapper());
        }
        mapRef.current.delete(key);
      },
      get: (key) => mapRef.current.get(key),
      has: (key) => mapRef.current.has(key),
      entries: () => mapRef.current.entries(),
      batch: (op) => {
        op(mapRef.current);
        setWrapper(createWrapper());
      },
      clear: () => {
        if (mapRef.current.size > 0) setWrapper(createWrapper());
        mapRef.current = new Map();
      },
      get size() {
        return mapRef.current.size;
      },
    };
  }

  return wrapper;
};
